import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, useParams } from 'react-router-dom'
import NavBar from '../../Components/NavBar/NavBar';
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import ProfilePage from '../ProfilePage/ProfilePage'
import { Card, Icon, Image } from 'semantic-ui-react'
import AddPhotos from '../AddPhotos/AddPhotos'
import './App.css';
import * as authService from '../../service/authService'
import Shared from '../Shared/Shared';
import _ from 'lodash'


export default function App(props) {
  const [user, setUser] = useState(authService.getUser())
  
  function handleSignupLogin() {
    setUser(authService.getUser())
  }
  function handleLogout() {
    authService.logout()
    setUser(null)
  }

  return (
    <>
    <NavBar user={user} handleLogout={handleLogout} />
      <Route exact path='/addPhotos'
        render={() => 
          <AddPhotos user={user} setUser={setUser} />
        } 
      />
      <Route exact path="/shared"
        render={() => 
        <Shared />
      } />
      <Route 
        exact path="/signup"
        render={() => 
          <Signup history={props.history} handleSignupLogin={handleSignupLogin}/>
        }/>
        <Route 
        exact path="/login"
        render={() => 
          <Login history={props.history} handleSignupLogin={handleSignupLogin}/>
        }/>
        <Switch>
          {user &&
          <Route path="/google/:gId" children={<CombineUser userId={user._id} setUser={setUser}/>}></Route>
          }
        </Switch>
        <Route 
        exact path="/profile"
        render={() => 
          <ProfilePage
          user={user} />
        }/>
        {/* <form action="/upload" method="POST" encType="multipart/form-data">
        <input type="file" accept="image/*" name="photo" />
        <input type="submit" value="upload" />
        </form> */}
    </>
  );
}

function CombineUser({ userId, setUser }) {
  let { gId } = useParams()
  console.log(gId)
  combineUser(gId, userId, setUser)
  return <Redirect exact to="/addPhotos" />
}

function combineUser(gId, userId, setUser) {
  console.log(`in the lower combine user with gId ${gId} and userId ${userId} and setUser ${setUser}`)
  authService.sendUserGUser(gId, userId, (err, user) => 
  setUser(authService.getUser(userId)))
}