import { EstadoComponenteIngresoResponse } from '../../api'
import { ComponenteData } from '../../components/mantenimiento/Equipo/InformacionEquipo/ComponentesCrud'

export const parseComponentesTable = (
    data: EstadoComponenteIngresoResponse[]
): ComponenteData[] => {
    if (!data) return []
    return data.map(item => ({
        id: item.id || -1,
        componente: item.nombreComponente?.toString() || '',
        condicion: item.estadoComponente || '',
        severidad: item.severidadDaño || '',
        observaciones: item.descripcion || '',
        seguimiento: true, // Ajustar según la lógica real
    }))
}
