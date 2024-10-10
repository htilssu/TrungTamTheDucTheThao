ALTER TABLE course_request
DROP
COLUMN status;

ALTER TABLE course_request
    ADD status SMALLINT NOT NULL;