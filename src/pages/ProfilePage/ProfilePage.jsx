import React, { Component } from 'react'
import * as authService from '../../service/authService'
import FavoriteDates from '../../Components/FavoriteDates/FavoriteDates'
import YouTubePlayer from '../../Components/YouTubePlayer/YouTubePlayer'
import AddFavoriteDate from '../../Components/AddFavoriteDate/AddFavoriteDate'
function ProfilePage(props) {
        function sortPhotosByDate(datePicked) {
                console.log(`sorting photos by date ${datePicked}`)
                return datePicked.toLocaleDateString()
        }
        return ( 
            <>
            <h1>{props.user.name}'s Profile</h1>
            <FavoriteDates user={props.user} sortPhotosByDate={sortPhotosByDate}/>
            <YouTubePlayer />
            </>

         );
    }
 
export default ProfilePage;
