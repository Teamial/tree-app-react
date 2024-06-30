CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    bio TEXT NOT NULL,
    created TIMESTAMP NOT NULL
);