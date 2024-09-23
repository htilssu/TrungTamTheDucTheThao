CREATE TABLE "course"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "time" TIME(0) WITHOUT TIME ZONE NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "slot" SMALLINT NOT NULL
);
ALTER TABLE
    "course" ADD PRIMARY KEY("id");
CREATE TABLE "role"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "role" ADD PRIMARY KEY("id");
CREATE TABLE "equipment"(
    "id" BIGINT NOT NULL,
    "id_equipment_type" INTEGER NOT NULL,
    "status" FLOAT(3) NOT NULL
);
ALTER TABLE
    "equipment" ADD PRIMARY KEY("id");
CREATE TABLE "role_claim"(
    "id" BIGINT NOT NULL,
    "id_role" BIGINT NOT NULL,
    "id_user" BIGINT NOT NULL
);
ALTER TABLE
    "role_claim" ADD PRIMARY KEY("id");
CREATE TABLE "user"(
    "id" BIGINT NOT NULL,
    "phone_number" CHAR(10) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "gender" BOOLEAN NOT NULL,
    "dob" DATE NOT NULL
);
ALTER TABLE
    "user" ADD PRIMARY KEY("id");
CREATE TABLE "equipment_type"(
    "id" BIGINT NOT NULL,
    "amount" SMALLINT NOT NULL
);
ALTER TABLE
    "equipment_type" ADD PRIMARY KEY("id");
CREATE TABLE "course_member"(
    "id" BIGINT NOT NULL,
    "id_user" BIGINT NOT NULL,
    "id_course" BIGINT NOT NULL
);
ALTER TABLE
    "course_member" ADD PRIMARY KEY("id");
ALTER TABLE
    "course_member" ADD CONSTRAINT "course_member_id_user_unique" UNIQUE("id_user");
ALTER TABLE
    "course_member" ADD CONSTRAINT "course_member_id_course_unique" UNIQUE("id_course");
CREATE TABLE "room_type"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "room_type" ADD PRIMARY KEY("id");
CREATE TABLE "coach"("id" BIGINT NOT NULL);
ALTER TABLE
    "coach" ADD PRIMARY KEY("id");
CREATE TABLE "booking"(
    "id" BIGINT NOT NULL,
    "id_user" BIGINT NOT NULL,
    "id_room" BIGINT NOT NULL
);
ALTER TABLE
    "booking" ADD PRIMARY KEY("id");
CREATE TABLE "room"(
    "id" BIGINT NOT NULL,
    "id_room_type" BIGINT NOT NULL
);
ALTER TABLE
    "room" ADD PRIMARY KEY("id");
CREATE TABLE "account"(
    "id" BIGINT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "account" ADD PRIMARY KEY("id");
ALTER TABLE
    "account" ADD CONSTRAINT "account_email_unique" UNIQUE("email");
ALTER TABLE
    "role_claim" ADD CONSTRAINT "role_claim_id_role_foreign" FOREIGN KEY("id_role") REFERENCES "role"("id");
ALTER TABLE
    "course_member" ADD CONSTRAINT "course_member_id_course_foreign" FOREIGN KEY("id_course") REFERENCES "course"("id");
ALTER TABLE
    "room" ADD CONSTRAINT "room_id_room_type_foreign" FOREIGN KEY("id_room_type") REFERENCES "room_type"("id");
ALTER TABLE
    "booking" ADD CONSTRAINT "booking_id_room_foreign" FOREIGN KEY("id_room") REFERENCES "room"("id");
ALTER TABLE
    "equipment" ADD CONSTRAINT "equipment_id_equipment_type_foreign" FOREIGN KEY("id_equipment_type") REFERENCES "equipment_type"("id");
ALTER TABLE
    "role_claim" ADD CONSTRAINT "role_claim_id_user_foreign" FOREIGN KEY("id_user") REFERENCES "user"("id");
ALTER TABLE
    "course_member" ADD CONSTRAINT "course_member_id_user_foreign" FOREIGN KEY("id_user") REFERENCES "user"("id");
ALTER TABLE
    "account" ADD CONSTRAINT "account_id_foreign" FOREIGN KEY("id") REFERENCES "user"("id");
ALTER TABLE
    "booking" ADD CONSTRAINT "booking_id_user_foreign" FOREIGN KEY("id_user") REFERENCES "user"("id");