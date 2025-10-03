import React, { ComponentType, useCallback, useEffect, useMemo, useState } from 'react'
import CrudToolbar from './CrudToolbar'
import CrudTable, { ColumnDef } from './CrudTable'
import CrudPagination from './CrudPagination'
import useDebouncedCallback from '../../hooks/useDebouncedCallback'
import { Modal } from '../common/Modal'
import { useModal } from '../../hooks/useModal'
import { parseAxiosError } from '../../utils/parseError'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { ObjectApiResponse } from '../../api'
import GenericForm from '../form/GenericForm'
import { useModalActions } from '../../hooks/useModalActions'
import CrudCrudo, { autoLoadOptions, onCrudActionsProps } from './CrudCrudo'
import { data, use } from 'framer-motion/client'
import { toFormData } from 'axios'

export interface crudQueries<TData, TForm = any> {
    fetchData: (params: { page: number; pageSize: number; search: string }) => Promise<{
        items: TData[]
        total: number
    }>
    createQuery: (data: TForm) => Promise<any>
    editQuery: (data: TForm) => Promise<any>
    deleteQuery: (data: TData) => Promise<any>
}

export interface formModalCrudProps {
    form: ComponentType<any>
    props?: Record<string, any>
    propsNoCambiantes?: Record<string, any>
}

export interface CrudContainerProps<TData extends Record<string, any>, TForm extends FieldValues> {
    formModalProp: formModalCrudProps
    form: UseFormReturn<TForm>

    title?: string

    columns: ColumnDef<TData>[]
    defaultValues: TForm
    dataToForm?: (data: TData) => TForm

    crudQueries: crudQueries<TData, TForm>

    autoLoadOptions?: autoLoadOptions

    isModalGrande?: boolean
    searchPlaceholder?: string
    pageSize?: number
}

