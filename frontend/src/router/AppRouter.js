import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import EmployeeForm from '../components/employee/EmployeeForm';
import EmployeeScreen from '../components/employee/EmployeeScreen';
import { Navbar } from '../components/ui/Navbar';

export const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <div>
                <Routes>
                    <Route exact path="/employees" element={<EmployeeScreen />} />
                    <Route exact path="/employees/create" element={<EmployeeForm />} />
                    <Route exact path="/employees/edit/:id" element={<EmployeeForm />} />

                    <Route
                        path="*"
                        element={<Navigate to="/employees" />}
                    />
                </Routes>
            </div>
        </Router>
    )
}