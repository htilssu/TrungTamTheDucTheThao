CREATE TABLE account
(
    id       BIGINT       NOT NULL,
    email    VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT pk_account PRIMARY KEY (id)
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
    thumbnail   VARCHAR(255)           NOT NULL,
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
    id        BIGINT  NOT NULL,
    id_course BIGINT  NOT NULL,
    id_user   BIGINT  NOT NULL,
    status    BOOLEAN NOT NULL,
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
    id     BIGINT   NOT NULL,
    amount SMALLINT NOT NULL,
    CONSTRAINT pk_equipment_type PRIMARY KEY (id)
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
    phone_number VARCHAR(10)  NOT NULL,
    first_name   VARCHAR(255) NOT NULL,
    last_name    VARCHAR(255) NOT NULL,
    gender       BOOLEAN      NOT NULL,
    dob          date         NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);

-- Sân Bóng
CREATE TABLE football_field
(
    field_id    BIGSERIAL PRIMARY KEY,
    field_name  VARCHAR(100) NOT NULL,
    location    VARCHAR(255) NOT NULL,
    field_type  VARCHAR(20)  NOT NULL CHECK (field_type IN ('5v5', '7v7', '11v11')),
    status      VARCHAR(20)  NOT NULL CHECK (status IN ('active', 'maintenance')) DEFAULT 'active',
    description TEXT,
    image_url   VARCHAR(255),
    created_at  TIMESTAMP                                                         DEFAULT CURRENT_TIMESTAMP
);
-- Giá thuê sân theo khung giờ
CREATE TABLE pricefield
(
    pricing_id BIGSERIAL PRIMARY KEY,
    field_id   BIGINT           NOT NULL,
    start_time TIME             NOT NULL,
    end_time   TIME             NOT NULL,
    rate       DOUBLE PRECISION NOT NULL,
    CHECK (start_time < end_time),
    FOREIGN KEY (field_id) REFERENCES football_field (field_id) ON DELETE CASCADE
);
-- Lịch đặt sân
CREATE TABLE bookingfield
(
    booking_id     BIGSERIAL PRIMARY KEY,
    field_id       BIGINT           NOT NULL,
    customer_id    BIGINT           NOT NULL,
    customer_name  VARCHAR(255)     NOT NULL,
    customer_phone VARCHAR(10)      NOT NULL,
    start_time     TIMESTAMP        NOT NULL,
    end_time       TIMESTAMP        NOT NULL,
    booking_status VARCHAR(20)      NOT NULL DEFAULT 'PENDING', --CONFIRMED, CANCELLED
    deposit_amount DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    total_amount   DOUBLE PRECISION NOT NULL,
    payment_method VARCHAR(20) CHECK (payment_method IN ('cash', 'bank_transfer')),
    created_at     TIMESTAMP                 DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (field_id) REFERENCES football_field (field_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES "user" (id) ON DELETE CASCADE,
    CHECK (start_time < end_time)
);
-- Thời gian mặc định của sân
CREATE TABLE time_slots
(
    timeslot_id BIGSERIAL PRIMARY KEY,
    field_id    BIGINT NOT NULL,
    start_time  TIME   NOT NULL,
    end_time    TIME   NOT NULL,
    FOREIGN KEY (field_id) REFERENCES football_field (field_id) ON DELETE CASCADE,
    CHECK (start_time < end_time)
);

ALTER TABLE account
    ADD CONSTRAINT FK_ACCOUNT_ON_ID FOREIGN KEY (id) REFERENCES "user" (id);

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

ALTER TABLE role_claim
    ADD CONSTRAINT FK_ROLE_CLAIM_ON_ID_ROLE FOREIGN KEY (id_role) REFERENCES role (id);

ALTER TABLE role_claim
    ADD CONSTRAINT FK_ROLE_CLAIM_ON_ID_USER FOREIGN KEY (id_user) REFERENCES "user" (id);

ALTER TABLE room
    ADD CONSTRAINT FK_ROOM_ON_ID_ROOM_TYPE FOREIGN KEY (id_room_type) REFERENCES room_type (id);