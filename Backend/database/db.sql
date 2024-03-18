-- to create a new database
CREATE DATABASE therightdoctordb;

-- to use database
use therightdoctordb;

-- creating a new table with Name, Age, Gender, Mobile number
CREATE TABLE person (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    gender VARCHAR(50),
    dob JSON,
    mobile VARCHAR(20)
);

-- to show all tables
show tables;

-- to describe table
describe person;
