const mongodb = require('../database/dbOperations');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

let mapRoutes = (app) => {
    // routing Logic

    // READ All Employees
    app.get('/api/employees/', (request , response) => {
        // get database connection object
        let db = mongodb.getDB();
        db.collection('employees').find().toArray((err , employees) => {
            console.log(`The Records Found : ${employees.length}`);
            response.json(employees);
        });
    });

    // READ a Single Employee
    app.get('/api/employees/:id', (request , response) => {
        let empId = Number.parseInt(request.params.id);
        console.log(empId);
        // get database connection object
        let db = mongodb.getDB();
        db.collection('employees').find({id :empId}).limit(1).toArray(function(err, employees) {
            console.log(`The Records Found : ${employees.length}`);
            response.json(employees);
        });
    });

    // CREATE new employee
    app.post('/api/employees/', jsonParser , (request, response) => {
        // get database connection
        let db = mongodb.getDB();
        let newEmpId = 1;
        db.collection('employees').find().sort({_id: -1}).limit(1).toArray((err , employees) => {
            if(employees.length > 0){
                newEmpId = employees[0].id + 1;
            }

            let newEmployee = {
                id : newEmpId,
                first_name : request.body.first_name,
                last_name : request.body.last_name,
                email : request.body.email,
                gender : request.body.gender,
                ip_address : request.body.ip_address
            };
            db.collection('employees').insertOne(newEmployee, (err , r) => {
                console.log('Employee Record is inserted to database');
                response.json(newEmployee);
            });
        });
    });

    // UPDATE Employee
    app.put('/api/employees/:id', jsonParser ,(request,response) => {
        let empId  = Number.parseInt(request.params.id);
        let employee = {
            id : empId,
            first_name : request.body.first_name,
            last_name : request.body.last_name,
            email : request.body.email,
            gender : request.body.gender,
            ip_address : request.body.ip_address
        };
        // get db Connection Object
        let db = mongodb.getDB();
        db.collection('employees').findOneAndUpdate({id:empId}, {$set: employee}, (err, r) => {
            console.log('Employee Record is Updated to database');
            response.json(employee);
        });
    });

    // DELETE Employee Record
    app.delete('/api/employees/:id',(request,response) => {
        let empId  = Number.parseInt(request.params.id);
        // db connection object
        let db = mongodb.getDB();
        db.collection('employees').deleteOne({id : empId}, (err, r) => {
            console.log('Employee Record is Deleted from database');
            response.json(r);
        });
    });
};

module.exports = {
    mapRoutes
};