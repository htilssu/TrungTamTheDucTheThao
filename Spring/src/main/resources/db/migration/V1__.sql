CREATE SEQUENCE IF NOT EXISTS account_sequence START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS equipment_type_sequence START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS user_sequence START WITH 1 INCREMENT BY 1;

CREATE TABLE account
(
    user_id  BIGINT       NOT NULL,
    email    VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT pk_account PRIMARY KEY (user_id)
);

CREATE TABLE booking
(
    id           BIGINT                      NOT NULL,
    id_user      BIGINT                      NOT NULL,
    created_at   TIMESTAMP WITHOUT TIME ZONE,
    booking_from TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    booking_to   TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    id_room      BIGINT                      NOT NULL,
    CONSTRAINT pk_booking PRIMARY KEY (id)
);

CREATE TABLE booking_field
(
    booking_id     BIGINT                      NOT NULL,
    field_id       BIGINT                      NOT NULL,
    customer_id    BIGINT                      NOT NULL,
    customer_name  VARCHAR(255)                NOT NULL,
    customer_phone VARCHAR(10)                 NOT NULL,
    start_time     TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    end_time       TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    booking_status SMALLINT                    NOT NULL,
    deposit_amount DOUBLE PRECISION            NOT NULL,
    total_amount   DOUBLE PRECISION            NOT NULL,
    payment_method VARCHAR(255),
    created_at     TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_booking_field PRIMARY KEY (booking_id)
);

CREATE TABLE coach
(
    id BIGINT NOT NULL,
    CONSTRAINT pk_coach PRIMARY KEY (id)
);

CREATE TABLE course
(
    id          BIGINT                 NOT NULL,
    name        VARCHAR(255)           NOT NULL,
    description TEXT                   NOT NULL,
    price       DOUBLE PRECISION       NOT NULL,
    time        time WITHOUT TIME ZONE NOT NULL,
    start_date  date                   NOT NULL,
    end_date    date                   NOT NULL,
    slot        SMALLINT               NOT NULL,
    id_coach    BIGINT                 NOT NULL,
    id_room     BIGINT                 NOT NULL,
    thumbnail   VARCHAR(255),
    CONSTRAINT pk_course PRIMARY KEY (id)
);

CREATE TABLE course_member
(
    id        BIGINT NOT NULL,
    id_user   BIGINT NOT NULL,
    id_course BIGINT NOT NULL,
    CONSTRAINT pk_course_member PRIMARY KEY (id)
);

CREATE TABLE course_request
(
    id        BIGINT   NOT NULL,
    id_course BIGINT   NOT NULL,
    id_user   BIGINT   NOT NULL,
    status    SMALLINT NOT NULL,
    CONSTRAINT pk_course_request PRIMARY KEY (id)
);

CREATE TABLE equipment
(
    id                BIGINT           NOT NULL,
    id_equipment_type BIGINT           NOT NULL,
    status            DOUBLE PRECISION NOT NULL,
    CONSTRAINT pk_equipment PRIMARY KEY (id)
);

CREATE TABLE equipment_type
(
    id     BIGINT       NOT NULL,
    name   VARCHAR(255) NOT NULL,
    amount SMALLINT     NOT NULL,
    CONSTRAINT pk_equipment_type PRIMARY KEY (id)
);

CREATE TABLE football_field
(
    field_id    BIGINT       NOT NULL,
    field_name  VARCHAR(100) NOT NULL,
    location    VARCHAR(255) NOT NULL,
    field_type  VARCHAR(255) NOT NULL,
    status      VARCHAR(255) NOT NULL,
    description VARCHAR(500),
    image_url   VARCHAR(255),
    created_at  TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT pk_football_field PRIMARY KEY (field_id)
);

CREATE TABLE pricefield
(
    pricing_id BIGINT                 NOT NULL,
    field_id   BIGINT                 NOT NULL,
    start_time time WITHOUT TIME ZONE NOT NULL,
    end_time   time WITHOUT TIME ZONE NOT NULL,
    rate       DOUBLE PRECISION       NOT NULL,
    CONSTRAINT pk_pricefield PRIMARY KEY (pricing_id)
);

CREATE TABLE role
(
    id   BIGINT       NOT NULL,
    name VARCHAR(255) NOT NULL,
    CONSTRAINT pk_role PRIMARY KEY (id)
);

