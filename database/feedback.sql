CREATE DATABASE IF NOT EXISTS feedback_db;

USE feedback_db;

CREATE TABLE IF NOT EXISTS feedback(
    id INT AUTO_INCEREMENT PRIMARY KEY,
    student_name VARCHAR(100),
    email VARCHAR(100),
    comments TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 

);