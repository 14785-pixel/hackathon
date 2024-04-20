create table user(
    id int primary key auto_increment,
    full_name varchar(50),
    email varchar(30),
    password varchar(100),
    phone_no varchar(10),
    created_time datetime default current_timestamp
);


create table blogs(
    id int primary key auto_increment,
    title varchar(30),
    contents varchar(100),
    user_id int,
    category_id int,
    created_time datetime default current_timestamp,
    constraint fk_key foreign key(user_id) references user(id),
    constraint fk_key2 foreign key(category_id) references categories(id)
);

create table categories(
    id int primary key auto_increment,
    title varchar(30),
    description varchar(100)
);