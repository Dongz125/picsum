import axiosClient from './axiosClient'

const photoService = {
    getPhotoList: async (page = 1, limit = 30) => {
        try {
            const response = await axiosClient.get(
                `/v2/list?page=${page}&limit=${limit}`,
            )
            return response.data
        } catch (error) {
            console.error('Error fetching photo list:', error)
            throw error
        }
    },

    getPhotoDetail: async (id) => {
        try {
            const response = await axiosClient.get(`/id/${id}/info`)
            return response.data
        } catch (error) {
            console.error(`Error fetching photo detail with id=${id}:`, error)
            throw error
        }
    },
}

export default photoService
