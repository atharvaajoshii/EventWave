CREATE DATABASE IF NOT EXISTS eventwave;
USE eventwave;

-- =========================
-- USERS TABLE
-- =========================

CREATE TABLE users (
    uid INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL
);

-- =========================
-- EVENTS TABLE
-- =========================

CREATE TABLE events (
    eid INT AUTO_INCREMENT PRIMARY KEY,
    eventname VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    venue VARCHAR(255) NOT NULL,
    capacity INT NOT NULL
);

-- =========================
-- REGISTRATIONS TABLE
-- =========================

CREATE TABLE registrations (
    regid INT AUTO_INCREMENT PRIMARY KEY,
    uid INT NOT NULL,
    eid INT NOT NULL,

    CONSTRAINT fk_user
        FOREIGN KEY (uid)
        REFERENCES users(uid)
        ON DELETE CASCADE,

    CONSTRAINT fk_event
        FOREIGN KEY (eid)
        REFERENCES events(eid)
        ON DELETE CASCADE,

    UNIQUE(uid, eid)
);

-- =========================
-- ADMIN
-- =========================

INSERT INTO users
(name, username, password, role)
VALUES
(
    'Administrator',
    'admin',
    'inspirante2026',
    'admin'
);

-- =========================
-- STUDENTS
-- =========================

INSERT INTO users
(name, username, password, role)
VALUES
('Asha Rao','asha.rao','student123','student'),
('Ravi Shetty','ravi.shetty','student123','student'),
('Meera Nair','meera.nair','student123','student'),
('Kiran Bhat','kiran.bhat','student123','student'),
('Divya Kamath','divya.kamath','student123','student'),
('Suresh Pai','suresh.pai','student123','student'),
('Ananya Hegde','ananya.hegde','student123','student'),
('Rohan Shenoy','rohan.shenoy','student123','student'),
('Nisha Prabhu','nisha.prabhu','student123','student'),
('Tejas Mallya','tejas.mallya','student123','student'),
('Priya Bangera','priya.bangera','student123','student');

-- =========================
-- SAMPLE EVENTS
-- =========================

INSERT INTO events
(eventname, date, venue, capacity)
VALUES
('Tech Symposium 2026','2026-07-10','Main Auditorium',120),
('Hackathon','2026-07-15','Lab Block C',40),
('Cultural Fest','2026-07-20','Open Amphitheatre',300),
('Workshop: React Basics','2026-07-22','Seminar Hall 2',30),
('Placement Prep Talk','2026-07-25','Main Auditorium',200);