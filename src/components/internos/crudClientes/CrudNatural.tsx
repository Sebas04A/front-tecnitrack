import React, { useMemo, useState } from 'react'
import { ColumnDef, CrudContainer } from '../../crudGrid'
import { PerfilPersonaNaturalData } from '../../../validation/perfil.schema'
import { useForm } from 'react-hook-form'
import ContainerForm from '../../PerfilForm/containerForm'
import { makeLocalCrudFetcher } from '../../crudGrid/helper/crud-helpers'
import CrudCrudo, { onCrudActionsProps } from '../../crudGrid/CrudCrudo'
import { useModal } from '../../../hooks/useModal'
import { Modal } from '../../common/Modal'
import {
    deletePerfilNaturalAdmin,
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
        header: 'Documento',
        key: 'numeroIdentificacion',
    },
    {
        header: 'Nombre',
        key: 'nombreCompleto',
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
                searchKeys: ['nombreCompleto', 'apellidoCompleto', 'numeroDocumento'],
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
        mostrarModal(row)
    }
    const onCrudActions: onCrudActionsProps<ClienteNaturalCrud, ClienteNaturalCrud> = {
        onCreate,
        onView,
        onEdit,
        onDelete,
    }
    return (
        <CrudCrudo<ClienteNaturalCrud, ClienteNaturalCrud>
            onCrudActions={onCrudActions}
            columns={columnsNatural}
            fetchData={fetchData}
        ></CrudCrudo>
    )
}
