import React, { useState } from 'react'
import "./AddUser.css"
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../../../lib/firebase'
import { useUsersStore } from '../../../../lib/userStore'

const AddUser = ()=> {

  const [user, setUser] = useState(null);
  const { currentUser } = useUsersStore();

  const handleSearch = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    

    try {
      const userRef = collection(db, "users");

      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);



      if(!querySnapShot.empty){
        console.log(querySnapShot.docs)
       

        setUser(querySnapShot.docs[0].data())
      }

      
    } catch (error) {
      console.log(error)
      
    }
  }
const handleAdd = async () =>{
  const chatRef = collection(db, "chats");
  const userChatRef = collection(db, "userChats");
  try {
    const newChatRef = doc(chatRef);
    await setDoc(newChatRef, {
      createdAt: serverTimestamp(),
      messages: []
    })
   
    await updateDoc(doc(userChatRef, user.id),{
      chat: arrayUnion({
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: currentUser.id,
        updatedAt: Date.now(),
      })

    })

    await updateDoc(doc(userChatRef, currentUser.id),{
      chat: arrayUnion({
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: user.id,
        updatedAt: Date.now(),
      })

    })
    console.log("ewChatRef.id", newChatRef.id)

    
  } catch (error) {
    console.log(error)
    
  }

}

  return (
    <div className='addUser'>
        <form  onSubmit={handleSearch}>
            <input type="text" placeholder='Username'  name='username'/>
            <button>Search</button>

        </form>
        { user && <div className="user">
            <div className="detail">
                <img src={"./avatar.png" || user.avatar} alt="" />
                <span>{user.username}</span>
            </div>
            <button onClick={handleAdd}>Add User</button>
        </div>}

    </div>
  )
}

export default AddUser