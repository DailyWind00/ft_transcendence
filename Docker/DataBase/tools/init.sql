-- TODO
-- Create the database
CREATE DATABASE ft_transcendence;

-- Connect to the database
\c ft_transcendence

-- Create a sample table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data
INSERT INTO users (username, email) VALUES
('${ADMIN_USERNAME}', '${ADMIN_EMAIL}'),
('${USER1_USERNAME}', '${USER1_EMAIL}');
