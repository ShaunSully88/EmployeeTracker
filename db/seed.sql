INSERT INTO department (name)
VALUES
('Forward'),
('Defense'),
('Goalie'),
('Brass');


INSERT INTO role (title, salary, department_id)
VALUES
('Center', 2000000, 1),
('Left Wing', 1500000, 1),
('Right Wing', 1500000, 1),
('Left Defense', 1000000, 2),
('Right Defense', 1000000, 2),
('Starter', 2000000, 3),
('Backup', 800000, 3),
('Head Coach', 500000, 4),
('General Manager', 750000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Sidney', 'Crosby', 1, 1),
('Evgeni', 'Malkin', 1, 2),
('Jeff', 'Carter', 1, NULL),
('Jake', 'Guentzel', 2, NULL),
('Jason', 'Zucker', 2, NULL),
('Danton', 'Heinen', 2, NULL),
('Bryan', 'Rust', 3, NULL),
('Kasperi', 'Kapanen', 3, NULL),
('Brock', 'McGinn', 3, NULL),
('Brian', 'Dumolin', 4, 3),
('Mike', 'Matheson', 4, NULL),
('Kris', 'Letang', 5, 4),
('John', 'Marino', 5, NULL),
('Tristan', 'Jarry', 6, NULL),
('Casey', 'DeSmith', 7, NULL),
('Louis', 'Domingue', 7, NULL),
('Mike', 'Sullivan', 8, 5),
('Ron', 'Hextall', 9, 6),
(' Brian', 'Burke', 9, 7);