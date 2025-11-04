import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
    Container,
    Row,
    Col,
    Image,
    Button,
    Alert,
    Card,
} from 'react-bootstrap'
import LoadingSpinner from '../components/common/LoadingSpinner'
import photoService from '../services/photoService'
import './PhotoDetailPage.css'

const PhotoDetailPage = () => {
    const { id } = useParams()
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPhotoDetail = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await photoService.getPhotoDetail(id)
                setPhoto(data)
            } catch (err) {
                console.error('Error fetching photo detail:', err)
                setError('Không thể tải thông tin ảnh. Vui lòng thử lại sau.')
            } finally {
                setLoading(false)
            }
        }

        fetchPhotoDetail()
    }, [id])

    if (loading) return <LoadingSpinner />

    if (error) {
        return (
            <Container className="photo-page pastel-bg text-center py-5">
                <Alert variant="danger" className="shadow-sm w-75 mx-auto">
                    {error}
                </Alert>
                <Button as={Link} to="/photos" className="return-btn">
                    Quay về danh sách
                </Button>
            </Container>
        )
    }

    if (!photo) {
        return (
            <Container className="photo-page pastel-bg text-center py-5">
                <Alert variant="warning" className="shadow-sm w-75 mx-auto">
                    Không tìm thấy ảnh!
                </Alert>
                <Button as={Link} to="/photos" className="return-btn">
                    Quay về danh sách
                </Button>
            </Container>
        )
    }

    return (
        <Container className="photo-page pastel-bg py-5">
            <Row className="align-items-center justify-content-center">
                <Col lg={7} md={12} className="mb-4 mb-lg-0 text-center">
                    <div className="photo-frame shadow-lg">
                        <Image
                            src={photo.download_url}
                            alt={photo.author}
                            fluid
                            rounded
                            className="photo-img"
                        />
                    </div>
                </Col>

                <Col lg={5} md={12}>
                    <Card className="photo-info-card shadow-sm border-0 p-4">
                        <h2 className="mb-3 fw-bold text-primary pastel-title">
                            {photo.author}
                        </h2>
                        <hr />
                        <p className="text-muted mb-2">
                            <strong>Kích thước:</strong> {photo.width} ×{' '}
                            {photo.height} px
                        </p>
                        <p className="text-muted mb-4">
                            <strong>Liên kết gốc:</strong>{' '}
                            <a
                                href={photo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="photo-link"
                            >
                                {photo.url}
                            </a>
                        </p>

                        <Button
                            as={Link}
                            to="/photos"
                            className="return-btn w-100 fw-semibold"
                        >
                            Quay về danh sách
                        </Button>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default PhotoDetailPage
