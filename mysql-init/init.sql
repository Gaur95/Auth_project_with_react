USE mydb;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);
INSERT INTO users (username, email, password) VALUES ('test', 'test@gmail.com', 'q123');
