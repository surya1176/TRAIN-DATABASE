drop database nodejs;
create database nodejs; 
use nodejs;

create table costumer ( 
id int auto_increment primary key, 
user_name varchar(255),
FirstName varchar(255),
MiddleName varchar(255), 
LastName varchar(255),
Occupation varchar(255),
dateofbirth varchar(255),
gender varchar(255),
email_id varchar(255), 
user_pass varchar(255),
mobilenumber varchar(255),
FlatNo varchar(255),
street varchar(255),
area varchar(255),
state varchar(255),
pincode varchar(255),
city varchar(255), 
wallet int
);
create table admin(
id int auto_increment primary key, 
user_name varchar(255),
user_pass varchar(255), 
email_id varchar(255)
);




create table train(
train_id int auto_increment primary key, 
train_name varchar(255), 
startlocation varchar(255), 
endlocation varchar(255),
sleepernonac int, 
seater int, 
sleeperac int, 
start_time time, 
basecost int
); 



create table train_stops( 
route varchar(255), 
stop_id int auto_increment primary key 
); 





create table stops_at (
train_id int not null, 
stop_id int not null, 
duration varchar(255),
platform int,
FOREIGN KEY(stop_id) REFERENCES train_stops(stop_id) on delete cascade, 
FOREIGN KEY(train_id) REFERENCES train(train_id) on delete cascade
);


create table availability(
availid int auto_increment primary key,
train_id int, 
travel_date varchar(255), 
sleeperac int,
seaternonac int, 
seater int,
FOREIGN KEY(train_id) REFERENCES train(train_id) on delete cascade
); 

create table ticket( 
train_id int,
id INT,
seats int,
ticket_id int auto_increment primary key, 
travel_date varchar(255),
cost varchar(255),
class varchar(255), 
booking_date varchar(255), 
FOREIGN KEY(train_id) REFERENCES train(train_id) ON delete cascade, 
FOREIGN KEY(id) REFERENCES costumer(id) on delete cascade
); 

insert into train_stops(route) 
values("Indore");
insert into train_stops(route) 
values("Bhopal");
insert into train_stops(route) 
values("Ranchi");
insert into train_stops(route) 
values("Solapur");
insert into train_stops(route) 
values("Jaipur");
insert into train_stops(route) 
values("Pune");

insert into train_stops(route) 
values("Agra");
insert into train_stops(route) 
values("Lucknow");
insert into train_stops(route) 
values("Mumbai"); 
insert into train_stops(route) 
values("Delhi");

 select * from train_stops;  
insert into train(train_name,startlocation,endlocation,sleepernonac,seater,sleeperac,start_time,basecost)
values("ganga express","Hyderabad","Mumbai",300,200,100, "12:40:00" , 250

);
insert into train(train_name,startlocation,endlocation,sleepernonac,seater,sleeperac,start_time,basecost)
values("narmada express","Hyderabad","Mumbai",300,200,100, "15:30:00" , 250

);
insert into train(train_name,startlocation,endlocation,sleepernonac,seater,sleeperac,start_time,basecost)
values("westcoast superfast express","Hyderabad","Mumbai",300,200,100, "10:20:00" , 250);
insert into train(train_name,startlocation,endlocation,sleepernonac,seater,sleeperac,start_time,basecost)
values("rajadhani express","Hyderabad","Mumbai",300,200,100, "07:00:00",250
);
insert into train(train_name,startlocation,endlocation,sleepernonac,seater,sleeperac,start_time,basecost)
values("westcoast express","Hyderabad","Delhi",200,200,100, "09:00:00",350 

);
insert into train(train_name,startlocation,endlocation,sleepernonac,seater,sleeperac,start_time,basecost)
values("fracoast express","Mumbai","Delhi",50,100,100, "20:00:00" , 600

);
insert into train(train_name,startlocation,endlocation,sleepernonac,seater,sleeperac,start_time,basecost)
values("westcoast express","Delhi","Mumbai",200,200,100, "15:15:00",600 

);
insert into train(train_name,startlocation,endlocation,sleepernonac,seater,sleeperac,start_time,basecost)
values("godavari express","Mumbai","Hyderabad",150,1030,100, "08:30:00", 250 

);
insert into train(train_name,startlocation,endlocation,sleepernonac,seater,sleeperac,start_time,basecost)
values("delhi express","Delhi","Hyderabad",150,10,150, "11:50:00", 350

);
insert into train(train_name,startlocation,endlocation,sleepernonac,seater,sleeperac,start_time)
values("Bombay express","Hyderabad","Mumbai",180,30,150, "19:10:00" , 250

);
insert into stops_at values(
1,1,"2hr",2
); 
insert into stops_at values(
1,2,"2.5hr",3
);


insert into stops_at values(
1,4,"4hr",5
);
insert into stops_at values(
1,6,"4hr",7
);
insert into stops_at values(
1,9,"5hr",3
);


insert into stops_at values(
2,3,"1hr",1
);
insert into stops_at values(
2,1,"3hr",1
);
insert into stops_at values(
2,2,"3.5hr",9
);
insert into stops_at values(
2,7,"6hr",4
);
insert into stops_at values(
2,8,"7hr",5
);
insert into stops_at values(
2,10,"9hr",4
);
insert into availability values(
1,1,"2022-11-22",150,150,150);





















