import React from 'react'
import "./detail.css"
import { auth, db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { useUsersStore } from '../../lib/userStore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'

const Detail = () => {

const {chatId, user, isCurrentUserBlocked, 
  isReceiverBlocked, changeBlock} = useChatStore()

  const {currentUser} = useUsersStore();

  const handleBlock = async () => {
    if(!user) return;

    const userDocRef = doc(db, "users", currentUser.id);


    try {
      await updateDoc(userDocRef, {
        blocked: isCurrentUserBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
      });
      changeBlock()
      
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='detail'>
      <div className="user">
        <img src={"./avatar.png" || user?.avatar} alt="" />
        <h2>{user?.username}</h2>
        <p>
         some text
        </p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chats Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Privacy &  help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt=""  />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://i.postimg.cc/x8xLSH38/Screenshot-from-2024-11-14-16-31-34.png" alt="" />
                <span>Some photo .png</span>
              </div>

              <img src="./download.png" alt="" className="icon"/>
            </div>

            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://i.postimg.cc/x8xLSH38/Screenshot-from-2024-11-14-16-31-34.png" alt="" />
                <span>Some photo .png</span>
              </div>

              <img src="./download.png" alt="" className="icon" />
            </div>

            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://i.postimg.cc/x8xLSH38/Screenshot-from-2024-11-14-16-31-34.png" alt="" />
                <span>Some photo .png</span>
              </div>

              <img src="./download.png" alt=""  className="icon"/>
            </div>

            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://i.postimg.cc/x8xLSH38/Screenshot-from-2024-11-14-16-31-34.png" alt="" />
                <span>Some photo .png</span>
              </div>

              <img src="./download.png" alt=""  className="icon"/>
            </div>

           

          </div>
        </div>

      
        <button onClick={handleBlock}>
          {
            isCurrentUserBlocked ? "You are Blocked"
            : isReceiverBlocked ? "User Blocked"
            : "Block User"
          }
        </button>
        <button className="logout" onClick={() => auth.signOut()}>logout</button>

      </div>
    </div>
  )
}

export default Detail