CREATE TABLE role_claim
(
    id      BIGINT NOT NULL,
    id_role BIGINT NOT NULL,
    id_user BIGINT NOT NULL,
    CONSTRAINT pk_role_claim PRIMARY KEY (id)
);

CREATE TABLE room
(
    id           BIGINT       NOT NULL,
    capacity     INTEGER      NOT NULL,
    name         VARCHAR(255) NOT NULL,
    floor        INTEGER,
    building     VARCHAR(255),
    id_room_type BIGINT       NOT NULL,
    CONSTRAINT pk_room PRIMARY KEY (id)
);

CREATE TABLE room_type
(
    id   BIGINT       NOT NULL,
    name VARCHAR(255) NOT NULL,
    CONSTRAINT pk_room_type PRIMARY KEY (id)
);

CREATE TABLE "user"
(
    id           BIGINT       NOT NULL,
    phone_number VARCHAR(13),
    first_name   VARCHAR(255),
    last_name    VARCHAR(255) NOT NULL,
    gender       BOOLEAN      NOT NULL,
    dob          date         NOT NULL,
    avatar       VARCHAR(255),
    CONSTRAINT pk_user PRIMARY KEY (id)
);

ALTER TABLE account
    ADD CONSTRAINT uc_72c8b62cc63aa647776639d41 UNIQUE (email);

ALTER TABLE equipment_type
    ADD CONSTRAINT uc_equipment_type_name UNIQUE (name);

ALTER TABLE account
    ADD CONSTRAINT FK_ACCOUNT_ON_USER FOREIGN KEY (user_id) REFERENCES "user" (id);

ALTER TABLE booking_field
    ADD CONSTRAINT FK_BOOKING_FIELD_ON_CUSTOMER FOREIGN KEY (customer_id) REFERENCES "user" (id);

ALTER TABLE booking_field
    ADD CONSTRAINT FK_BOOKING_FIELD_ON_FIELD FOREIGN KEY (field_id) REFERENCES football_field (field_id);

ALTER TABLE booking
    ADD CONSTRAINT FK_BOOKING_ON_ID_ROOM FOREIGN KEY (id_room) REFERENCES room (id);

ALTER TABLE booking
    ADD CONSTRAINT FK_BOOKING_ON_ID_USER FOREIGN KEY (id_user) REFERENCES "user" (id);

ALTER TABLE course_member
    ADD CONSTRAINT FK_COURSE_MEMBER_ON_ID_COURSE FOREIGN KEY (id_course) REFERENCES course (id);

ALTER TABLE course_member
    ADD CONSTRAINT FK_COURSE_MEMBER_ON_ID_USER FOREIGN KEY (id_user) REFERENCES "user" (id);

ALTER TABLE course
    ADD CONSTRAINT FK_COURSE_ON_ID_COACH FOREIGN KEY (id_coach) REFERENCES coach (id);

ALTER TABLE course
    ADD CONSTRAINT FK_COURSE_ON_ID_ROOM FOREIGN KEY (id_room) REFERENCES room (id);

ALTER TABLE course_request
    ADD CONSTRAINT FK_COURSE_REQUEST_ON_ID_COURSE FOREIGN KEY (id_course) REFERENCES course (id);

ALTER TABLE course_request
    ADD CONSTRAINT FK_COURSE_REQUEST_ON_ID_USER FOREIGN KEY (id_user) REFERENCES "user" (id);

ALTER TABLE equipment
    ADD CONSTRAINT FK_EQUIPMENT_ON_ID_EQUIPMENT_TYPE FOREIGN KEY (id_equipment_type) REFERENCES equipment_type (id);

ALTER TABLE pricefield
    ADD CONSTRAINT FK_PRICEFIELD_ON_FIELD FOREIGN KEY (field_id) REFERENCES football_field (field_id);

ALTER TABLE role_claim
    ADD CONSTRAINT FK_ROLE_CLAIM_ON_ID_ROLE FOREIGN KEY (id_role) REFERENCES role (id);

ALTER TABLE role_claim
    ADD CONSTRAINT FK_ROLE_CLAIM_ON_ID_USER FOREIGN KEY (id_user) REFERENCES "user" (id);

ALTER TABLE room
    ADD CONSTRAINT FK_ROOM_ON_ID_ROOM_TYPE FOREIGN KEY (id_room_type) REFERENCES room_type (id);