use nati;
CREATE TABLE user_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pfp VARCHAR(255),
    username VARCHAR(100),
    college VARCHAR(100),
    year VARCHAR(10),
    major VARCHAR(100),
    subject VARCHAR(100),
    note TEXT,
    day VARCHAR(50),
    time VARCHAR(50),
    contact VARCHAR(100)
);
SELECT * FROM user_info;


-- For TCP connections from 127.0.0.1
CREATE USER 'nati'@'127.0.0.1' IDENTIFIED BY 'nati123';
GRANT ALL PRIVILEGES ON nati.* TO 'nati'@'127.0.0.1';

-- Just in case, also keep localhost
GRANT ALL PRIVILEGES ON nati.* TO 'nati'@'localhost';

FLUSH PRIVILEGES;

SELECT * FROM user_info;

TRUNCATE TABLE swipes;

INSERT INTO user_info 
(pfp, username, college, year, major, subject, note, day, `time`, contact)
VALUES 
(
  'http://127.0.0.1:8000/images/test.jpg',
  'Nati',
  'JCCC',
  'Freshman',
  'Computer Engineering',
  'Circuits',
  'Let’s study',
  'Monday',
  '2PM',
  'email@test.com'
);

CREATE table swipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  swiper_id INT not null,
  swiped_id INT not null,
  direction ENUM("left", "right") not null, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
-- line 4: must be provided
--line 5: must be provided and the column must be one of those choices

-- goal is when user click yes or no don't show that user again even after log off
-- backend --> 
-- frontend --> 

show databases;

SELECT TABLE_SCHEMA, TABLE_NAME
FROM information_schema.TABLES
WHERE TABLE_NAME = 'swipes';

use nati;
show tables;

select DATABASE();

SHOW TABLES FROM nati;
DROP TABLE users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(25) NOT NULL UNIQUE,
    hashed_password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE user_info
ADD COLUMN user_id INT,
ADD FOREIGN KEY (user_id) REFERENCES users(id);

SELECT * FROM users WHERE id = 2;

SELECT * FROM user_info WHERE user_id = 2;

ALTER TABLE user_info ADD UNIQUE (user_id);

SELECT * FROM swipes;

