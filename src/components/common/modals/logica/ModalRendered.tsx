import React from 'react'
import { useModal } from '../../../../hooks/useModal'
// import { Z_INDEX_BASE } from '../../../../constants/modal'
import BaseModal from '../BaseModal'

const Z_INDEX_BASE = 100
export const ModalRenderer: React.FC = () => {
    const { modals, closeModal } = useModal()

    return (
        <>
            {modals.map((modal, index) => {
                const Component = modal.component || BaseModal
                // console.warn('Rendering modal:', modal.id, modal)
                return (
                    <div key={modal.id} style={{ zIndex: Z_INDEX_BASE + index }}>
                        <Component
                            isOpen={true}
                            onClose={() => closeModal(modal.id)}
                            children
                            {...modal.props}
                        />
                    </div>
                )
            })}
            {/* {getModals()} */}
        </>
    )
}
