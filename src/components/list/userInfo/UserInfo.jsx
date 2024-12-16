import React from 'react'
import "./userInfo.css"
import { useUsersStore } from '../../../lib/userStore'
import { auth } from '../../../lib/firebase'

const UserInfo =() => {
  const {currentUser} = useUsersStore()

  return (
    <div className='userInfo'>
        <div className='user'>
        <img src={ './avatar.png' || currentUser.avatar  } alt='' />
        <h3>{currentUser.username}</h3>

        </div>
        <div className='icons'>
            <img src='./more.png' alt='' />
            <img src='./video.png' alt='' />
            <img src='./edit.png' alt='' onClick={() =>{auth.signOut()}}/>

        </div>
    </div>
  )
}

export default UserInfo