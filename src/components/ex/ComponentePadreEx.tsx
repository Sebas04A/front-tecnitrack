const UserForm = withModalData(({ user, onSave, modalData }) => {
    const [formData, setFormData] = useState(user)
    const { closeModal } = useModal()

    const handleSubmit = () => {
        onSave(formData)
    }

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div>
            {/* Datos en vivo del modal context */}
            {modalData && modalData.currentTime && (
                <div className='mb-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg'>
                    <div className='flex items-center gap-2 mb-2'>
                        <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                        <p className='text-sm font-medium text-green-700'>Datos en tiempo real</p>
                    </div>
                    <p className='text-lg font-mono font-bold text-gray-800'>
                        🕒 {modalData.currentTime}
                    </p>
                    <p className='text-xs text-green-600 mt-1'>
                        ✅ Se actualiza automáticamente cada segundo a través del modal context
                    </p>
                </div>
            )}

            <div className='grid grid-cols-1 gap-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Nombre</label>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                </div>
            </div>

            <div className='flex gap-3 justify-end mt-6'>
                <button
                    type='button'
                    onClick={closeModal}
                    className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors'
                >
                    Cancelar
                </button>
                <button
                    type='button'
                    onClick={handleSubmit}
                    className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
                >
                    Guardar
                </button>
            </div>
        </div>
    )
})

// 🚀 MEJORA: Hook personalizado para usar modales fácilmente
const useModalActions = () => {
    const { openModal, openDynamicModal, closeModal, updateModalData, MODAL_TYPES } = useModal()

    const showLoading = useCallback(
        message => {
            openModal(MODAL_TYPES.LOADING, { message })
        },
        [openModal, MODAL_TYPES.LOADING]
    )

    const showAlert = useCallback(
        (title, message, type = 'info') => {
            openModal(MODAL_TYPES.ALERT, { title, message, type })
        },
        [openModal, MODAL_TYPES.ALERT]
    )

    const showConfirm = useCallback(
        (title, message, onConfirm, onCancel) => {
            openModal(MODAL_TYPES.CONFIRM, { title, message, onConfirm, onCancel })
        },
        [openModal, MODAL_TYPES.CONFIRM]
    )

    const showDelete = useCallback(
        (title, itemName, onConfirm) => {
            openModal(MODAL_TYPES.DELETE, { title, itemName, onConfirm })
        },
        [openModal, MODAL_TYPES.DELETE]
    )

    const showForm = useCallback(
        (title, component, initialData = {}, size = 'md') => {
            openDynamicModal(MODAL_TYPES.FORM, () => component, { title, size }, initialData)
        },
        [openDynamicModal, MODAL_TYPES.FORM]
    )

    return {
        showLoading,
        showAlert,
        showConfirm,
        showDelete,
        showForm,
        closeModal,
        updateModalData,
    }
}

// Componente de ejemplo SIMPLIFICADO
const CrudExample = () => {
    const modalActions = useModalActions() // 🚀 Hook simplificado
    const [users, setUsers] = useState([
        { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
        { id: 2, name: 'María García', email: 'maria@example.com' },
        { id: 3, name: 'Carlos López', email: 'carlos@example.com' },
    ])
    const [selectedUser, setSelectedUser] = useState(null)
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

    // Timer que actualiza el tiempo
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    // Actualizar datos del modal cuando cambie el tiempo
    React.useEffect(() => {
        if (selectedUser) {
            modalActions.updateModalData({
                ...selectedUser,
                currentTime,
                lastUpdate: Date.now(),
            })
        }
    }, [currentTime, selectedUser, modalActions])

    // 🚀 SIMPLIFICADO: Manejo de edición
    const handleEdit = user => {
        setSelectedUser(user)
        modalActions.showForm(
            'Editar Usuario',
            <UserForm user={user} onSave={handleSave} />,
            { ...user, currentTime },
            'lg'
        )
    }

    const handleSave = updatedUser => {
        setUsers(users.map(u => (u.id === updatedUser.id ? updatedUser : u)))
        setSelectedUser(null)
        modalActions.closeModal()
        modalActions.showAlert('Éxito', 'Usuario actualizado correctamente', 'success')
    }

    // 🚀 SIMPLIFICADO: Manejo de eliminación
    const handleDelete = user => {
        setSelectedUser(user)
        modalActions.showDelete('Eliminar Usuario', user.name, () => confirmDelete(user.id))
    }

    const confirmDelete = async userId => {
        modalActions.showLoading('Eliminando usuario...')

        setTimeout(() => {
            setUsers(users.filter(u => u.id !== userId))
            setSelectedUser(null)
            modalActions.showAlert('Éxito', 'Usuario eliminado correctamente', 'success')
        }, 1500)
    }

    return (
        <div className='p-6 max-w-5xl mx-auto'>
            <h1 className='text-3xl font-bold mb-6 text-gray-800'>
                Sistema de Modales Mejorado 🚀
            </h1>

            <div className='mb-6 flex flex-wrap gap-3 items-center'>
                <button
                    onClick={() =>
                        modalActions.showConfirm(
                            'Confirmar Acción',
                            '¿Estás seguro de que deseas continuar?',
                            () =>
                                modalActions.showAlert(
                                    'Confirmado',
                                    'Acción ejecutada correctamente',
                                    'success'
                                )
                        )
                    }
                    className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
                >
                    Confirmar Acción
                </button>

                <button
                    onClick={() =>
                        modalActions.showAlert(
                            'Información',
                            'Este es un mensaje informativo',
                            'info'
                        )
                    }
                    className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'
                >
                    Mostrar Info
                </button>

                <div className='px-4 py-2 bg-gray-100 rounded-lg border'>
                    <span className='text-sm text-gray-600'>Tiempo: </span>
                    <span className='font-mono font-bold text-blue-600'>{currentTime}</span>
                </div>
            </div>

            <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
                <table className='min-w-full'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Nombre
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Email
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {users.map(user => (
                            <tr key={user.id} className='hover:bg-gray-50'>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                    {user.name}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                    {user.email}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className='text-blue-600 hover:text-blue-900 mr-3 transition-colors'
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user)}
                                        className='text-red-600 hover:text-red-900 transition-colors'
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
