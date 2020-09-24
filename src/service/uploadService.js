import axios from 'axios'

export function uploadPhotos(data) {
    axios.post('http://localhost:3001/upload/uploadPhotos', data, {

        })
        .then(response => console.log(response.statusText))
}