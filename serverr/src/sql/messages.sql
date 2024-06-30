CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    chatroom_id INT NOT NULL REFERENCES chatroom(id),
    text TEXT NOT NULL,
    created TIMESTAMP NOT NULL
);