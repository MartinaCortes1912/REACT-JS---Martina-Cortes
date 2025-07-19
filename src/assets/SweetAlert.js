import Swal from 'sweetalert2'

export function dispararSweetBasico(titulo, text, icon, textoBoton) {
    Swal.fire({
        title: titulo,
        text: text,
        icon: icon,
        confirmButtonText: textoBoton,
        confirmButtonColor: 'rgb(202, 113, 97)',
        background: '#552626',
        iconColor: 'white',
        color: 'white',
    })
}

export function dispararSweetConfirmacion() {
    return Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        showCancelButton: true,
        color: 'white',
        iconColor: 'white',
        confirmButtonColor: 'rgb(202, 113, 97)',
        background: '#552626' ,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
    });
}

