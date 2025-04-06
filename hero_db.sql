CREATE TABLE heros (
    hero_id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    hero_name varchar(30) NOT NULL Unique,
    hero_class varchar(15) NOT NULL,
    hero_role varchar(10) NOT NULL,
    hero_pic varchar (30) NOT NULL Unique,
    hero_winr int NOT NULL
);