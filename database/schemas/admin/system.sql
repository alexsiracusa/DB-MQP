-- ===================================
-- SNAPT - Summer '24 MQP
-- Lucas Lamenha, Gabe Olafsson, Ashleigh Perez, Alex Siracusa, Hanna Trinh
--
-- Admin Database System Setup
--
--
-- This file creates the necessary setup, including extension and functions,
-- for the 'admin' database.
--
-- ===================================


CREATE USER admin  WITH SUPERUSER PASSWORD 'admin';
CREATE DATABASE admin OWNER admin;
REVOKE ALL ON DATABASE admin FROM PUBLIC;


CREATE EXTENSION pgcrypto;


CREATE OR REPLACE FUNCTION session_valid(
    expires_at TIMESTAMP,
    last_activity TIMESTAMP,
    timeout_duration INTERVAL
)
    RETURNS BOOLEAN
    LANGUAGE plpgsql
    AS
$$
BEGIN
   RETURN (
       CURRENT_TIMESTAMP < expires_at AND
       CURRENT_TIMESTAMP < last_activity + timeout_duration
    );
END;
$$;