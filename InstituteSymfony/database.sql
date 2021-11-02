CREATE DATABASE institute;
USE institute;

CREATE TABLE  school(
    id INT AUTO_INCREMENT,
    name VARCHAR(1290) NOT NULL,
    street VARCHAR(1290) NOT NULL,
    created DATETIME NOT NULL,
    updated DATETIME NOT NULL,
    status INT NOT NULL,

    CONSTRAINT pk_school_id PRIMARY KEY(id)
);