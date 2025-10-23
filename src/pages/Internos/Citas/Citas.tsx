import CrudCitas from './Crud/CrudCitas'

export default function Citas() {
    console.warn('Renderizando')
    // Guardamos como string para trabajar cómodo con <input type="datetime-local">

    return (
        <div className=' space-y-4'>
            <CrudCitas />
        </div>
    )
}
