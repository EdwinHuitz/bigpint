import React, { useState, useEffect } from 'react'
import * as photoService from '../../service/photoService'
import * as authService from '../../service/authService'
import * as uploadService from '../../service/uploadService'
import './AddPhotos.css'



export default function AddPhotos({ user, setUser, design }) {
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

    function handleUploadClick() {
        const data = new FormData()
        for (var x = 0; x < upPhotos.length; x++) data.append('upPhoto', upPhotos[x])
        uploadService.uploadPhotos(data)
    }
        // id productUrl baseUrl mimeType mediaMetadata filename
    return (
        <div className="add-photos-pg">
            {user.photos && user.photos.length > 0 &&
            <> 
                <button onClick={sendBatchPhotos}>Add to Profile</button>
                <div className="user-photos">
                    {user.photos.map((photo, i) => <div className="img-wrapper" key={i} onClick={() => removeFromProfilePhotos(photo._id)}><img src={photo.baseUrl} alt="" /></div>)}
                </div>
                </>
            }
            {gPhotos.length?
            <>
                <div className="g-photos">
                    {gPhotos.map((photo, i) => <div className="img-wrapper" key={i} onClick={() => addToProfilePhotos(photo)}><img src={photo.baseUrl} alt="" /></div>)}
                </div>
                <button onClick={sendCreateAlbum}>Select Your Albums</button>
                </>
                :
                <>
                 <div>
                    <a href="http://localhost:3001/auth/google"  className={(design===1?'':'e')}>Sign in to google</a>
                    <button onClick={setPhotosFromGoogle}>search gPhotos</button>
                 </div>
                </>
            }
            <div className={(design===1?'a':'e')}>
                <input className={(design===1?'':'e')} type="file" name="upPhotos" multiple onChange={handlePhotoChange} />
                <button onClick={handleUploadClick}>Upload</button>
                <h3 className={(design===1?'':'e')}>Upload Photos</h3>
            </div>
        </div>
    )
}