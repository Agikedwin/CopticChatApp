import React, { useEffect, useRef, useState } from 'react'
import "./chat.css"
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUsersStore } from '../../lib/userStore';
import upload from '../../lib/uploads';

 const Chats = () => {

  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const [chats, setChats] = useState()
  const [img, setImg] = useState({
    file: null,
    url: ""
  })
  const  endRef = useRef(null)

  const {chatId, user, isCurrentUserBlocked, isReceiverBlocked} = useChatStore()
  const {currentUser} = useUsersStore()

  useEffect(() =>{
    endRef.current?.scrollIntoView({behavior:"smooth"})

  },[])

  useEffect(() =>{
    const unSub = onSnapshot(
      doc(db, "chats", chatId),
      (res) =>{
        setChats(res.data())
      }
    );
    return () => {
      unSub();
    }
  },[chatId])

  const handleEmoji = e => {
    setText((prev) => prev + e.emoji)
    setOpen(false)
  }

  const handleImage = e => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])


      })
    }
  }

  const handleSend = async() =>{
   const userIDs = [currentUser.id, user.id];


    if (text === "") return
    let imgUrl = null;


    try {
      if(img.file){
       // imgUrl = await upload(img.file); to be uncommented when firebase firebase storage is fixed
        
      }
      
      await updateDoc(doc(db, "chats", chatId),{
        messages:arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          // ...(imgUrl && {img: imgUrl}) to be udated when firebase storage is configured
        })
      });

      userIDs.forEach(async (id) => { 
      
      const userChatRef = doc(db, "userChats", id);
      const userChatSnapShot = await getDoc(userChatRef);

      if(userChatSnapShot.exists()){
        const userChatData = userChatSnapShot.data();

        const chatIdex = userChatData.chat.findIndex(
          (c)=> c.chatId === chatId
        )
        userChatData.chat[chatIdex].lastMessage = text;
        userChatData.chat[chatIdex].isSeen = 
        id === currentUser.id ? true : false;
        userChatData.chat[chatIdex].updatedAt = Date.now();

        await updateDoc(userChatRef,{
          chat: userChatData.chat,
        });

      }
    });

      
    } catch (error) {
      console.log(error)
      
    }

    setImg({
      file: null,
      url: ""
    });
    setText("")
  }

  return (
    <div className='chat'>
      <div className='top' >
        <div className="user">
        <img src={"./avatar.png" || user?.avatar} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
            <p>The user profile of message receiver</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className='center' key='0'>
              
      { chats?.messages?.map((message) =>(
        <div className={ message.senderId === currentUser?.id ? "message own": "message"} 
        key={message?.createdAt}>
          <div className="texts">
            {/* <img src={"https://i.postimg.cc/ydNqNCzd/Screenshot-from-2024-11-22-09-02-15.png" || message.img} alt="" /> */}
            <p>
            {message.text}
            </p>
            {/* <span>{message}</span> */}
          </div>
        </div>
      )
      )} 

      {
        img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="" />
            </div>
          </div>

        )
      }     
        
        

        <div ref={endRef}></div>

      </div>
      <div className='bottom' >
        <div className="icons">
          <label htmlFor="file">
          <img src="./img.png" alt="" />
          </label>
          
          <input type="file" id="file" style={{display: "none"}} onChange={handleImage}/>
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" 
        placeholder={(isReceiverBlocked || isCurrentUserBlocked) ? "You cannot send a message ": "Type a message"}
         onChange={(e) => setText(e.target.value)}
         value={text}
         disabled = {isReceiverBlocked || isCurrentUserBlocked} 
         />
        <div className="emoji">
          <img src="./emoji.png"
           alt="" 
            onClick={() => setOpen((prev) => !prev)}
            />
          <div className='picker'>
          <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
          </div>
        </div>
        <button className='sendButton'
         onClick={handleSend}
         disabled = {isReceiverBlocked || isCurrentUserBlocked}         
         >Send</button>
      </div>
      
    </div>
  )
}

export default Chats