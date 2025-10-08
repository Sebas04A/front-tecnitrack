import { FieldValues, UseFormReturn } from 'react-hook-form'
import { ColumnDef } from '../../CrudTable'
import { CrudContainerProps, crudQueries, formModalCrudProps } from '../../CrudContainer'
import CrudCrudo, { autoLoadOptions, newActionCrud, onCrudActionsProps } from '../../CrudCrudo'
import { useEffect, useState } from 'react'
import { useModal } from '../../../../hooks/useModal'
import { useModalActions } from '../../../../hooks/useModalActions'
import GenericForm from '../../../form/GenericForm'
import { ObjectApiResponse } from '../../../../api'
import { parseAxiosError } from '../../../../utils/parseError'

import DateTimeSelector, { DateTimeSelection } from '../../../citas/DateTimeSelector'
import BaseModal from '../../../common/modals/BaseModal'
import { div, i, use } from 'framer-motion/client'
import { CitaDataCrud } from '../../../../types/cita'
import { CitaDataForm } from '../../../../validation/cita.schema'
import { CitasFilters } from './CitasFilters'

import { FaSign, FaSignInAlt } from 'react-icons/fa'
import MantenimientoIngreso from '../../../mantenimiento/MantenimientoIngreso'
import { crearOrden, obtenerOrden } from '../../../../services/citasApi'

interface CrudCitasContainerProps<TData, TForm extends FieldValues> {
    formModalProp: formModalCrudProps
    form: UseFormReturn<TForm>

    title?: string

    columns: ColumnDef<TData>[]
    defaultValues: TForm

    crudQueries: crudQueries<TData, TForm>

    autoLoadOptions?: autoLoadOptions

    isModalGrande?: boolean
    searchPlaceholder?: string
    pageSize?: number
}

export default function CrudCitasContainer<
    TData extends Record<string, any>,
    TForm extends FieldValues
