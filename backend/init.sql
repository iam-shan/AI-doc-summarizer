CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE chats (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  chat_id INTEGER NOT NULL,
  messages JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);