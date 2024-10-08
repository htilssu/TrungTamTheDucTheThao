CREATE TABLE room_type
(
    id   BIGINT       NOT NULL,
    name VARCHAR(255) NOT NULL,
    CONSTRAINT room_type_pkey PRIMARY KEY (id)
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
    start_date  date             NOT NULL,
    end_date    date             NOT NULL,
    slot        SMALLINT         NOT NULL,
    id_coach    BIGINT           NOT NULL,
    id_room     BIGINT           NOT NULL,
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

-- Sân Bóng
CREATE TABLE football_field
(
    field_id BIGSERIAL PRIMARY KEY,
    field_name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    field_type VARCHAR(20) NOT NULL CHECK (field_type IN ('5v5', '7v7', '11v11')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'maintenance')) DEFAULT 'active',
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Giá thuê sân theo khung giờ
CREATE TABLE pricefield
(
    pricing_id BIGSERIAL PRIMARY KEY,
    field_id BIGINT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    rate DOUBLE PRECISION NOT NULL,
    CHECK (start_time < end_time),
    FOREIGN KEY (field_id) REFERENCES football_field (field_id) ON DELETE CASCADE
);
-- Lịch đặt sân
CREATE TABLE bookingfield
(
    booking_id BIGSERIAL PRIMARY KEY,
    field_id BIGINT NOT NULL,
    customer_id BIGINT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    booking_status VARCHAR(20) NOT NULL CHECK (booking_status IN ('confirmed', 'pending', 'cancelled')) DEFAULT 'pending',
    deposit_amount DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    total_amount DOUBLE PRECISION NOT NULL,
    payment_method VARCHAR(20) CHECK (payment_method IN ('cash', 'bank_transfer')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (field_id) REFERENCES football_field (field_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES "user" (id) ON DELETE CASCADE,
    CHECK (start_time < end_time)
);
-- Thời gian mặc định của sân
CREATE TABLE time_slots
(
    timeslot_id BIGSERIAL PRIMARY KEY,
    field_id BIGINT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    FOREIGN KEY (field_id) REFERENCES football_field (field_id) ON DELETE CASCADE,
    CHECK (start_time < end_time)
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