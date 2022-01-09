const employeeCtrl = {};

const Employee = require('../models/Employee');

employeeCtrl.getEmployees = async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
};

employeeCtrl.createEmployee = async (req, res) => {
    try {
        const { name, lastName, email, phone } = req.body;
        const newEmployee = new Employee({
            name,
            lastName,
            email,
            phone
        });
        await newEmployee.save();
        res.json({ message: 'Ok' });
    } catch (error) {
        res.json({ message: 'Fail' });
    }
};

employeeCtrl.getEmployee = async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
}

employeeCtrl.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id)
        res.json({ message: 'Ok' });
    } catch (error) {
        res.json({ message: 'Fail' });
    }
}

employeeCtrl.updateEmployee = async (req, res) => {
    try {
        const { name, lastName, email, phone } = req.body;
        await Employee.findByIdAndUpdate(req.params.id, {
            name,
            lastName,
            email,
            phone
        });
        res.json({ message: 'Ok' });
    } catch (error) {
        res.json({ message: 'Fail' });
    }
}

module.exports = employeeCtrl;