import React from 'react'
import { useModalData } from './useModalData'

// Definir los tipos que necesitas
interface WithModalDataProps {
    modalData: any // O el tipo específico de tus datos
    updateModalData: (data: any) => void // O el tipo específico de tu función
}

// // Suponiendo que tienes este hook definido en algún lugar
// declare function useModalData(): {
//     data: any
//     updateData: (data: any) => void
// }

export function withModalData<P extends object>(
    BaseComponent: React.ComponentType<P & WithModalDataProps>
): React.ComponentType<P> {
    const EnhancedComponent: React.FC<P> = (props: P) => {
        const { data, updateData } = useModalData()

        return React.createElement(BaseComponent, {
            ...props,
            modalData: data,
            updateModalData: updateData,
        })
    }

    EnhancedComponent.displayName = `withModalData(${
        BaseComponent.displayName || BaseComponent.name || 'Component'
    })`

    return EnhancedComponent
}
