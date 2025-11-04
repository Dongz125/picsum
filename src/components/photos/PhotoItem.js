import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const PhotoItem = ({ photo }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/photos/${photo.id}`)
    }

    return (
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card
                onClick={handleClick}
                className="text-decoration-none text-dark h-100 photo-item-card"
                style={{ cursor: 'pointer' }}
            >
                <Card.Img variant="top" src={photo.download_url} />
                <Card.Body>
                    <Card.Title className="h6">{photo.author}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default PhotoItem
