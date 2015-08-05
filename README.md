# geeklogistics

pip install django ==1.6

pip install django-suit==0.2.13

pip install django-bootstrap-form 

pip install django-import-export

pip install xlrd

CREATE DATABASE geeklogistics DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

mysqldump --opt -u root -p -t geeklogistics > data.sql

alter table order_order modify order_status int;

alter table order_statusrecord modify status int;

alter table order_statusrecord change time ctime datetime;

alter table order_statusrecord add reject_reason varchar(300);
alter table order_statusrecord add receiver_name varchar(80);
alter table order_detail modify customer_address varchar(200);
alter table station_station add station_type int;

alter table order_order drop column receiver_name; 

python manage.py syncdb

python manage.py runserver

