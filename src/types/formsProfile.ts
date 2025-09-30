//

import { PerfilEmpresaData, PerfilPersonaNaturalData } from '../validation/perfil.schema'

export interface FormProfileProps {
    estaEditando: boolean
    changeEstaEditando: (estaEditando: boolean) => void
    onDatosGuardados: () => void
    changeDirty: (isDirty: boolean) => void
    // Callbacks opcionales para controlar el estado de envío desde el contenedor
    onSubmitStart?: () => void
    onSubmitError?: (mensaje?: string) => void
    // Callbacks para controlar el loading inicial de datos desde el contenedor
    onLoadStart?: () => void
    onLoadEnd?: () => void
    // data?: PerfilEmpresaData | PerfilPersonaNaturalData | null
    clienteId?: number
    esNuevo?: boolean
}
