
import React, { useState } from "react"
import './index.css'

import { useEffect } from "react"
import Chats from "./components/chats/Chat"
import Detail from "./components/detail/Detail"
import List from "./components/list/List"
import Login from "./components/login/Login"
import Notification from "./components/notification/Notification"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./lib/firebase"
import { useUsersStore } from "./lib/userStore"
import { useChatStore } from "./lib/chatStore"
import  ListAllClients  from './components/clients/ListAllClients'
const App = () => {


  const { currentUser, isLoading, fetchUserInfo } = useUsersStore()
  const { chatId } = useChatStore()
  const [isChatUi, setIsChatUi] = useState(false);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {

      fetchUserInfo(user?.uid)
      
    })
    return () => {
      unSub();
    }
  }, [fetchUserInfo])


  if (isLoading) return <div className="loading">Loading...</div>

  if (!isChatUi){
    console.log("the cur =================l", chatId)
    return (
      <>
      
       <div className='container'>
          
  
          {currentUser ? (
  
            <>
              <List />
              {chatId && <Chats />}
              {chatId && <Detail />}
  
            </>
          ) : (
            <Login />
          )
          }
          <Notification />
        </div> 
      </>
    )

  }
  
}

export default App