CREATE TABLE account
(
    id       BIGINT       NOT NULL,
    email    VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT account_pkey PRIMARY KEY (id)
);

CREATE TABLE booking
(
    id           BIGINT NOT NULL,
    id_user      BIGINT NOT NULL,
    created_at   TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    booking_from TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    booking_to   TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    id_room      BIGINT NOT NULL,
    CONSTRAINT booking_pkey PRIMARY KEY (id)
);

CREATE TABLE coach
(
    id BIGINT NOT NULL,
    CONSTRAINT coach_pkey PRIMARY KEY (id)
);

CREATE TABLE course
(
    id          BIGINT           NOT NULL,
    name        VARCHAR(255)     NOT NULL,
    description TEXT             NOT NULL,
    price       DOUBLE PRECISION NOT NULL,
    time        time WITHOUT TIME ZONE NOT NULL,
    start_date  date                   NOT NULL,
    end_date    date                   NOT NULL,
    slot        SMALLINT               NOT NULL,
    id_coach    BIGINT                 NOT NULL,
    id_room     BIGINT                 NOT NULL,
    CONSTRAINT course_pkey PRIMARY KEY (id),
    CONSTRAINT course_id_coach_foreign FOREIGN KEY (id_coach) REFERENCES coach (id) ON DELETE NO ACTION,
    CONSTRAINT course_id_room_foreign FOREIGN KEY (id_room) REFERENCES room (id) ON DELETE NO ACTION
);

CREATE TABLE course_member
(
    id        BIGINT NOT NULL,
    id_user   BIGINT NOT NULL,
    id_course BIGINT NOT NULL,
    CONSTRAINT course_member_pkey PRIMARY KEY (id)
);

CREATE TABLE equipment
(
    id                BIGINT  NOT NULL,
    id_equipment_type INTEGER NOT NULL,
    status            FLOAT   NOT NULL,
    CONSTRAINT equipment_pkey PRIMARY KEY (id)
);

CREATE TABLE equipment_type
(
    id     BIGINT   NOT NULL,
    amount SMALLINT NOT NULL,
    CONSTRAINT equipment_type_pkey PRIMARY KEY (id)
);

CREATE TABLE role
(
    id   BIGINT       NOT NULL,
    name VARCHAR(255) NOT NULL,
    CONSTRAINT role_pkey PRIMARY KEY (id)
);

CREATE TABLE role_claim
(
    id      BIGINT NOT NULL,
    id_role BIGINT NOT NULL,
    id_user BIGINT NOT NULL,
    CONSTRAINT role_claim_pkey PRIMARY KEY (id)
);

CREATE TABLE room
(
    id           BIGINT       NOT NULL,
    capacity     INTEGER      NOT NULL,
    name         VARCHAR(255) NOT NULL,
    floor        INTEGER,
    building     VARCHAR(255),
    id_room_type BIGINT       NOT NULL,
    CONSTRAINT room_pkey PRIMARY KEY (id)
);

CREATE TABLE room_type
(
    id   BIGINT       NOT NULL,
    name VARCHAR(255) NOT NULL,
    CONSTRAINT room_type_pkey PRIMARY KEY (id)
);

CREATE TABLE "user"
(
    id           BIGINT       NOT NULL,
    phone_number VARCHAR(10)  NOT NULL,
    first_name   VARCHAR(255) NOT NULL,
    last_name    VARCHAR(255) NOT NULL,
    gender       BOOLEAN      NOT NULL,
    dob          date         NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id)
);

ALTER TABLE account
    ADD CONSTRAINT account_email_unique UNIQUE (email);

ALTER TABLE course_member
    ADD CONSTRAINT course_member_user_course_unique UNIQUE (id_user, id_course);

ALTER TABLE role_claim
    ADD CONSTRAINT role_claim_role_user_unique UNIQUE (id_role, id_user);

ALTER TABLE room
    ADD CONSTRAINT room_name_unique UNIQUE (name);

ALTER TABLE account
    ADD CONSTRAINT account_id_foreign FOREIGN KEY (id) REFERENCES "user" (id) ON DELETE NO ACTION;

ALTER TABLE booking
    ADD CONSTRAINT booking_id_room_foreign FOREIGN KEY (id_room) REFERENCES room (id) ON DELETE NO ACTION;

ALTER TABLE booking
    ADD CONSTRAINT booking_id_user_foreign FOREIGN KEY (id_user) REFERENCES "user" (id) ON DELETE NO ACTION;

ALTER TABLE course_member
    ADD CONSTRAINT course_member_id_course_foreign FOREIGN KEY (id_course) REFERENCES course (id) ON DELETE NO ACTION;

ALTER TABLE course_member
    ADD CONSTRAINT course_member_id_user_foreign FOREIGN KEY (id_user) REFERENCES "user" (id) ON DELETE NO ACTION;

ALTER TABLE equipment
    ADD CONSTRAINT equipment_id_equipment_type_foreign FOREIGN KEY (id_equipment_type) REFERENCES equipment_type (id) ON DELETE NO ACTION;

ALTER TABLE role_claim
    ADD CONSTRAINT role_claim_id_role_foreign FOREIGN KEY (id_role) REFERENCES role (id) ON DELETE NO ACTION;

ALTER TABLE role_claim
    ADD CONSTRAINT role_claim_id_user_foreign FOREIGN KEY (id_user) REFERENCES "user" (id) ON DELETE NO ACTION;

ALTER TABLE room
    ADD CONSTRAINT room_id_room_type_foreign FOREIGN KEY (id_room_type) REFERENCES room_type (id) ON DELETE NO ACTION;