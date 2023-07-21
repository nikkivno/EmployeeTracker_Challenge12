insert into department (id, name)
 values
 (1, "Sales"),
 (2, "Engineering"),
 (3, "Finance"),
 (4, "Legal");
    

insert into role (id, title, salary, department_id)
values 
(1, "Sales Lead", 100000, 1),
(2, "Salesperson", 80000, 1),
(3, "Lead Engineer", 150000, 2),
(4, "Software Engineer", 120000, 2),
(5, "Account Manager", 160000, 3),
(6, "Accountant", 125000, 3),
(7, "Legal Team Aid", 250000, 4),
(8, "Lawyer", 190000, 4);


insert into employee (id, first_name, last_name, role_id)
values 
(1, "John", "Doe", 1),
(2, "Mike", "Chan", 1),
(3, "Ashley", "Rodriguez", 2),
(4, "Kevin", "Tupik", 2),
(5, "Kunal", "Slingh", 3),
(6, "Malia", "Brown", 3),
(7, "Sarah", "Lourd", 4),
(8, "Tom", "Allen", 4);

update employee
set manager_id = 1
where first_name = "Mike";

update employee
set manager_id = 3
where first_name = "Kevin";

update employee
set manager_id = 5
where first_name = "Malia";

update employee
set manager_id = 7
where first_name = "Tom";