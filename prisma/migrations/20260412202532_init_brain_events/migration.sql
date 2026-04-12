-- CreateTable
CREATE TABLE "brain_events" (
    "id" BIGSERIAL NOT NULL,
    "envelope_id" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "received_at" TIMESTAMPTZ(3) NOT NULL,
    "event_timestamp" TIMESTAMPTZ(3) NOT NULL,
    "payload" JSONB NOT NULL,
    "inserted_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "brain_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "brain_events_envelope_id_key" ON "brain_events"("envelope_id");

-- CreateIndex
CREATE INDEX "idx_brain_events_received_at" ON "brain_events"("received_at" DESC);

-- CreateIndex
CREATE INDEX "idx_brain_events_type_received" ON "brain_events"("event_type", "received_at" DESC);

-- CreateIndex
CREATE INDEX "idx_brain_events_event_timestamp" ON "brain_events"("event_timestamp" DESC);
