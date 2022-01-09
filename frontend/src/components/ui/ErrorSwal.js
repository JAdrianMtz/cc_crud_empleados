import Swal from 'sweetalert2';


export const errorSwal = (message) => {

    return (
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message
        })
    )
}