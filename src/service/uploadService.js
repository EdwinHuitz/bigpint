import axios from 'axios'

export function uploadPhotos(data, userId) {
    axios.post(`http://localhost:3001/upload/uploadPhotos/${userId}`, data)
        .then(res => res.data)
        .then(({ user }) => user)
}