INSERT INTO department (name)
VALUES 
('Sales'),
('Engineering'), 
('Finance'),  
('Legal');

INSERT INTO role (title, salary, department_id )
VALUES 
/*1*/('Salesperson', 75000, 1),
/*2*/('Sales Lead', 950000, 1),
/*3*/('Jr. Engineer', 80000, 2),
/*4*/('Software Engineer', 95000, 2),
/*5*/('Senior Engineer', 120000, 2),
/*6*/('Accountant', 97000, 3),
/*7*/('Account Manager', 130000, 3),
/*8*/('Lawyer', 150000, 4);
/*9*/('Legal Team Lead', 185000, 4),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Jason', 'Bonilla', 1, NULL),
('Krista', 'Macntyre', 1, NULL),
('Simon', 'Erickson', 2, 1),
('George', 'Lucas', 3, 1),
('Adrian', 'Birds', 4, 2),
('Sierra', 'Mills', 5, NULL),
('Christopher', 'Hermie', 6, 3);
('Harmony', 'Tilly', 7, 7);
('Felicity', 'Hopwell', 8, NULL);
('Thomas', 'Gonzalez', 9, 9);