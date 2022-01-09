import React, { useEffect, useState } from 'react';

import axios from 'axios';
import MaterialTable from "material-table";
import Swal from 'sweetalert2';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

import { AddEmployeeFab } from '../ui/AddEmployeeFab';
import tableIcons from '../icons/MaterialTableIcon';
import { errorSwal } from '../ui/ErrorSwal';

const columns = [
    { title: "Nombre", field: "name" },
    { title: "Apellido", field: "lastName" },
    { title: "Correo", field: "email" },
    { title: "Teléfono", field: "phone" },
    { title: "ID", field: "id", hidden: true, filtering: false },
];

const EmployeeScreen = () => {

    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, [])

    const fetchEmployees = async () => {
        try {
            const res = await axios.get(
                process.env.REACT_APP_API + '/employees'
            );
            setEntries([]);
            if (res.data.length > 0) {
                setEntries(
                    res.data.map(entry => (
                        {
                            id: entry._id,
                            name: entry.name,
                            lastName: entry.lastName,
                            email: entry.email,
                            phone: entry.phone
                        }
                    ))
                );
            }
        } catch (error) {
            errorSwal('Hubo un error al mostrar los empleados');
        }
    }

    const handleEdit = (row) => {
        window.location.href = '/employees/edit/' + row.id;
    }

    const handleDelete = async (row) => {
        Swal.fire({
            title: `¿Desea eliminar este empleado? \n${row.name} ${row.lastName}`,
            text: "El empleado se eliminará de forma permanente",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(
                        process.env.REACT_APP_API + '/employees/' + row.id
                    );
                    if (res.data.message === 'Ok') {
                        fetchEmployees();
                        Swal.fire(
                            'Eliminado',
                            'El empleado ha sido eliminado',
                            'success'
                        )
                    }
                } catch (error) {
                    errorSwal('Hubo un error al eliminar al empleado');
                }
            }
        })
    }

    return (
        <div>
            <MaterialTable
                title="Empleados"
                icons={tableIcons}
                columns={columns}
                data={entries}
                actions={[
                    {
                        icon: Edit,
                        tooltip: 'Editar empleado',
                        onClick: (event, rowData) => handleEdit(rowData)
                    },
                    {
                        icon: Delete,
                        tooltip: 'Eliminar empleado',
                        onClick: (event, rowData) => handleDelete(rowData)
                    }
                ]}
                options={{
                    actionsColumnIndex: -1,
                    exportButton: true
                }}
                localization={{
                    header: {
                        actions: 'Acciones'
                    }
                }}
            />

            <AddEmployeeFab />

        </div>
    )
}

export default EmployeeScreen;
