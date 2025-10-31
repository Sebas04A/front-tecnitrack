import { ComponentType, useEffect, useMemo, useState } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

import { parseAxiosError } from '../../utils/parseError'
import { useModal } from '../../hooks/useModal'
import { useModalActions } from '../../hooks/useModalActions'

import { FetcherFunctionWithParams } from './helper/fetchWithFilters'

import { autoLoadOptions, onCrudActionsProps } from './models/crud.types'
import CrudCrudo from './CrudCrudo'
import { ColumnDef } from './components/CrudTable'

export interface crudQueries<TData, TForm = any, TFilters = any> {
    fetchData: //  FetcherFunctionType<TData> |
    FetcherFunctionWithParams<TData, TFilters>
    createQuery?: (data: TForm) => Promise<any>
    editQuery?: (data: TForm) => Promise<any>
    deleteQuery?: (data: TData) => Promise<any>
}

export interface formModalCrudProps {
    form: ComponentType<any>
    props?: Record<string, any>
    propsNoCambiantes?: Record<string, any>
}

export interface CrudContainerProps<
    TData extends Record<string, any>,
    TForm extends FieldValues,
    TFilters
> {
    formModalProp: formModalCrudProps
    form: UseFormReturn<TForm>

    title?: string
    mostrar_titulo?: boolean

    columns: ColumnDef<TData>[]
    defaultValues: TForm
    dataToForm?: (data: TData) => TForm

    crudQueries: crudQueries<TData, TForm, TFilters>

    autoLoadOptions?: autoLoadOptions

    isModalGrande?: boolean
    searchPlaceholder?: string
    pageSize?: number
    FiltersComponent?: ComponentType<any>
}

export function CrudContainer<
    TData extends Record<string, any>,
    TForm extends FieldValues,
    TFilters = any
