create database EmployeeTracker_db;

use EmployeeTracker_db;

create table department (
    id int not null auto_increment,
    name varchar(30),
    primary key (id)
);

create table role (
    id int not null,
    title varchar(30),
    salary int not null,
    department_id int,
    primary key (id),
    foreign key (department_id) references department(id)
    on delete set null
);

create table employee (
    id int auto_increment, 
    first_name varchar(30),
    last_name varchar(30),
    role_id int not null,
    manager_id int,
    primary key (id),
    foreign key (manager_id) references employee(id)
    on delete set null,
    foreign key (role_id) references role(id),
);