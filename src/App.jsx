import {useState, useEffect, useRef} from 'react';
import {Box} from '@chakra-ui/react'
import io from 'socket.io-client';

import genMessages from './fakedata'

import HomeView from './views/HomeView';
import ChatView from './views/ChatView';
import TopBar from './components/TopBar'

import { userName } from 'Faker/lib/internet';
const socket = io(process.env.REACT_APP_SOCKETURL, {
  origin: process.env.REACT_APP_SOCKETURL,
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

function App() {
  const [chatting, updateChatting] = useState(false)
  const [searching, updateSearching] = useState(false)
  const [messages, updateMessages] = useState([])
  const [username, updateUsername] = useState("")
  const [typing, updateTyping] = useState(false)
  const [numUsers, updateNumUsers] = useState(0)
  const bottomOfChat = useRef(null);

  // useEffect(_ => {
  //   updateMessages(genMessages(100))
  // }, [])

  useEffect(_ => {
    socket.on('match found', (msg) => {
      console.log("Found Match");
      console.log(msg)
      updateSearching(false);
      updateChatting(true);
      updateMessages([]);
    })

    socket.on('update users', users => {
      updateNumUsers(users);
    })
  
    socket.on('message', message => {
      updateMessages(messages => [
        ...messages,
        message
      ])

      bottomOfChat.current.scrollIntoView({behavior: 'smooth'});
      console.log(bottomOfChat)
    })

    socket.on('leave chat', () => {
      socket.emit('leave chat')
      updateSearching(false);
      updateChatting(false);
      updateMessages([]);
    })
  
    socket.on('typing', () => {
      updateTyping(true);
    })
  
    socket.on('not typing', () => {
      updateTyping(false);
    })
  
  }, [])

  const relayTyping = bool => {
    if (bool) {
      socket.emit('typing')
    } else {
      socket.emit('not typing')
    }
  }

  const startSearch = (e, usernameText) => {
    if (usernameText !== "" && usernameText !== null) {
      e.preventDefault();
      updateUsername(usernameText);
      updateSearching(true);
      updateChatting(true);
      socket.emit('search', {username: usernameText})
    } else {
      alert("Enter a username")
    }
  }

  const stopSearch = e => {
    e.preventDefault();
    updateSearching(false);
    updateChatting(false);
    socket.emit('stop search')
  }

  const disconnect = e => {
    updateSearching(false);
    updateChatting(false);
    socket.emit('leave chat')
  }

  const sendMessage = (messageText) => {
    console.log(messageText)
    socket.emit('not typing')
    socket.emit('message', {message: messageText})
  }

  if (!chatting && !searching) {
    return (
      <Box height='100vh' width='100vw'>
        <Box width="100%" height="8%">
          <TopBar numUsers={numUsers}/>
        </Box>
        <Box width="100%" height="92%" padding="50px">
          <HomeView username={username} startSearch={startSearch}/>
        </Box>
      </Box>
      );
  } else if( (chatting && !searching) || (chatting && searching) ) {
    return(
      <Box height='100vh' width='100vw'>
        <Box width="100%" height="8%">
          <TopBar numUsers={numUsers}/>
        </Box>
        <Box width="100%" height="92%">
        <ChatView bottomOfChat={bottomOfChat} relayTyping={relayTyping} typing={typing} disconnect={disconnect} stopSearch={stopSearch} sendMessage={sendMessage} username={username} messages={messages} searching={searching}/>
        </Box>
      </Box>
    )
  } else {
    return(
      <h1>Error</h1>
    )
  }
}

export default App;

//display='flex' alignContent='center' justifyContent='center'