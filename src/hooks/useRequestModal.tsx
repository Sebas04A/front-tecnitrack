import { useState } from 'react'
// import { SubmitStatus } from '../components/common/SubmitStatusModal'

export default function useRequestModal() {
    const [submitStatus, setSubmitStatus] = useState<any | null>(null)

    const [errorMessage, setErrorMessage] = useState('')

    function startRequest() {
        setSubmitStatus('loading')
    }
    function requestSuccess() {
        setSubmitStatus('success')
    }
    function requestError(message?: string) {
        setErrorMessage(message || 'Error al enviar los datos')
        setSubmitStatus('error')
    }
    function closeModal() {
        setSubmitStatus(null)
    }

    return {
        startRequest,
        requestSuccess,
        requestError,
        submitStatus,
        errorMessage,
        closeModal,
    }
}
