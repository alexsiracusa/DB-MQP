-- ===================================
-- SNAPT - Summer '24 MQP
-- Lucas Lamenha, Gabe Olafsson, Ashleigh Perez, Alex Siracusa, Hanna Trinh
--
-- Admin Database Schema
--
-- ===================================

DROP TABLE IF EXISTS Account, Session;


CREATE TABLE Account (
    id              SERIAL  PRIMARY KEY,
    email           TEXT    NOT NULL,
    password_hash   TEXT    NOT NULL
);

CREATE UNIQUE INDEX ON Account ((lower(email)));

CREATE TABLE Session (
    id                  TEXT        PRIMARY KEY,    --This is the bcrypt hash of a uuid
    ip_address          INET        NOT NULL,
    account_id          INT         REFERENCES Account(id),
    session_start       TIMESTAMP   NOT NULL,
    expires_at          TIMESTAMP   NOT NULL,
    last_activity       TIMESTAMP   NOT NULL,
    timeout_duration    INTERVAL    NOT NULL
);

CREATE INDEX session_account_b_tree_index ON Session USING BTREE (account_id);



