import React , {Component} from 'react';
import axios from 'axios';

class EmployeeStore extends Component{
    constructor(props){
        super(props);
        this.state = {
            employees : [],
            newEmployee : {
                first_name : '',
                last_name : '',
                email : '',
                gender : '',
                ip_address : ''
            },
            editEmployee : {
                first_name : '',
                last_name : '',
                email : '',
                gender : '',
                ip_address : ''
            }
        };
    }



    // Predefined Life cycle method of React JS
    componentDidMount() {
        // Server Calls
        this.getAllEmployees();
    }

    // READ all Employees
    getAllEmployees = () => {
        axios.get('/api/employees')
            .then((response) => {
                // handle success
                this.setState({
                    employees : response.data
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    };

    // Change New Employee
    changeNewEmployee = (event) => {
        // get the employee from state
        let newEmployee = this.state.newEmployee;

        // Update the employee
        newEmployee[event.target.name] = event.target.value;

        // add back to state
        this.setState({
            newEmployee : newEmployee
        });
    };

    // Change Edit Employee
    changeEditEmployee = (event) => {
        // get the employee from state
        let editEmployee = this.state.editEmployee;

        // Update the employee
        editEmployee[event.target.name] = event.target.value;

        // add back to state
        this.setState({
            editEmployee : editEmployee
        });
    };

    // addNewEmployee
    // Insert New Employee Data to server
    addNewEmployee = () => {
        axios.post('/api/employees/', this.state.newEmployee)
            .then((response) => {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // editNewEmployee
    // Update Employee Data to server
    updateEmployee = (empId) => {
        axios.put(`/api/employees/${empId}`, this.state.editEmployee)
            .then((response) => {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // DELETE Employee
    // Update Employee from server / database
    deleteEmployee = (empId) => {
        axios.delete(`/api/employees/${empId}`)
            .then((response) => {
                console.log(response);
                this.getAllEmployees();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // Edit Employee Data
    editEmployeeData= (empId) => {
        let selectedEmployee = this.state.employees.find((employee) => {
            return employee.id === empId;
        });

        this.setState({
            editEmployee : selectedEmployee
        });
    };



    render() {
        let employeesList = this.state.employees.map((employee) => (
                <tr key={employee._id}>
                    <td>{employee.id}</td>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.ip_address}</td>
                    <td>
                        <button className='btn btn-primary btn-sm mt-0' data-toggle='modal' data-target='#edit-emp-modal' onClick={this.editEmployeeData.bind(this, employee.id)}>Edit</button>
                        <button className='btn btn-danger btn-sm mt-0' onClick={this.deleteEmployee.bind(this,employee.id)}>Delete</button>
                    </td>
                </tr>
        ));


        return(
            <div>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-header bg-primary text-white">
                                    <h2>Employee Portal</h2>
                                </div>
                                <div className="card-body bg-light">
                                    <button className='btn btn-primary' data-toggle='modal' data-target='#new-emp-modal'>Create New</button>
                                    <h2 className='float-right'>Total Records Found : {this.state.employees.length}</h2>
                                    <table className='table table-hover text-center mt-3'>
                                        <thead className='bg-dark text-white text-uppercase'>
                                            <tr>
                                                <th>EMP ID</th>
                                                <th>FIRST NAME</th>
                                                <th>LAST NAME</th>
                                                <th>EMAIL</th>
                                                <th>GENDER</th>
                                                <th>IP ADDRESS</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-white'>
                                                {employeesList}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                { /* ------------------- New Employee Modal -------------- */ }
                <div className="modal animated slideInLeft" id='new-emp-modal'>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h3>New Employee</h3>
                                <button className='close' data-dismiss='modal'>
                                    <i className='fa fa-times-circle'/>
                                </button>
                            </div>
                            <div className="modal-body bg-light">
                                <form>
                                    <div className="form-group">
                                        <input
                                            type='text'
                                            className='form-control'
                                            name = 'first_name'
                                            value={this.state.newEmployee.first_name}
                                            onChange={this.changeNewEmployee}
                                            placeholder='First Name'/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type='text'
                                            className='form-control'
                                            name = 'last_name'
                                            value={this.state.newEmployee.last_name}
                                            onChange={this.changeNewEmployee}
                                            placeholder='Last Name'/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type='text'
                                            className='form-control'
                                            name = 'email'
                                            value={this.state.newEmployee.email}
                                            onChange={this.changeNewEmployee}
                                            placeholder='Email'/>
                                    </div>
                                    <div className="form-group">
                                        <select
                                            className='form-control'
                                            name = 'gender'
                                            value={this.state.newEmployee.gender}
                                            onChange={this.changeNewEmployee}>

                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type='text'
                                            className='form-control'
                                            name = 'ip_address'
                                            value={this.state.newEmployee.ip_address}
                                            onChange={this.changeNewEmployee}
                                            placeholder='Ip Address'/>
                                    </div>
                                    <button className='btn btn-primary' onClick={this.addNewEmployee}>Add Employee</button>
                                    <button className='btn btn-dark' data-dismiss='modal'>Close</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                { /* ------------------- Edit Employee Modal -------------- */ }
                <div className="modal animated slideInRight" id='edit-emp-modal'>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h3>Edit Employee</h3>
                                <button className='close' data-dismiss='modal'>
                                    <i className='fa fa-times-circle'/>
                                </button>
                            </div>
                            <div className="modal-body bg-light">
                                <form>
                                    <div className="form-group">
                                        <input
                                            type='text'
                                            className='form-control'
                                            name = 'first_name'
                                            value={this.state.editEmployee.first_name}
                                            onChange={this.changeEditEmployee}
                                            placeholder='First Name'/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type='text'
                                            className='form-control'
                                            name = 'last_name'
                                            value={this.state.editEmployee.last_name}
                                            onChange={this.changeEditEmployee}
                                            placeholder='Last Name'/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type='text'
                                            className='form-control'
                                            name = 'email'
                                            value={this.state.editEmployee.email}
                                            onChange={this.changeEditEmployee}
                                            placeholder='Email'/>
                                    </div>
                                    <div className="form-group">
                                        <select
                                                className='form-control'
                                                name = 'gender'
                                                value={this.state.editEmployee.gender}
                                                onChange={this.changeEditEmployee}>

                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type='text'
                                            className='form-control'
                                            name = 'ip_address'
                                            value={this.state.editEmployee.ip_address}
                                            onChange={this.changeEditEmployee}
                                            placeholder='Ip Address'/>
                                    </div>
                                    <button className='btn btn-primary' onClick={this.updateEmployee.bind(this,this.state.editEmployee.id)}>Update Employee</button>
                                    <button className='btn btn-dark' data-dismiss='modal'>Close</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmployeeStore;