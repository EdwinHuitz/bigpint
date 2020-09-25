import React, { useState, useEffect } from 'react'
import * as photoService from '../../service/photoService'
import * as authService from '../../service/authService'
import * as uploadService from '../../service/uploadService'
import './AddPhotos.css'



export default function AddPhotos({ user, setUser }) {
    const [gPhotos, setGPhotos] = useState([])
    const [upPhotos, setUpPhotos] = useState(null)
    const [loaded, setLoaded] = useState(null)
    
    useEffect(() => {
    }, [user])

    async function setPhotosFromGoogle() {
        const response = await photoService.getGPhotos()
        const retPhotos = response[0] ? response : []
        setGPhotos(retPhotos)
    }
    // async function setUserPhotos() {
    //     const profilePhotos = await photoService.getUserPhotos()
    //     setProfilePhotos(profilePhotos)
    // }
    async function addToProfilePhotos(photo) {
        await photoService.addPhotoToUser(photo, user._id)
        const updatedUser = await authService.getUser(user._id)
        setUser(updatedUser)
    }

    async function removeFromProfilePhotos(photoId) {
        await photoService.removePhotoFromUser(photoId, user._id)
        const updatedUser = await authService.getUser(user._id)
        setUser(updatedUser)
    }

    async function sendCreateAlbum() {
        await photoService.createGAlbum(user)
        const updatedUser = await authService.getUser(user._id)
        setUser(updatedUser)
    }

    function sendBatchPhotos() {
        const photoIds = user.photos.map(photo => photo.gId)
        photoService.addPhotosToAlbum(user.token, user.albums[0].gId, photoIds)
    }

    function handlePhotoChange(e) {
        console.log(e.target.files)
        setUpPhotos(e.target.files)
        // setLoaded(0)
    }

    async function handleUploadClick() {
        const data = new FormData()
        for (var x = 0; x < upPhotos.length; x++) data.append('file', upPhotos[x])
        await uploadService.uploadPhotos(data, user._id)
        const updatedUser = await authService.getUser(user._id)
        setUser(updatedUser)
    }
        // id productUrl baseUrl mimeType mediaMetadata filename
    return (
        <div className="add-photos-pg">
            {user.photos && user.photos.length > 0 &&
            <> 
                <div className="user-photos">
                    {user.photos.map((photo, i) => <div className="img-wrapper" key={i} onClick={() => removeFromProfilePhotos(photo._id)}><img src={photo.urlTo} alt="" /></div>)}
                </div>
                {/* <img src={user.photos[0].url} alt=""/> */}
                {/* <div onClick={sendBatchPhotos}>Send To Album</div> */}
                </>
            }
            {gPhotos.length ?
            <>
                <div className="g-photos">
                    {gPhotos.map((photo, i) => <div className="img-wrapper" key={i} onClick={() => addToProfilePhotos(photo)}><img src={photo.baseUrl} alt="" /></div>)}
                </div>
                {/* <div onClick={sendCreateAlbum}>Add Shared Album</div> */}
                </>
                :
                <>
                    <a href="http://localhost:3001/auth/google">Sign in to google</a>
                    <button onClick={setPhotosFromGoogle}>search gPhotos</button>
                </>
            }
            <div>
                <h3>Upload Photos</h3>
                <input type="file" name="file" multiple onChange={handlePhotoChange} />
                <button onClick={handleUploadClick}>Upload</button>
            </div>
        </div>
    )
}