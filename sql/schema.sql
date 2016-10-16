use eat37;

drop table if exists indians;

create table indians (
	first_name varchar(20) not null,
	last_name varchar(20) not null,
	jersey int primary key not null,
	position char(1) not null,
	height int not null,
	weight int not null,
	batting_hand char(1) not null,
	throwing_hand char(1) not null,
	dob date not null
);

insert into indians (first_name, last_name, jersey, position, height, weight, batting_hand, throwing_hand, dob)
  values ('Austin', 'Adams', 49, 'P', 71, 200, 'R', 'R', '1986-08-19'),
  ('Cody', 'Allen', 37, 'P', 73, 210, 'R', 'R', '1988-11-20'),
  ('Cody', 'Anderson', 56, 'P', 76, 240, 'R', 'R', '1990-09-14'),
  ('Shawn', 'Armstrong', 51, 'P', 74, 225, 'R', 'R', '1990-09-11'),
  ('Trevor', 'Bauer', 47, 'P', 73, 200, 'R', 'R', '1991-01-17'),
  ('Mike', 'Clevinger', 52, 'P', 76, 210, 'R', 'R', '1990-12-21'),
  ('Joseph', 'Colon', 65, 'P', 72, 180, 'R', 'R', '1990-02-18'),
  ('Kyle', 'Crockett', 57, 'P', 74, 175, 'L', 'L', '1991-12-15'),
  ('Perci', 'Garner', 66, 'P', 75, 225, 'R', 'R', '1988-12-13'),
  ('Corey', 'Kluber', 28, 'P', 76, 215, 'R', 'R', '1986-04-10'),
  ('Jeff', 'Manship', 53, 'P', 74, 205, 'R', 'R', '1985-01-16'),
  ('Zach', 'McAllister', 34, 'P', 78, 240, 'R', 'R', '1986-12-08'),
  ('Ryan', 'Merritt', 54, 'P', 72, 180, 'L', 'L', '1992-02-21'),
  ('Andrew', 'Miller', 24, 'P', 79, 205, 'L', 'L', '1985-05-21'),
  ('Dan', 'Otero', 61, 'P', 75, 205, 'R', 'R', '1985-02-19'),
  ('Adam', 'Plutko', 62, 'P', 75, 200, 'R', 'R', '1991-10-03'),
  ('Danny', 'Salazar', 31, 'P', 72, 195, 'R', 'R', '1990-01-11'),
  ('Bryan', 'Shaw', 27, 'P', 73, 220, 'S', 'R', '1987-11-08'),
  ('Josh', 'Tomlin', 43, 'P', 73, 190, 'R', 'R', '1984-10-19'),
  ('Chris', 'Gimenez', 38, 'C', 74, 230, 'R', 'R', '1982-12-27'),
  ('Yan', 'Gomes', 10, 'C', 74, 215, 'R', 'R', '1987-07-19'),
  ('Adam', 'Moore', 45, 'C', 75, 220, 'R', 'R', '1984-05-08'),
  ('Roberto', 'Perez', 55, 'C', 71, 220, 'R', 'R', '1988-12-23'),
  ('Jesus', 'Aguilar', 36, 'I', 75, 250, 'R', 'R', '1990-06-30'),
  ('Erik', 'Gonzalez', 9, 'I', 75, 195, 'R', 'R', '1991-08-31'),
  ('Jason', 'Kipnis', 22, 'I', 71, 195, 'L', 'R', '1987-04-03'),
  ('Francisco', 'Lindor', 12, 'I', 71, 190, 'S', 'R', '1993-11-14'),
  ('Michael', 'Martinez', 1, 'I', 69, 180, 'S', 'R', '1982-09-16'),
  ('Mike', 'Napoli', 26, 'I', 73, 225, 'R', 'R', '1981-10-31'),
  ('Jose', 'Ramirez', 11, 'I', 69, 180, 'S', 'R', '1992-09-17'),
  ('Abraham', 'Almonte', 35, 'O', 69, 210, 'S', 'R', '1989-06-27'),
  ('Lonnie', 'Chisenhall', 8, 'O', 74, 190, 'L', 'R', '1988-10-04'),
  ('Coco', 'Crisp', 4, 'O', 70, 185, 'S', 'R', '1979-11-01'),
  ('Rajai', 'Davis', 20, 'O', 70, 195, 'R', 'R', '1980-10-19'),
  ('Brandon', 'Guyer', 6, 'O', 74, 200, 'R', 'R', '1986-01-28'),
  ('Tyler', 'Naquin', 30, 'O', 74, 195, 'L', 'R', '1991-04-24'),
  ('Carlos', 'Santana', 41, 'I', 71, 210, 'S', 'R', '1986-04-08');
