DROP DATABASE IF EXISTS codegigsDB;
CREATE DATABASE codegigsDB;

USE codegigsDB;

CREATE TABLE gigs(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NULL,
    technologies VARCHAR(45) NULL,
    budget INT default 0,
    description VARCHAR(45) NULL,
    contact_email VARCHAR(45) NULL,
    createdAt DATETIME NULL,
    updatedAt DATETIME NULL,
    PRIMARY KEY (id)
);

-- INSERT INTO gigs (title, technologies, budget, description, contact_email, createAT)
-- value ("")