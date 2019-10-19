How to run the application
--------------------------
Step 1: Database setup
-------
Database : infoys-portal
Table : employees

connect to mongodb with shell , try the below commands
------------------------------------------------------

use infoys-portal;

db.createCollection('employees');

db.employees.insertMany([{"id":1,"first_name":"Dita","last_name":"Suthren","email":"dsuthren0@godaddy.com","gender":"Female","ip_address":"221.4.206.99"},
{"id":2,"first_name":"Yank","last_name":"Bruyns","email":"ybruyns1@sbwire.com","gender":"Male","ip_address":"171.191.193.38"},
{"id":3,"first_name":"Daune","last_name":"Loachhead","email":"dloachhead2@edublogs.org","gender":"Female","ip_address":"82.114.245.229"},
{"id":4,"first_name":"Ulberto","last_name":"Baroche","email":"ubaroche3@vkontakte.ru","gender":"Male","ip_address":"176.49.247.10"},
{"id":5,"first_name":"Mahalia","last_name":"Skudder","email":"mskudder4@shinystat.com","gender":"Female","ip_address":"166.61.211.95"}]);

Step 2: Server startup
----------------------
go to terminal => goto server folder => 

npm install

npm start

path: http://127.0.0.1:9000


Step 3: Client startup
----------------------
go to terminal => goto client folder => 

npm install

npm start

path: http://127.0.0.1:3000











  