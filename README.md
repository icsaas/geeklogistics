# geeklogistics

pip install django ==1.6

pip install django-suit==0.2.13

pip install django-bootstrap-form 

pip install django-import-export

pip install xlrd

CREATE DATABASE geeklogistics DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

mysqldump --opt -u root -p -t geeklogistics > data.sql

alter table order_order modify order_status int;

python manage.py syncdb

python manage.py runserver

