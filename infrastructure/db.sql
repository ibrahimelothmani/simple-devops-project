CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'student');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(250) NOT NULL UNIQUE,
  hashed_password VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'student'
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  teacher_id INT NOT NULL,
  FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  UNIQUE(student_id, course_id)
);

-- Mock hashed password for 'password123' used for testing
INSERT INTO users (name, email, hashed_password, role) VALUES 
('Admin User', 'admin@school.com', '$2b$12$LJXhMj2B6wT.1tH2q5101.wL6Ld.1iK7U0zX0G7.c9g0/Y4B/oQ1q', 'admin'),
('Teacher One', 'teacher@school.com', '$2b$12$LJXhMj2B6wT.1tH2q5101.wL6Ld.1iK7U0zX0G7.c9g0/Y4B/oQ1q', 'teacher'),
('Student Ibrahim', 'ibrahim@gmail.com', '$2b$12$LJXhMj2B6wT.1tH2q5101.wL6Ld.1iK7U0zX0G7.c9g0/Y4B/oQ1q', 'student');

INSERT INTO courses (name, description, teacher_id) VALUES 
('Math 101', 'Introduction to Mathematics', 2),
('Science 101', 'Introduction to Science', 2);

INSERT INTO enrollments (student_id, course_id) VALUES 
(3, 1),
(3, 2);
