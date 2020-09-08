create database imagerepo;
use imagerepo;



create table users(
	id int auto_increment primary key,
    username varchar(150) not null,
    password varchar(150) not null,
    money int null default 10000
);


create table imageDetails(
	id int auto_increment primary key,
    path varchar(250) not null,
    owner int,
    public boolean,
    price int,
    foreign key(owner) references users(id)
);

create table imagetags(
	id int auto_increment primary key,
    tag varchar(150),
    imageid int,
    foreign key (imageid) references imageDetails(id) on delete cascade
);


DELIMITER $$
create procedure add_image(
	in filePath varchar(150),
    in author int,
    in visibility boolean,
    in cost int,
    in param1 varchar(255)
)
BEGIN
  SET @text := TRIM(BOTH ',' FROM Param1);
  SET @strLen := 0;
  SET @i := 1;
  
  insert into imageDetails(path, owner, public, price) values (filePath, author, visibility, cost);
  
  set @lastInsertID := LAST_INSERT_ID();
  
  WHILE @strLen < LENGTH(@text)  DO
    SET @str := SUBSTRING_INDEX(@text, ',', @i);
    SET @strLen := LENGTH(@str);
    SET @i := @i + 1;

    INSERT INTO imagetags(tag, imageid) VALUES( SUBSTRING_INDEX(@str, ',', -1), @lastInsertID); -- Print split value
  END WHILE;
END
$$
DELIMITER ;

