import React, { useState, useEffect } from 'react'
import { Container, Row, Alert } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'

import photoService from '../services/photoService'
import PhotoItem from '../components/photos/PhotoItem'
import LoadingSpinner from '../components/common/LoadingSpinner'

const PhotoListPage = () => {
    const [photos, setPhotos] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [error, setError] = useState(null)

    const fetchMoreData = async () => {
        try {
            // Gọi API qua service
            const data = await photoService.getPhotoList(page)

            if (!data || data.length === 0) {
                setHasMore(false)
                return
            }

            // Gộp thêm ảnh mới
            setPhotos((prev) => [...prev, ...data])

            // Tăng số trang
            setPage((prev) => prev + 1)
        } catch (err) {
            console.error('Fetch photo list failed:', err)
            setError('Không thể tải ảnh. Vui lòng thử lại sau.')
        }
    }

    // Lần đầu tiên load
    useEffect(() => {
        fetchMoreData()
    }, [])

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Thư viện ảnh Picsum</h1>

            {error && <Alert variant="danger">{error}</Alert>}
            <InfiniteScroll
                dataLength={photos.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<LoadingSpinner />}
                endMessage={
                    <p style={{ textAlign: 'center' }}>Bạn đã xem hết ảnh!</p>
                }
                scrollThreshold={0.9}
                style={{ overflow: 'visible' }} // Ngăn tạo thanh cuộn riêng
            >
                <Row>
                    {photos.map((photo) => (
                        <PhotoItem key={`${photo.id}`} photo={photo} />
                    ))}
                </Row>
            </InfiniteScroll>
        </Container>
    )
}

export default PhotoListPage
