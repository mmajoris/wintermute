-- Add GIN index on the JSONB payload column to support queries that filter
-- on fields inside the heterogeneous event payload, e.g. finding all events
-- whose payload contains a specific neurochemistry molecule above a threshold
-- or whose payload matches a structural pattern.
--
-- Created as a raw-SQL migration because Prisma's schema.prisma generator
-- does not emit GIN indexes.

CREATE INDEX IF NOT EXISTS "idx_brain_events_payload_gin"
  ON "brain_events" USING GIN ("payload");
