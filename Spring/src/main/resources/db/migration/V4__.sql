-- Add 'amount' column to 'equipment_type' table if it does not exist
ALTER TABLE equipment_type
    ADD COLUMN IF NOT EXISTS amount INT NOT NULL;

-- Modify 'equipment' table: drop unnecessary columns
ALTER TABLE equipment
DROP COLUMN IF EXISTS name,
    DROP COLUMN IF EXISTS amount,
    DROP COLUMN IF EXISTS price;

-- Add 'id_room' column to 'equipment' table if it does not exist
ALTER TABLE equipment
    ADD COLUMN IF NOT EXISTS id_room BIGINT NOT NULL;

-- Add foreign key constraint for 'id_room'
ALTER TABLE equipment
    ADD CONSTRAINT FK_EQUIPMENT_ON_ID_ROOM FOREIGN KEY (id_room) REFERENCES room (id);

CREATE SEQUENCE IF NOT EXISTS course_id_seq START
WITH
    1 INCREMENT BY 1;
