import React from 'react'
import "./list.css"
import UserInfo from './userInfo/UserInfo'
import Chatlist from './chatList/ChatList'

function List() {
  return (
    <div className='list'>      
        <UserInfo />
        <Chatlist />
    </div>

  )
}

export default List