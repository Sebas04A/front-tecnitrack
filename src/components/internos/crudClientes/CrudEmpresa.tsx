import React, { useMemo, useState } from 'react'
import { ColumnDef, CrudContainer } from '../../crudGrid'
import { PerfilEmpresaData, PerfilPersonaNaturalData } from '../../../validation/perfil.schema'
import { useForm } from 'react-hook-form'
import ContainerForm from '../../PerfilForm/containerForm'
import { makeLocalCrudFetcher } from '../../crudGrid/helper/crud-helpers'
import CrudCrudo from '../../crudGrid/CrudCrudo'
import { useModal } from '../../../hooks/useModal'
import { Modal } from '../../common/Modal'
import {
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

const columnsNatural: ColumnDef<ClienteEmpresaCrud>[] = [
    {
        header: 'RUC',
        key: 'numeroIdentificacion',
    },
    {
        header: 'Nombre Comercial',
        key: 'nombreComercial',
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
                searchKeys: ['nombreCompleto', 'apellidoCompleto', 'numeroDocumento'],
                getAll: getPerfilesJuridicos,
            }),
        []
    )
    function openModal(row: ClienteEmpresaCrud) {
        modal.openModal({
            component: FormsUnidos,
            props: {
                tipoPersona: TIPO_PERSONA.EMPRESA,
                clienteId: row.clienteId,
                datosYaGuardados: !isDirty,
                setDatosYaGuardados: () => {},
            },
        })
    }
    function onView(row: ClienteEmpresaCrud) {
        openModal(row)
    }
    function onDelete(row: ClienteEmpresaCrud) {
        modalActions.showConfirm({
            title: 'Confirmar eliminación',
            message: `¿Estás seguro de que deseas eliminar al cliente ${row.razonSocial}? `,
            type: 'warning',
            onConfirm: () => {
                console.log('Eliminando cliente:', row)
                deleteQuery(row)
            },
        })
    }
    function onCreate() {
        openModal({ clienteId: -1 } as ClienteEmpresaCrud)
    }
    function onEdit(row: ClienteEmpresaCrud) {
        openModal(row)
    }
    const onCrudActions = {
        onCreate,
        onView,
        onEdit,
        onDelete,
    }
    return (
        <CrudCrudo<ClienteEmpresaCrud>
            onCrudActions={onCrudActions}
            columns={columnsNatural}
            fetchData={fetchData}
        ></CrudCrudo>
    )
}