>({
    formModalProp,
    form,
    columns,
    defaultValues,
    crudQueries,
    title,
    autoLoadOptions = { autoLoad: true, dependencies: [] },
    isModalGrande = false,
    searchPlaceholder,
    pageSize = 10,
}: CrudCitasContainerProps<TData, TForm>) {
    const { fetchData, createQuery, editQuery, deleteQuery } = crudQueries
    const { autoLoad = true, dependencies = [] } = autoLoadOptions
    const FormComponent = formModalProp.form
    const { handleSubmit, reset, trigger, register } = form

    const [reloadKey, setReloadKey] = useState(0)

    const modal = useModal()
    const modalActions = useModalActions()
    const [idFormModal, setIdFormModal] = useState<string>('')

    const [camposReadOnly, setCamposReadOnly] = useState(false)
    const [mode, setMode] = useState<'create' | 'edit' | 'view' | null>(null)
    const [actualRow, setActualRow] = useState<TForm | null>(null)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        console.log('CAMBIANDO PROPS')
        // console.log('Nuevos props:', propsModal)
        console.log('errors', form.formState.errors)
        console.log(formModalProp.props)

        modal.updateModalProps(idFormModal, {
            props: { ...formModalProp.props, readOnly: camposReadOnly },
        })
    }, [formModalProp.props, camposReadOnly, form.formState.errors])

    useEffect(() => {
        console.log('Dependencies changed, reloading data', { actualRow, mode })
        console.log(form.getValues())
        // setViewing(actualRow)
        if (!mode) return
        abrirModalDatos(actualRow, mode)
    }, [actualRow, mode])

    const closeAndReset = () => {
        console.warn('Closing modal and resetting form')
        modalActions.closeAllModals()
        setMode(null)
        setActualRow(null)
        setError('')
        reset(defaultValues)
    }
    async function openModalForm(fecha: Date) {
        console.warn('Opening form modal', { fecha })

        const var1 = await setTimeout(() => {
            console.log('Timeout started')
            return 'done'
        }, 10) // Esperar un ciclo de renderizado
        console.log('Timeout finished', var1)
        const title = mode === 'edit' ? 'Editar' : mode === 'view' ? 'Ver ' : 'Crear Nuevo'
        const submitText = mode === 'edit' ? 'Guardar Cambios' : mode === 'view' ? '' : 'Crear'
        const cancelText = mode === 'view' ? '' : 'Cancelar'
        const props = { ...formModalProp.props, readOnly: camposReadOnly, fecha }
        console.log('Opening form modal with props:', props)
        const id = modalActions.showForm({
            title,
            component: FormComponent,
            onSubmit: onSubmit,
            submitText,
            cancelText,
            onCancel: closeAndReset,
            size: isModalGrande ? 'xl' : 'md',
            props: props,
        })

        console.warn('Modal opened with ID:', id)
        setIdFormModal(id)
    }
    const abrirModalDatos = (
        actualRow: TForm | null = null,
        mode: 'create' | 'edit' | 'view' | null
    ) => {
        console.log('Opening data modal', { actualRow, mode })

        let id
        function CitasNew({
            isOpen,
            onClose,
            initialDate,
        }: {
            isOpen: boolean
            onClose: () => void
            initialDate?: Date
        }) {
            useEffect(() => {
                setFechaSeleccionada(initialDate ?? null)
            }, [initialDate])
            const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null)
            function handleSelectionChange(selection: DateTimeSelection) {
                setFechaSeleccionada(selection.fecha ?? null)
                console.log('Selected Date:', selection.selectedDate)
                console.log('Selected Slot:', selection.selectedSlot)
                console.log('Fecha y Hora ISO:', selection.fechaHoraISO)
            }
            function handleSlotSelect(date: Date) {
                console.log('Slot seleccionado')
                console.log('Fecha seleccionada:', date)
                modalActions.showConfirm({
                    title: 'Confirmar',
                    message: '¿Deseas proceder con la fecha seleccionada?',
                    confirmText: 'Sí',
                    cancelText: 'No',
                    onConfirm: () => {
                        reset({ ...defaultValues, fechaHoraInicio: formatDate(date) })
                        openModalForm(date)
                    },
                    type: 'info',
                })
            }

            return (
                <BaseModal
                    title={mode === 'edit' ? 'Editar Cita' : 'Nueva Cita'}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <DateTimeSelector
                        initialDate={initialDate ?? new Date()}
                        onSelectionChange={handleSelectionChange}
                        onSlotSelect={handleSlotSelect}
                        defaultSelectedDate={fechaSeleccionada}
                    />
                </BaseModal>
            )
        }

        if (mode !== 'view') {
            id = modal.openModal({
                component: CitasNew,
                props: {},
            })
            setIdFormModal(id)
            return
        }
        id = modalActions.showForm({
            title: 'Ver Cita',
            component: FormComponent,
            onSubmit: onSubmit,
            submitText: '',
            cancelText: 'Cerrar',
            onCancel: closeAndReset,
            size: isModalGrande ? 'xl' : 'md',
            props: { ...formModalProp.props, readOnly: true, fecha: actualRow?.fechaHoraInicio },
        })
    }

    const submitingRequest = async <Parametro, Retorno>(
        row: Parametro,
        cb: (row: Parametro) => Promise<Retorno>
    ) => {
        const id = modalActions.showLoading('Guardando...')
        setError('')
        try {
            const res = await cb(row)
            console.log('Response from submit:', res)

            modalActions.closeModal(id)
            closeAndReset()
            modalActions.showAlert({
                title: 'Éxito',
                message: 'Los datos se han guardado correctamente.',
                type: 'success',
            })
            setReloadKey(reloadKey + 1)
        } catch (error) {
            console.error('Error submitting form:', error)
            setError(parseAxiosError(error))
            modalActions.closeModal(id)

            modalActions.showAlert({
                title: 'Error',
                message: parseAxiosError(error),
                type: 'error',
            })
        }
    }
    const deleteRequest = async (row: TData) => {
        if (!row.id) throw new Error('No se puede eliminar una dirección sin ID')
        const res = await deleteQuery(row.id)
        console.log('Eliminado:', res)
        return res
    }
    const submitRequest = async (row: TForm) => {
        let res
        if (mode === 'edit') {
            res = await editQuery(row)
        } else if (mode === 'create') {
            res = await createQuery(row)
        } else {
            throw new Error(`Modo inválido para enviar el formulario ${mode}`)
        }
        console.log('Response from submit:', res)
        return res
    }

    const deleteAccion = async (row: TData) => {
        return submitingRequest(row, deleteRequest)
    }
    const onSubmit = handleSubmit(async (values: TForm) => {
        console.log('Submitted values:', values)
        return submitingRequest(values, submitRequest)
    })
    // const onSubmit = handleSubmit(async (values: TForm) => {
    //     console.log('Submitted values:', values)
    //     return submitingRequest(values, submitRequest)
    // })
    const formatDate = (d: Date) => {
        if (!d) throw new Error('Fecha no válida')
        const pad = (n: number) => n.toString().padStart(2, '0')
        const year = d.getFullYear()
        const month = pad(d.getMonth() + 1)
        const day = pad(d.getDate())
        const hours = pad(d.getHours())
        const minutes = pad(d.getMinutes())
        console.log('Fecha formateada:', `${year}-${month}-${day}T${hours}:${minutes}`)
        return `${year}-${month}-${day}T${hours}:${minutes}`
    }
    const onCrudActions: onCrudActionsProps<TData, TForm> = {
        onCreate: () => {
            console.log('Creating new entry, resetting form')
            setCamposReadOnly(false)
            setActualRow(null)
            console.log('Creating new entry')
            setMode('create')
            setError('')
            reset(defaultValues)
        },
        onEdit: (row: TForm) => {
            setCamposReadOnly(false)
            setActualRow(row)
            setMode('edit')
            setError('')
            reset(row)
            console.log('Editing row:', row)
        },
        onView: (row: TForm) => {
            console.log('Original row for viewing:', row)
            // row.fechaHoraInicio = formatDate(row.fecha)
            console.log('Viewing row:', row)
            setCamposReadOnly(true)
            setActualRow(row)
            setMode('view')
            reset(row)
        },
        onDelete: (row: TData) => {
            modalActions.showConfirm({
                title: 'Confirmar Eliminación',
                message: `¿Estás seguro de que quieres eliminar? Esta acción no se puede deshacer.`,
                confirmText: 'Eliminar',
                cancelText: 'Cancelar',
                onConfirm: async () => {
                    deleteAccion(row.id)
                },
                type: 'warning',
            })
            setError('')
        },
    }

    async function getOrden(citaId: number) {
        const idLoading = modalActions.showLoading('Cargando Orden..')

        try {
            const res = await obtenerOrden(citaId)
            modalActions.closeModal(idLoading)
            return res
        } catch (error) {
            modalActions.closeModal(idLoading)
            console.error('Error obteniendo orden desde cita:', error)
            modalActions.showAlert({
                title: 'Error al obtener orden',
                message: parseAxiosError(error),
                type: 'error',
            })
            return null
        }
    }

    async function crearOrdenParaIngresar(citaId: number) {
        console.warn('Creando orden para ingresar mantenimiento desde cita', citaId)
        const idLoading = modalActions.showLoading('Cargando Orden..')
        try {
            const res = await crearOrden(citaId)
            modalActions.closeModal(idLoading)
            return res
        } catch (error) {
            modalActions.closeModal(idLoading)
            console.error('Error creando orden desde cita:', error)
            modalActions.showAlert({
                title: 'Error al crear orden',
                message: parseAxiosError(error),
                type: 'error',
            })
            return null
        }
    }

    // const modal = useModal()
    const botonIngresar: newActionCrud<TData> = {
        component: row => (
            <div className='flex text-sm justify-center items-center gap-2 bg-success-auto px-3 py-2 rounded'>
                <FaSignInAlt />
                Ingreso
            </div>
        ),

        onAction: row => {
            console.log('Ingresar mantenimiento para la orden', row)
            crearOrdenParaIngresar(row.id).then(orden => {
                console.warn('Abrir modal de ingreso para la orden', orden)
                modal.openModal({
                    component: MantenimientoIngreso,
                    props: { N_ORDEN: row.id || 0, orden: orden },
                })
            })
        },
    }

    return (
        <>
            <CrudCrudo<TData, TForm>
                title={title}
                columns={columns}
                fetchData={fetchData}
                FiltersComponent={CitasFilters}
                pageSize={pageSize}
                searchPlaceholder={searchPlaceholder}
                autoLoadOptions={{ autoLoad, dependencies: [...dependencies, reloadKey] }}
                onCrudActions={onCrudActions}
                newActionsCrud={[botonIngresar]}
            ></CrudCrudo>
        </>
    )
}
