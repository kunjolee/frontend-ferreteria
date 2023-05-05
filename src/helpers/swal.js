import Swal from 'sweetalert2'

export const swalMessage = ({ title, text, icon = 'success' }) => {

    // resDescription = '', title = '', tipoIcon = 'success'

    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'Cool'
    })

}