export function CrudContainer<TData extends Record<string, any>, TForm extends FieldValues>({
    formModalProp,
    form,
    columns,
    defaultValues,
    dataToForm = (data: TData) => data as unknown as TForm,
    crudQueries,

    title,
    autoLoadOptions = { autoLoad: true, dependencies: [] },
    isModalGrande = false,
    searchPlaceholder,
    pageSize = 10,
}: CrudContainerProps<TData, TForm>) {
    console.warn('Renderizando CrudContainer')
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
        console.log('Dependencies changed, reloading data', { actualRow, mode })
        // setViewing(actualRow)
        if (!mode) return
        abrirModalDatos(mode)
    }, [actualRow, mode])
    useEffect(() => {
        console.warn('CONTROL')
    }, [])

    const formSinErrors = useMemo(() => {
        const { errors, ...rest } = formModalProp.props || {}
        return rest
    }, [formModalProp.props])
    const propsString = useMemo(() => JSON.stringify(formSinErrors), [formSinErrors])
    const errorsString = useMemo(() => {
        console.log('Calculando errorsString para dependencia')
        // 2. Extraemos los errores de las props de forma segura con optional chaining (?.)
        const errors = formModalProp.props?.errors

        // 3. Si no hay errores o no es un objeto, devolvemos un string vacío
        //    para tener una dependencia consistente.
        if (!errors || typeof errors !== 'object') {
            return '{}'
        }

        // 4. Transformamos el objeto complejo de errores en uno simple con solo los mensajes.
        const simplifiedMessages: { [key: string]: any } = {}
        for (const key in errors) {
            if (errors[key]?.message) {
                simplifiedMessages[key] = errors[key].message
            }
        }

        // 5. Devolvemos el string de los mensajes simplificados.
        //    Ej: '{"nombre":"El nombre es obligatorio","email":"Email inválido"}'
        console.log('Errores simplificados para dependencia:', simplifiedMessages)
        return JSON.stringify(simplifiedMessages)
    }, [formModalProp.props]) // La dependencia es el objeto de errores original
    console.log('propsString', propsString)
    console.log('errorsString', errorsString)
    useEffect(() => {
        console.warn('CAMBIANDO PROPS O ERRORES', { propsString, errorsString })
    }, [propsString, errorsString])
    useEffect(() => {
        console.warn('CAMBIANDO PROPS')
        // console.log('Nuevos props:', propsModal)
        // console.log('errors', form.formState.errors)

        const props = {
            ...formModalProp.props,
            ...formModalProp.propsNoCambiantes,
            control: form.control,
            register: form.register,
            errors: form.formState.errors,
            readOnly: camposReadOnly,
        }
        console.log('props', props)

        modal.updateModalProps(idFormModal, {
            props,
        })
    }, [propsString, camposReadOnly, errorsString])
    useEffect(() => {
        console.warn('CAMBIANDO FORMMODALPROP', formModalProp.props)
    }, [formModalProp.props])
    useEffect(() => {
        console.warn('CAMBIANDO CAMPOS READONLY', camposReadOnly)
    }, [camposReadOnly])
    useEffect(() => {
        console.warn('CAMBIANDO ERRORES', form.formState.errors)
    }, [form.formState.errors])

    const closeAndReset = () => {
        console.warn('Closing modal and resetting form')
        // modalActions.closeAllModals()
        modalActions.closeModal(idFormModal)
        setMode(null)
        setActualRow(null)
        setError('')
        reset(defaultValues)
    }

    const abrirModalDatos = (mode: 'create' | 'edit' | 'view' | null) => {
        const title = mode === 'edit' ? 'Editar' : mode === 'view' ? 'Ver ' : 'Crear Nuevo'
        const submitText = mode === 'edit' ? 'Guardar Cambios' : mode === 'view' ? '' : 'Crear'
        const cancelText = mode === 'view' ? '' : 'Cancelar'
        const props = {
            ...formModalProp.props,
            ...formModalProp.propsNoCambiantes,
            readOnly: camposReadOnly,
        }
        console.log('Opening modal con', { props })
        const id = modalActions.showForm({
            title,
            component: FormComponent,
            onSubmit: onSubmit,
            submitText,
            cancelText,
            showButtons: mode !== 'view',
            onCancel: closeAndReset,
            size: isModalGrande ? 'xl' : 'md',
            props,
        })

        console.warn('Modal opened with ID:', id)
        setIdFormModal(id)
    }

    const submitingRequest = async <Parametro, Retorno>(
        row: Parametro,
        cb: (row: Parametro) => Promise<Retorno>,
        messageConfirm: string = 'Los datos se han guardado correctamente.'
    ) => {
        console.log('Submitting request with data:', row)
        const id = modalActions.showLoading('Guardando...')
        setError('')
        try {
            const res = await cb(row)
            console.log('Response from submit:', res)

            modalActions.closeModal(id)
            closeAndReset()
            modalActions.showAlert({
                title: 'Éxito',
                message: messageConfirm,
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
    const deleteRequest = async (data: TData) => {
        console.log('Iniciando eliminación de:', data)
        if (!data) {
            throw new Error('No se puede eliminar un registro sin ID')
        }
        const res = await deleteQuery(data)
        console.log('Eliminado:', res)
        return res
    }
    const submitRequest = async (data: TForm) => {
        let res
        if (mode === 'edit') {
            res = await editQuery(data)
        } else if (mode === 'create') {
            res = await createQuery(data)
        } else {
            throw new Error(`Modo inválido para enviar el formulario ${mode}`)
        }
        console.log('Response from submit:', res)
        return res
    }

    const deleteAccion = async (data: TData) => {
        console.log('Iniciando eliminación de:', data)
        return submitingRequest(data, deleteRequest, 'El registro se ha eliminado correctamente.')
    }

    const onSubmit = handleSubmit(async (values: TForm) => {
        console.log('Submitted values:', values)
        console.log('Cerrando modal con ID:', idFormModal)
        modal.closeModal(idFormModal)
        return submitingRequest(values, submitRequest)
    })

    const onCrudActions: onCrudActionsProps<TData, TForm> = {
        onCreate: () => {
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
            setCamposReadOnly(true)
            setActualRow(row)
            setMode('view')
            reset(row)
        },
        onDelete: (row: TData) => {
            console.log('Deleting row:', row.id)
            modalActions.showConfirm({
                title: 'Confirmar Eliminación',
                message: `¿Estás seguro de que quieres eliminar? Esta acción no se puede deshacer.`,
                confirmText: 'Eliminar',
                cancelText: 'Cancelar',
                onConfirm: async () => {
                    deleteAccion(row)
                },
                type: 'warning',
            })
            setError('')
        },
    }

    return (
        <>
            <CrudCrudo<TData, TForm>
                title={title}
                columns={columns}
                fetchData={fetchData}
                pageSize={pageSize}
                searchPlaceholder={searchPlaceholder}
                autoLoadOptions={{ autoLoad, dependencies: [...dependencies, reloadKey] }}
                onCrudActions={onCrudActions}
                dataToForm={(data: TData) => dataToForm(data)}
            ></CrudCrudo>
        </>
    )
}

export default CrudContainer
