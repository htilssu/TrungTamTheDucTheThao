create table if not exists role (
    id bigint not null primary key,
    name varchar(255) not null
);

create table if not exists "user" (
    id bigint not null primary key,
    phone_number varchar(10) not null,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    gender boolean not null,
    dob date not null
);

create table if not exists role_claim (
    id bigint not null primary key,
    id_role bigint not null constraint role_claim_id_role_foreign references role,
    id_user bigint not null constraint role_claim_id_user_foreign references "user",
    constraint role_claim_role_user_unique unique (id_role, id_user)
);

create table if not exists equipment_type (
    id bigint not null primary key,
    amount smallint not null
);

create table if not exists equipment (
    id bigint not null primary key,
    id_equipment_type integer not null constraint equipment_id_equipment_type_foreign references equipment_type,
    status real not null
);

create table if not exists room_type (
    id bigint not null primary key,
    name varchar(255) not null
);

create table if not exists coach (
    id bigint not null primary key
);

create table if not exists room (
    id bigint not null primary key,
    capacity integer not null,
    name varchar(255) not null constraint room_name_unique unique,
    floor integer,
    building varchar(255),
    id_room_type bigint not null constraint room_id_room_type_foreign references room_type
);

create table if not exists course (
    id bigint not null primary key,
    name varchar(255) not null,
    description text not null,
    price double precision not null,
    time time(0) not null,
    start_date date not null,
    end_date date not null,
    slot smallint not null,
    thumbnail varchar(255) not null,
    id_coach bigint not null constraint fk_course_on_id_coach references coach,
    id_room bigint not null constraint fk_course_on_id_room references room
);

create table if not exists course_member (
    id bigint not null primary key,
    id_user bigint not null constraint course_member_id_user_foreign references "user",
    id_course bigint not null constraint course_member_id_course_foreign references course,
    constraint course_member_user_course_unique unique (id_user, id_course)
);

create table if not exists booking (
    id bigint not null primary key,
    id_user bigint not null constraint booking_id_user_foreign references "user",
    created_at timestamp with time zone default CURRENT_TIMESTAMP,
    booking_from timestamp with time zone not null,
    booking_to timestamp with time zone not null,
    id_room bigint not null constraint booking_id_room_foreign references room
);

create table if not exists course_request (
    id bigint not null primary key,
    id_course bigint not null references course,
    id_user bigint not null references "user",
    status boolean not null
);

create table if not exists account (
    id bigint not null primary key constraint account_id_foreign references "user",
    email varchar(255) not null constraint account_email_unique unique,
    password varchar(255) not null
);