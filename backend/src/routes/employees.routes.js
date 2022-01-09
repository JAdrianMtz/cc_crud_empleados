const { Router } = require('express');
const router = Router();

const { 
    getEmployees, 
    createEmployee, 
    getEmployee, 
    updateEmployee, 
    deleteEmployee 
} = require('../controllers/employees.controllers');

router.route('/')
    .get(getEmployees)
    .post(createEmployee);

router.route('/:id')
    .get(getEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee);

module.exports = router;