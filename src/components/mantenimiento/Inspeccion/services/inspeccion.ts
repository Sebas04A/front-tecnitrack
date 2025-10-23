import { OrdenesService } from '../../../../api'

export const getInspector = async (id: number) => {
    const res = await OrdenesService.getApiOrdenesObtenerInspectorOrden({ id })
    console.log('Inspector encontrado:', res)
    return res.data
}
