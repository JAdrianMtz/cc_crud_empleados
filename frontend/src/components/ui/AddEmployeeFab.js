import React from 'react';
import Button from 'react-bootstrap/Button'


export const AddEmployeeFab = () => {

    const handleClickNew = () => {
        window.location.href = '/employees/create';
    }


    return (
        <div className='p-3 d-flex'>
            <Button
                className="btn btn-primary fab ml-auto"
                onClick={handleClickNew}
            >
                Agregar
            </Button>
        </div>
    )
}