import React, { Component } from 'react'
import * as authService from '../../service/authService'
import FavoriteDates from '../../Components/FavoriteDates/FavoriteDates'
import YouTubePlayer from '../../Components/YouTubePlayer/YouTubePlayer'
import AddFavoriteDate from '../../Components/AddFavoriteDate/AddFavoriteDate'
import DividerEl from '../../Components/Divider'
function ProfilePage(props) {
        function sortPhotosByDate(datePicked) {
                console.log(`sorting photos by date ${datePicked}`)
                return datePicked.toLocaleDateString()
        }
        return ( 
            <>
            <h1>{props.user.name}'s Profile</h1>
            <FavoriteDates user={props.user} sortPhotosByDate={sortPhotosByDate}/>
            < DividerEl />
            {/* {props.users.photos.length ? }
            {props.user.photos.map((photo, i) => <img src={photo.urlTo} alt="" />)} */}
            <YouTubePlayer />
            </>

         );
    }
 
export default ProfilePage;
