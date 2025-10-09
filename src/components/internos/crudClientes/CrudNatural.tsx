import React, { useMemo, useState } from 'react'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'
import { ColumnDef, CrudContainer } from '../../crudGrid'
import { PerfilPersonaNaturalData } from '../../../validation/perfil.schema'
import { useForm } from 'react-hook-form'
import ContainerForm from '../../PerfilForm/containerForm'
import { makeLocalCrudFetcher } from '../../crudGrid/helper/crud-helpers'
import CrudCrudo, { newActionCrud, onCrudActionsProps } from '../../crudGrid/CrudCrudo'
import { useModal } from '../../../hooks/useModal'
import { Modal } from '../../common/Modal'
import {
    activarUsuario,
    deletePerfilNaturalAdmin,
    desactivarUsuario,
    getPerfilesNaturales,
    getPerfilNatural,
} from '../../../services/perfilApi'
import { ClienteNaturalListaResponse } from '../../../api'
import { ClienteNaturalCrud } from '../../../types/usuario'
import { useModalActions } from '../../../hooks/useModalActions'
import FormsUnidos from '../../PerfilForm/FormsUnidos'
import { TIPO_PERSONA } from '../../../constants/perfil'
import BaseModal from '../../common/modals/BaseModal'

const columnsNatural: ColumnDef<ClienteNaturalCrud>[] = [
    {
        header: 'Documeno',
        key: 'numeroIdentificacion',
    },
    {
        header: 'Nombre',
        key: 'nombreCompleto',
        sortable: true,
    },
    {
        header: 'Teléfono',
        key: 'telefono',
    },
    {
        header: 'Correo',
        key: 'correo',
    },
    {
        header: 'Dirección',
        key: 'direccion',
    },
    {
        header: 'Estado',
        key: 'estado',
        render: value =>
            value ? (
                <div className='rounded p-1 text-xs flex text-center w-full justify-center bg-success-auto'>
                    Activo
                </div>
            ) : (
                <div className='rounded p-1 text-xs flex text-center w-full justify-center bg-error-auto'>
                    Inactivo
                </div>
            ),
        sortable: true,
    },
]
const defaultValues: PerfilPersonaNaturalData = {
    nombreCompleto: '',
    apellidoCompleto: '',
    tipoIdentificacion: '',
    numeroIdentificacion: '',
    fechaNacimiento: '',
    genero: '',
}
export default function CrudNatural() {
    const modal = useModal()
    const modalAction = useModalActions()

    const [refresh, setNewRefresh] = useState(0)
    function refreshTable() {
        setNewRefresh(prev => prev + 1)
    }

    function createQuery(data: any) {}
    function updateQuery(data: any) {}
    function deleteQuery(data: any) {}
    const {
        handleSubmit,
        reset,
        formState: { isDirty },
    } = useForm<PerfilPersonaNaturalData>({
        mode: 'onChange',
        // resolver: yupResolver(schema),
        defaultValues,
    })

    const fetchData = useMemo(
        () =>
            makeLocalCrudFetcher<ClienteNaturalCrud>({
                searchKeys: [
                    'nombreCompleto',
                    'apellidoCompleto',
                    'numeroIdentificacion',
                    'correo',
                ],
                getAll: getPerfilesNaturales,
            }),
        []
    )
    function mostrarModal(row: ClienteNaturalCrud) {
        console.warn('Mostrando modal para:', row)
        modalAction.showEmptyModal({
            title: 'Información del cliente',
            children: (
                <FormsUnidos
                    tipoPersona={TIPO_PERSONA.NATURAL}
                    esCrud={true}
                    clienteId={row.id || -1}
                    datosYaGuardados={!isDirty}
                    setDatosYaGuardados={() => {}}
                />
            ),

            size: 'xl',
            noPadding: true,
        })
    }

    function onView(row: ClienteNaturalCrud) {
        console.warn('Viend ocliente natural:', row)
        if (!row.estado)
            return modalAction.showAlert({
                title: 'Error',
                message: 'Cliente inactivo',
                type: 'error',
            })
        // modal.openModal({
        //     component: ComponentePrueba,
        //     props: {},
        // })
        mostrarModal(row)
        // modal.openModal({
        //     component: FormsUnidos,
        //     props: {
        //         tipoPersona: TIPO_PERSONA.NATURAL,
        //         clienteId: row.clienteId,
        //         datosYaGuardados: !isDirty,
        //         setDatosYaGuardados: () => {},
        //     },
        // })
    }
    function onDelete(row: ClienteNaturalCrud) {
        console.log('Eliminando cliente natural con id:', row.id)
        modalAction.showConfirm({
            title: 'Confirmar eliminación',
            message: `¿Estás seguro de que deseas eliminar al cliente ${row.nombreCompleto}? `,
            onConfirm: () => {
                console.log('Eliminando cliente:', row.id)
                deletePerfilNaturalAdmin(row.id)
                    .then(() => {
                        modalAction.showAlert({
                            title: 'Éxito',
                            message: `Cliente ${row.id} eliminado correctamente.`,
                            type: 'success',
                        })
                        refreshTable()
                    })
                    .catch((error: any) => {
                        modalAction.showAlert({
                            title: 'Error al eliminar',
                            message: error instanceof Error ? error.message : 'Error desconocido',
                            type: 'error',
                        })
                    })
            },
            type: 'warning',
        })
    }
    function onCreate() {
        mostrarModal({} as ClienteNaturalCrud)
    }
    function onEdit(row: ClienteNaturalCrud) {
        console.warn('Editando cliente natural:', row)
        if (!row.estado)
            return modalAction.showAlert({
                title: 'Error',
                message: 'Cliente inactivo',
                type: 'error',
            })
        mostrarModal(row)
    }
    const actionsCrud: newActionCrud<ClienteNaturalCrud>[] = [
        {
            component: (row: ClienteNaturalCrud) => {
                if (!row.estado)
                    return (
                        <div
                            title='Activar Usuario'
                            className='flex items-center gap-2 text-success cursor-pointer p-1 rounded-md hover:bg-success/20'
                        >
                            <FaToggleOn size={20} /> Activar
                        </div>
                    )
            },
            onAction: (row: ClienteNaturalCrud) => {
                modalAction.showConfirm({
                    title: 'Confirmar activación',
                    message: `¿Estás seguro de que deseas activar al cliente ${row.nombreCompleto}? `,
                    onConfirm: () => {
                        console.log('Activando cliente:', row.id)
                        const id = modalAction.showLoading('Activando...')
                        activarUsuario(row.id).then(
                            () => {
                                modalAction.closeModal(id)
                                modalAction.showAlert({
                                    title: 'Éxito',
                                    message: `Cliente ${row.nombreCompleto} activado correctamente.`,
                                    type: 'success',
                                })
                                refreshTable()
                            },
                            (error: any) => {
                                modalAction.closeModal(id)
                                modalAction.showAlert({
                                    title: 'Error al activar',
                                    message: error.message,
                                })
                            }
                        )
                    },
                })
            },
        },
        {
            component: (row: ClienteNaturalCrud) => {
                if (row.estado)
                    return (
                        <div
                            title='Desactivar Usuario'
                            className='flex items-center gap-2 text-success cursor-pointer p-1 rounded-md hover:bg-error/20'
                        >
                            <FaToggleOff size={20} /> Desactivar
                        </div>
                    )
            },
            onAction: (row: ClienteNaturalCrud) => {
                modalAction.showConfirm({
                    title: 'Confirmar activación',
                    message: `¿Estás seguro de que deseas desactivar al cliente ${row.nombreCompleto}? `,
                    onConfirm: () => {
                        console.log('Desactivando cliente:', row.id)
                        const id = modalAction.showLoading('desactivando...')
                        desactivarUsuario(row.id).then(
                            () => {
                                modalAction.closeModal(id)
                                modalAction.showAlert({
                                    title: 'Éxito',
                                    message: `Cliente ${row.nombreCompleto} desactivado correctamente.`,
                                    type: 'success',
                                })
                                refreshTable()
                            },
                            (error: any) => {
                                modalAction.closeModal(id)
                                modalAction.showAlert({
                                    title: 'Error al desactivar',
                                    message: error.message,
                                })
                            }
                        )
                    },
                })
            },
        },
    ]

    const onCrudActions: onCrudActionsProps<ClienteNaturalCrud, ClienteNaturalCrud> = {
        onCreate,
        onView,
        onEdit,
        // onDelete,
    }
    return (
        <CrudCrudo<ClienteNaturalCrud, ClienteNaturalCrud>
            onCrudActions={onCrudActions}
            newActionsCrud={actionsCrud}
            columns={columnsNatural}
            fetchData={fetchData}
            autoLoadOptions={{
                autoLoad: true,
                dependencies: [refresh],
            }}
        ></CrudCrudo>
    )
}
