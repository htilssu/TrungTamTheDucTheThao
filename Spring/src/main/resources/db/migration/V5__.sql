ALTER TABLE equipment_type
    ADD CONSTRAINT uc_equipment_type_amount UNIQUE (amount);

ALTER TABLE course
DROP
COLUMN type;

DROP SEQUENCE course_sequence CASCADE;

ALTER TABLE course
ALTER
COLUMN description TYPE VARCHAR(255) USING (description::VARCHAR(255));

ALTER TABLE "user"
    ALTER COLUMN role_id DROP NOT NULL;