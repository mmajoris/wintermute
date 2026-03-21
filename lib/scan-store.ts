/**
 * Scan Study Storage — IndexedDB-backed persistence for brain imaging studies.
 *
 * Each study is a scan session: the brain state snapshot at capture time,
 * rendered thumbnails, modality info, and clinical metadata.
 */

import type { BrainSnapshot } from "./brain-snapshot";

export type ScanModality = "MRI" | "CT" | "PET" | "fMRI" | "Full Protocol";

export interface StudyThumbnails {
  axial: string[];
  sagittal: string[];
  coronal: string[];
}

export interface ScanStudy {
  id: string;
  createdAt: string;
  modality: ScanModality;
  indication: string;
  snapshot: BrainSnapshot;
  thumbnails: StudyThumbnails;
}

const DB_NAME = "wintermute-scans";
const DB_VERSION = 1;
const STORE_NAME = "studies";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("createdAt", "createdAt", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveScanStudy(study: ScanStudy): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(study);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}

export async function listScanStudies(): Promise<ScanStudy[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const index = store.index("createdAt");
    const request = index.getAll();
    request.onsuccess = () => {
      db.close();
      const studies = request.result as ScanStudy[];
      studies.reverse();
      resolve(studies);
    };
    request.onerror = () => { db.close(); reject(request.error); };
  });
}

export async function getScanStudy(id: string): Promise<ScanStudy | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const request = tx.objectStore(STORE_NAME).get(id);
    request.onsuccess = () => { db.close(); resolve(request.result ?? null); };
    request.onerror = () => { db.close(); reject(request.error); };
  });
}

export async function deleteScanStudy(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}

export function generateStudyId(): string {
  return `study_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
