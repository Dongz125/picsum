import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingSpinner = () => {
    return (
        <div
            className="loading-spinner"
            style={{ display: 'flex', justifyContent: 'center' }}
        >
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default LoadingSpinner
