import React, { useMemo, useState } from 'react'
import { ColumnDef, CrudContainer } from '../../crudGrid'
import { PerfilEmpresaData, PerfilPersonaNaturalData } from '../../../validation/perfil.schema'
import { useForm } from 'react-hook-form'
import ContainerForm from '../../PerfilForm/containerForm'
import { makeLocalCrudFetcher } from '../../crudGrid/helper/crud-helpers'
import CrudCrudo, { newActionCrud } from '../../crudGrid/CrudCrudo'
import { useModal } from '../../../hooks/useModal'
import { Modal } from '../../common/Modal'
import {
    activarUsuario,
    desactivarUsuario,
    getPerfilesJuridicos,
    getPerfilesNaturales,
    getPerfilJuridico,
    getPerfilNatural,
} from '../../../services/perfilApi'
import { ClienteNaturalListaResponse } from '../../../api'
import { ClienteEmpresaCrud, ClienteNaturalCrud } from '../../../types/usuario'
import { useModalActions } from '../../../hooks/useModalActions'
import FormsUnidos from '../../PerfilForm/FormsUnidos'
import { TIPO_PERSONA } from '../../../constants/perfil'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'

const columnsNatural: ColumnDef<ClienteEmpresaCrud>[] = [
    {
        header: 'RUC',
        key: 'numeroIdentificacion',
    },
    {
        header: 'Razón Social',
        key: 'razonSocial',
    },
    {
        header: 'Teléfono',
        key: 'telefonoPrincipal',
    },
    {
        header: 'Correo',
        key: 'correoPrincipal',
    },
    {
        header: 'Dirección',
        key: 'direccion',
    },
    // {
    //     header:"Contacto Principal",
    //     key: 'contactoPrincipal',
    // }
    {
        header: 'Estado',
        key: 'estado',
    },
]
const defaultValues: PerfilEmpresaData = {
    RUC: '',
    razonSocial: '',
    nombreComercial: '',
    numeroSucursal: '',
    nombreSucursal: '',
    telefonoEmpresa: '',
    emailEmpresa: '',
    // telefonoSecundario: '',
    // emailSecundario: '',
    nombreRepresentanteLegal: '',
    // genero: '',
}
export default function CrudEmpresa() {
    // const modal = useModalActions()
    const modal = useModal()
    const modalActions = useModalActions()

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
    } = useForm<PerfilEmpresaData>({
        mode: 'onChange',
        // resolver: yupResolver(schema),
        defaultValues,
    })
    const fetchData = useMemo(
        () =>
            makeLocalCrudFetcher<ClienteEmpresaCrud>({
                searchKeys: ['nombreCompleto', 'apellidoCompleto', 'numeroIdentificacion'],
                getAll: getPerfilesJuridicos,
            }),
        []
    )
    function openModal(row: ClienteEmpresaCrud) {
        modalActions.showEmptyModal({
            title: 'Información de la empresa',
            children: (
                <FormsUnidos
                    esCrud={true}
                    tipoPersona={TIPO_PERSONA.EMPRESA}
                    clienteId={row.id || -1}
                    datosYaGuardados={!isDirty}
                    setDatosYaGuardados={() => {}}
                />
            ),
            size: 'xl',
            noPadding: true,
        })
    }
    function onView(row: ClienteEmpresaCrud) {
        openModal(row)
    }
    function onDelete(row: ClienteEmpresaCrud) {
        modalActions.showConfirm({
            title: 'Confirmar eliminación',
            message: `¿Estás seguro de que deseas eliminar al cliente ${row.nombreComercial}? `,
            type: 'warning',
            onConfirm: () => {
                console.log('Eliminando cliente:', row.id)
                deleteQuery(row.id)
            },
        })
    }
    function onCreate() {
        openModal({ id: -1 } as ClienteEmpresaCrud)
    }
    function onEdit(row: ClienteEmpresaCrud) {
        openModal(row)
    }
    const onCrudActions = {
        onCreate,
        onView,
        onEdit,
        // onDelete,
    }
    const modalAction = useModalActions()
    const actionsCrud: newActionCrud<ClienteEmpresaCrud>[] = [
        {
            component: (row: ClienteEmpresaCrud) => {
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
            onAction: (row: ClienteEmpresaCrud) => {
                modalActions.showConfirm({
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
            component: (row: ClienteEmpresaCrud) => {
                if (row.estado)
                    return (
                        <div
                            title='Desactivar Usuario'
                            className='flex items-center gap-2 text-error cursor-pointer p-1 rounded-md hover:bg-error/20'
                        >
                            <FaToggleOff size={20} /> Desactivar
                        </div>
                    )
            },
            onAction: (row: ClienteEmpresaCrud) => {
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
    return (
        <CrudCrudo<ClienteEmpresaCrud, ClienteEmpresaCrud>
            onCrudActions={onCrudActions}
            columns={columnsNatural}
            fetchData={fetchData}
            newActionsCrud={actionsCrud}
            autoLoadOptions={{
                autoLoad: true,
                dependencies: [refresh],
            }}
        ></CrudCrudo>
    )
}