>({
    formModalProp,
    form,
    columns,
    defaultValues,
    dataToForm = (data: TData) => data as unknown as TForm,
    crudQueries,
    FiltersComponent,

    title,
    mostrar_titulo = true,
    autoLoadOptions = { autoLoad: true, dependencies: [] },
    isModalGrande = false,
    searchPlaceholder,
    pageSize = 10,
}: CrudContainerProps<TData, TForm, TFilters>) {
    console.log('Renderizando CrudContainer')

    const { fetchData, createQuery, editQuery, deleteQuery } = crudQueries
    const { autoLoad = true, dependencies = [] } = autoLoadOptions
    const FormComponent = formModalProp.form
    const { handleSubmit, reset, trigger, register } = form

    const [reloadKey, setReloadKey] = useState(0)

    const modal = useModal()
    const modalActions = useModalActions()
    const [idFormModal, setIdFormModal] = useState<string>('')

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

    useEffect(() => {
        const props = {
            ...formModalProp.props,
            ...formModalProp.propsNoCambiantes,
            control: form.control,
            register: form.register,
            errors: form.formState.errors,
        }

        console.log('CAMBIANDO PROPS', { idFormModal }, props)

        modal.updateModalProps(idFormModal, {
            props,
        })
    }, [propsString, errorsString])

    // useEffect(() => {
    //     console.warn('CAMBIANDO FORMMODALPROP', formModalProp.props)
    // }, [formModalProp.props])
    // useEffect(() => {
    //     console.warn('CAMBIANDO CAMPOS READONLY', camposReadOnly)
    // }, [camposReadOnly])
    // useEffect(() => {
    //     console.warn('CAMBIANDO ERRORES', form.formState.errors)
    // }, [form.formState.errors])

    const closeAndReset = () => {
        console.warn('Closing modal and resetting form')
        // modalActions.closeAllModals()
        modalActions.closeModal(idFormModal)
        // setMode(null)
        // setActualRow(null)
        // setError('')
        reset(defaultValues)
    }

    const abrirModalDatos = async (mode: 'create' | 'edit' | 'view') => {
        let title_modal
        let submitText
        let cancelText

        if (mode == 'view') {
            title_modal = 'Ver ' + (title ?? 'Registro')
            submitText = ''
            cancelText = ''
        } else if (mode == 'edit') {
            title_modal = 'Editar '
            submitText = 'Guardar Cambios'
            cancelText = 'Cancelar'
        } else {
            title_modal = 'Crear '
            submitText = 'Crear'
            cancelText = 'Cancelar'
        }
        title_modal = title_modal + (title ?? 'Nuevo')

        const readOnly = mode === 'view'

        const props = {
            ...formModalProp.props,
            ...formModalProp.propsNoCambiantes,
            control: form.control,
            readOnly: readOnly,
        }
        console.log('Opening modal con', { props, showButtons: mode !== 'view' })

        let resolverPromesaDeEnvio: (valores: TForm) => void
        const promesaDeEnvio = new Promise<TForm>(resolve => {
            resolverPromesaDeEnvio = resolve
        })
        const cuandoElFormularioSeEnvie = (valores: TForm): void => {
            //  El formulario se envió. Abriendo la barrera de la promesa..
            resolverPromesaDeEnvio(valores)
        }
        console.log('Valores del formulario al abrir modal:')
        const id = modalActions.showForm({
            title: title_modal,
            component: FormComponent,
            onSubmit: handleSubmit(cuandoElFormularioSeEnvie),
            submitText,
            cancelText,
            showButtons: mode !== 'view',
            onCancel: closeAndReset,
            size: isModalGrande ? 'xl' : 'md',
            props,
        })
        setIdFormModal(id)

        const valoresRecibidos = await promesaDeEnvio
        await onSubmit(valoresRecibidos, mode)
        modalActions.closeModal(id)
    }

    const deleteRequest = async (data: TData) => {
        console.log('Iniciando eliminación de:', data)
        if (!data) {
            throw new Error('No se puede eliminar un registro sin ID')
        }
        if (!deleteQuery) throw new Error('No se proporcionó deleteQuery para eliminación')
        const res = await deleteQuery(data)
        console.log('Eliminado:', res)
        return res
    }

    const deleteAccion = async (data: TData) => {
        console.log('Iniciando eliminación de:', data)
        return submitingRequest(data, deleteRequest, 'El registro se ha eliminado correctamente.')
    }

    const onSubmit = async (values: TForm, mode: string) => {
        console.log('Submitted values:', values)
        // console.log('Cerrando modal en CRUD con ID:', idFormModal)
        modal.closeModal(idFormModal)
        return submitingRequest(values, submitRequest, mode)
    }
    const submitingRequest = async <Parametro, Retorno>(
        row: Parametro,
        cb: (row: Parametro, mode: string) => Promise<Retorno>,
        mode: string,
        messageConfirm: string = 'Los datos se han guardado correctamente.'
    ) => {
        console.log('Submitting request with data:', row)
        const id = modalActions.showLoading('Guardando...')
        // setError('')
        try {
            const res = await cb(row, mode)
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
            // setError(parseAxiosError(error))
            modalActions.closeModal(id)

            modalActions.showAlert({
                title: 'Error',
                message: parseAxiosError(error),
                type: 'error',
            })
        }
    }

    const submitRequest = async (data: TForm, mode: string) => {
        let res
        if (mode === 'edit') {
            if (!editQuery) throw new Error('No se proporcionó editQuery para el modo edición')
            res = await editQuery(data)
        } else if (mode === 'create') {
            if (!createQuery) throw new Error('No se proporcionó createQuery para el modo creación')
            res = await createQuery(data)
        } else {
            throw new Error(`Modo inválido para enviar el formulario ${mode}`)
        }
        console.log('Response from submit:', res)
        return res
    }

    const onCrudActions: onCrudActionsProps<TData, TForm> = {
        onCreate: createQuery
            ? () => {
                  reset(defaultValues)
                  abrirModalDatos('create')
              }
            : undefined,
        onEdit: editQuery
            ? (row: TForm) => {
                  reset(row)
                  abrirModalDatos('edit')
              }
            : undefined,
        onView: (row: TForm) => {
            reset(row)
            abrirModalDatos('view')
        },
        onDelete: deleteQuery
            ? (row: TData) => {
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
                  //   setError('')
              }
            : undefined,
    }

    return (
        <>
            <CrudCrudo<TData, TForm, TFilters>
                title={title}
                mostrar_titulo={mostrar_titulo}
                columns={columns}
                fetchData={fetchData}
                pageSize={pageSize}
                searchPlaceholder={searchPlaceholder}
                autoLoadOptions={{ autoLoad, dependencies: [...dependencies, reloadKey] }}
                onCrudActions={onCrudActions}
                dataToForm={(data: TData) => dataToForm(data)}
                FiltersComponent={FiltersComponent}
            ></CrudCrudo>
        </>
    )
}

export default CrudContainer
