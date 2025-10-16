import { FieldValues, UseFormReturn } from 'react-hook-form'
import { ColumnDef } from '../../CrudTable'
import { CrudContainerProps, crudQueries, formModalCrudProps } from '../../CrudContainer'
import CrudCrudo, { autoLoadOptions, newActionCrud, onCrudActionsProps } from '../../CrudCrudo'
import { ComponentType, useEffect, useState } from 'react'
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
import { CalendarioModal } from '../../../common/modals/Calendario'
import { convertirDateParaInput } from '../../../../adapters/fecha'
import { FilterParamOption } from '../../helper/fetchWithFilters'

type ModeActionType = 'create' | 'edit' | 'view' | 'delete'

interface CrudCitasContainerProps<TData, TForm extends FieldValues, TFilters> {
    formModalProp: formModalCrudProps
    form: UseFormReturn<TForm>

    title?: string

    columns: ColumnDef<TData>[]
    defaultValues: TForm

    crudQueries: crudQueries<TData, TForm, TFilters>

    autoLoadOptions?: autoLoadOptions

    isModalGrande?: boolean
    searchPlaceholder?: string
    pageSize?: number
    FilterComponent: ComponentType<{
        onChangeFilters: (filters: TFilters) => void
    }>
}

export default function CrudCitasContainer<
    TData extends Record<string, any>,
    TForm extends FieldValues,
    TFilters
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
    pageSize = 5,
    FilterComponent,
}: CrudCitasContainerProps<TData, TForm, TFilters>) {
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

    // useEffect(() => {
    //     console.log('Dependencies changed, reloading data', { actualRow, mode })
    //     console.log(form.getValues())
    //     // setViewing(actualRow)
    //     if (!mode) return
    //     abrirModalDatos(actualRow, mode)
    // }, [actualRow, mode])

    const closeAndReset = () => {
        console.warn('Closing modal and resetting form')
        modalActions.closeAllModals()
        setMode(null)
        setActualRow(null)
        setError('')
        reset(defaultValues)
    }

    const onCrudActions: onCrudActionsProps<TData, TForm> = {
        onCreate: () => {
            console.log('Creating new entry, resetting form')
            // setCamposReadOnly(false)
            // setActualRow(null)
            // console.log('Creating new entry')
            // setMode('create')
            // setError('')
            abrirOnCreate()
            // reset(defaultValues)
        },
        onEdit: (row: TForm) => {
            // setCamposReadOnly(false)
            // setActualRow(row)
            // abrirFormularioModal('Editar Cita', false, 'edit')
            // setError('')
            // reset(row)
            // console.log('Editing row:', row)
            abrirOnEdit(row)
        },
        onView: (row: TForm) => {
            console.log('Original row for viewing:', row)
            // row.fechaHoraInicio = formatDate(row.fecha)
            // console.log('Viewing row:', row)
            // setCamposReadOnly(true)
            // setActualRow(row)
            // setMode('view')
            // reset(row)
            // abrirFormularioModal('Ver Cita', true, 'view')
            abrirOnView(row)
        },
        onDelete: (row: TData) => {
            // modalActions.showConfirm({
            //     title: 'Confirmar Eliminación',
            //     message: `¿Estás seguro de que quieres eliminar? Esta acción no se puede deshacer.`,
            //     confirmText: 'Eliminar',
            //     cancelText: 'Cancelar',
            //     onConfirm: async () => {
            //         deleteAccion(row.id, 'delete')
            //     },
            //     type: 'warning',
            // })
            // setError('')
            abrirOnDelete(row)
        },
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
            onSubmit: handleSubmit(async (values: TForm) => {
                //     console.log('Submitted values:', values)
                //     return submitingRequest(values, submitRequest)
                // })
                console.warn('Modal opened with ID:', id)
                setIdFormModal(id)
            }),
            submitText,
            cancelText,
            onCancel: closeAndReset,
            size: isModalGrande ? 'xl' : 'md',
            props: props,
        })
    }

    function abrirOnCreate() {
        abrirCalentario((date: Date) => {
            form.reset(defaultValues)
            const dateParseada = convertirDateParaInput(date)
            form.setValue('fechaHoraInicio' as any, dateParseada as any)
            abrirFormularioModal({
                title: 'Crear Cita',
                submitFunction: submitCreate,
                readOnly: false,
            })
        })
    }
    function abrirOnEdit(row: TForm) {
        console.log('Opening edit modal with row:', row, 'cb:', submitEdit)
        form.reset(row)
        abrirFormularioModal({
            title: 'Editar Cita',
            submitFunction: submitEdit,
            readOnly: false,
        })
    }

    function abrirOnView(row: TForm) {
        form.reset(row)
        abrirFormularioModal({
            title: 'Ver Cita',
            readOnly: true,
        })
    }
    function abrirOnDelete(row: TData) {
        modalActions.showConfirm({
            title: 'Confirmar Eliminación',
            message: `¿Estás seguro de que quieres eliminar? Esta acción no se puede deshacer.`,
            confirmText: 'Eliminar',
            cancelText: 'Cancelar',
            onConfirm: async () => {
                submitDelete(row)
            },
            type: 'warning',
        })
        setError('')
    }

    function abrirCalentario(onConfirm: (date: Date) => void) {
        const id = modal.openModal({
            component: CalendarioModal,
            props: {
                onConfirm: onConfirm,
                // onConfirm: (date: Date) => {
                //     form.reset(defaultValues)
                //     const dateParseada = convertirDateParaInput(date)
                //     form.setValue('fechaHoraInicio' as any, dateParseada as any)
                //     abrirFormularioModal('Crear Cita', false)
                // },
            },
        })
        setIdFormModal(id)
    }
    function abrirFormularioModal({
        title,
        submitFunction,
        readOnly,
    }: {
        title: string
        submitFunction?: (row: TForm) => Promise<void>
        readOnly: boolean
    }) {
        console.log(
            'abriendo formulario modal con Title:',
            title,
            'submitFunction:',
            submitFunction,
            'readOnly:',
            readOnly
        )

        const id = modalActions.showForm({
            title: title,
            component: FormComponent,
            onSubmit:
                submitFunction &&
                handleSubmit(async (values: TForm) => {
                    console.log('Submitted values:', values)
                    submitFunction(values)
                }),
            submitText: '',
            cancelText: 'Cerrar',
            onCancel: closeAndReset,
            size: isModalGrande ? 'xl' : 'md',
            props: {
                ...formModalProp.props,
                readOnly: readOnly,
                fecha: actualRow?.fechaHoraInicio,
                noMostrarNumeroCita: title == 'Crear Cita' ? true : false,
            },
            showButtons: !readOnly,
        })
    }

    // const abrirModalDatos = (actualRow: TForm | null = null, mode: ModeActionType) => {
    //     console.log('Opening data modal', { actualRow, mode })

    //     let id

    //     if (mode !== 'view') {
    //         return
    //     }
    //     abrirFormularioModal()
    // }

    // const abrirFormularioModal = (
    //     title: string,
    //     readOnly: boolean,
    //     submitFunction: () => Promise<void> | void
    // ) => {
    //     const id = modalActions.showForm({
    //         title: title,
    //         component: FormComponent,
    //         onSubmit: handleSubmit(async (values: TForm) => {
    //             console.log('Submitted values:', values)
    //             submitFunction()
    //         }),
    //         submitText: '',
    //         cancelText: 'Cerrar',
    //         onCancel: closeAndReset,
    //         size: isModalGrande ? 'xl' : 'md',
    //         props: {
    //             ...formModalProp.props,
    //             readOnly: readOnly,
    //             fecha: actualRow?.fechaHoraInicio,
    //         },
    //     })
    // }

    const modalsRequesting = async <Parametro, Retorno>(
        row: Parametro,
        cb: (row: Parametro, mode: string) => Promise<Retorno>,
        mode: string
    ) => {
        const id = modalActions.showLoading('Guardando...')
        setError('')
        try {
            console.log('Submitting request with data:', row, 'mode:', mode, 'cb:', cb)
            const res = await cb(row, mode)

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
    // const deleteRequest = async (row: TData) => {
    //     if (!row.id) throw new Error('No se puede eliminar una dirección sin ID')
    //     const res = await deleteQuery(row.id)
    //     console.log('Eliminado:', res)
    //     return res
    // }
    // const submitRequest = async (row: TForm, mode: string) => {
    //     let res
    //     if (mode === 'edit') {
    //         res = await editQuery(row)
    //     } else if (mode === 'create') {
    //         res = await createQuery(row)
    //     } else {
    //         throw new Error(`Modo inválido para enviar el formulario ${mode}`)
    //     }
    //     console.log('Response from submit:', res)
    //     return res
    // }
    const submitCreate = async (row: TForm) => {
        return modalsRequesting(row, createQuery, 'create')
    }
    const submitEdit = async (row: TForm) => {
        console.warn('Submitting edit with data:', row, 'cb:', editQuery)
        return modalsRequesting(row, editQuery, 'edit')
    }
    const submitDelete = async (row: TData) => {
        return modalsRequesting(row, deleteQuery, 'delete')
    }

    // const deleteAccion = async (row: TData) => {
    //     return submitingRequest(row, deleteRequest)
    //     return handleApiSubmit(row, (r: TData) => deleteRequest(r), 'delete')
    // }

    // const onSubmit = handleSubmit(async (values: TForm) => {
    //     console.log('Submitted values:', values)
    //     return submitingRequest(values, submitRequest)
    // })
    // const formatDate = (d: Date) => {
    //     if (!d) throw new Error('Fecha no válida')
    //     const pad = (n: number) => n.toString().padStart(2, '0')
    //     const year = d.getFullYear()
    //     const month = pad(d.getMonth() + 1)
    //     const day = pad(d.getDate())
    //     const hours = pad(d.getHours())
    //     const minutes = pad(d.getMinutes())
    //     console.log('Fecha formateada:', `${year}-${month}-${day}T${hours}:${minutes}`)
    //     return `${year}-${month}-${day}T${hours}:${minutes}`
    // }

    // async function getOrden(citaId: number) {
    //     const idLoading = modalActions.showLoading('Cargando Orden..')

    //     try {
    //         const res = await obtenerOrden(citaId)
    //         modalActions.closeModal(idLoading)
    //         return res
    //     } catch (error) {
    //         modalActions.closeModal(idLoading)
    //         console.error('Error obteniendo orden desde cita:', error)
    //         modalActions.showAlert({
    //             title: 'Error al obtener orden',
    //             message: parseAxiosError(error),
    //             type: 'error',
    //         })
    //         return null
    //     }
    // }

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
        component: (row: TData) => (
            <div
                className={`flex text-sm justify-center items-center gap-2  px-3 py-2 rounded ${
                    row.estado == 'Programada' ? 'bg-success-auto' : 'bg-unavailable-auto '
                }`}
            >
                <FaSignInAlt />
                Ingreso
            </div>
        ),

        onAction: row => {
            console.log('row:', row, ' estado:', row.estado)
            if (row.estado != 'Programada') {
                modalActions.showAlert({
                    title: 'Acción no permitida',
                    message:
                        'Solo se puede ingresar mantenimiento para citas en estado "Programada".',
                    type: 'warning',
                })
                return
            }
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
            <CrudCrudo<TData, TForm, TFilters>
                title={title}
                columns={columns}
                fetchData={fetchData}
                FiltersComponent={FilterComponent}
                pageSize={pageSize}
                searchPlaceholder={searchPlaceholder}
                autoLoadOptions={{ autoLoad, dependencies: [...dependencies, reloadKey] }}
                onCrudActions={onCrudActions}
                newActionsCrud={[botonIngresar]}
            ></CrudCrudo>
        </>
    )
}
