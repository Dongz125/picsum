import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'

// Import các trang (Pages) của chúng ta
import PhotoListPage from './pages/PhotoListPage'
import PhotoDetailPage from './pages/PhotoDetailPage'

function App() {
    return (
        <Router>
            <Routes>
                {/* Khi người dùng vào trang chủ "/", tự động chuyển hướng họ đến "/photos" */}
                <Route path="/" element={<Navigate replace to="/photos" />} />

                {/* Trang danh sách ảnh */}
                <Route path="/photos" element={<PhotoListPage />} />

                {/* Trang chi tiết ảnh, :id là một tham số động */}
                <Route path="/photos/:id" element={<PhotoDetailPage />} />
            </Routes>
        </Router>
    )
}

export default App
