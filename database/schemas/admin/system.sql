
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