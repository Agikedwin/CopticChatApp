import React from 'react'
import './ViodeoCall.css'


import { CallControls, CallingState, ParticipantView, SpeakerLayout, StreamCall, StreamTheme, StreamVideo, StreamVideoClient, StreamVideoParticipant, useCall,
  useCallStateHooks} 
  from "@stream-io/video-react-sdk"




const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1JldmFuIiwidXNlcl9pZCI6IlJldmFuIiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3MzMxNDc4MDgsImV4cCI6MTczMzc1MjYwOH0.bxoJa_XoIu4aMwuoycWN3Eb6P6rG_iBOCuLyQA7kW6c';
const userId = 'Revan';
const callId = 'Fu9foNClifu6';

// set up the user object
const user: User = {
 id: userId,
 name: 'Oliver',
 image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('default', callId);
call.join({ create: true });

export const MyUILayout = () => {
 const call = useCall();
 const { useCallCallingState, useLocalParticipant, useRemoteParticipants} = useCallStateHooks();
 const callingState = useCallCallingState()


 if (callingState !== CallingState.JOINED) {
   return <div>Loading...</div>;
 }

 return (
     <StreamTheme  >
       <SpeakerLayout participantsBarPosition='bottom' />
       <CallControls />       
       </StreamTheme>
 );
}

export const MyParticipantsList = (props: {
 participants: StreamVideoParticipant[];

}) => {
 const { participants } = props;
 return (
   <div
     style={{
       display: 'flex',
       flexDirection: 'row',
       gap: '8px',
       width: '100vw',
     }}
   >
     {participants.map((participant) => (
       <div style={{width:'100%', aspectRatio: '3/2'}}>

         <ParticipantView 
         muteAudio
         participant={participant}
         key={participant.sessionId}
         />

       </div>

     ))}

   </div>
 )
};

export const MyFloatingLocalParticipant = (props: {
 participant?: StreamVideoParticipant
})=>{
 const {participant} = props;

 return(
   <div
   style={{
     position:'absolute',
     top:'15px',
     left:'15px',
     width:'240px',
     height:'135px',
     boxShadow: 'rgba(0,0,0,0.1) 0px 0px10px 3px',
     borderRadius: '12px'
   }}
   >
     {participant && <ParticipantView muteAudio participant={ participant} /> }


   </div>
 )
}

export const  ViodeoCall= () => {
  return (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <MyUILayout />
            </StreamCall>
          </StreamVideo>
  
         
    )
  }
  


