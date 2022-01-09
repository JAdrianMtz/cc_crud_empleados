import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Col from 'react-bootstrap/esm/Col';
import { useParams } from 'react-router-dom';
import { errorSwal } from '../ui/ErrorSwal';

const initEmployee = {
    _id: '',
    name: '',
    lastName: '',
    email: '',
    phone: '',
};

const EmployeeForm = () => {
    const [validated, setValidated] = useState(false);
    const [formValues, setFormValues] = useState(initEmployee);

    const { id } = useParams();

    useEffect(() => {
        setFormValues(initEmployee);
        if (id) {
            fetchEmployee();
        }
    }, [id])

    const fetchEmployee = async () => {
        try {
            const res = await axios.get(
                process.env.REACT_APP_API + '/employees/' + id
            );
            if (res.data) {
                setFormValues(res.data);
            }
        } catch (error) {
            errorSwal('Hubo un error al mostrar al empleado');
        }
    }

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const form = evt.currentTarget;
        if (form.checkValidity() === false) {
            evt.stopPropagation();
        } 
            setValidated(true);
            try {
                let res = null;
                if (id) {
                    res = await axios.put(
                        process.env.REACT_APP_API + '/employees/' + id,
                        formValues
                    );
                } else {
                    res = await axios.post(
                        process.env.REACT_APP_API + '/employees',
                        formValues
                    );
                }
                if (res.data.message === 'Ok') {
                    window.location.href = '/';
                } else {
                    errorSwal('Hubo un error al guardar el empleado');
                }
            } catch (error) {
                errorSwal('Hubo un error al guardar el empleado');
            }
    }

    return (
        <div className="col-md-8 offset-md-2">
            <div className="card card-body text-center">
                <h4>{(id) ? 'Editar empleado' : 'Nuevo empleado'}</h4>
                <Form  validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3 justify-content-center">
                        <Form.Group as={Col} md="5" controlId="validationCustom01">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Nombre"
                                name='name'
                                value={formValues.name}
                                onChange={onInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Escriba un nombre
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="5" controlId="validationCustom02">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Apellido"
                                name='lastName'
                                value={formValues.lastName}
                                onChange={onInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Escriba un apellido
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3 justify-content-center">
                        <Form.Group as={Col} md="5" controlId="validationCustom03">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Correo electrónico"
                                name='email'
                                pattern='[\w\.]{3,}@([\w]{2,}\.)+[\w]{2,4}'
                                value={formValues.email}
                                onChange={onInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Escriba un correo válido
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="5" controlId="validationCustom04">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                required
                                type="tel"
                                placeholder="Teléfono"
                                name='phone'
                                pattern="[0-9]{3}[- ]?[0-9]{3}[- ]?[0-9]{4}"
                                value={formValues.phone}
                                onChange={onInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Escriba un teléfono válido
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button type="submit">Guardar</Button>
                </Form>
            </div>
        </div>
    )
}

export default EmployeeForm;