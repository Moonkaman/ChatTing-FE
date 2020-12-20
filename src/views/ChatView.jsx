import {useState} from 'react'
import {Heading, Center, Box, Button, FormControl, Textarea, Spinner, Text} from "@chakra-ui/react"

import Message from '../components/Message';

const ChatView = props => {
  const [messageText, updateMessageText] = useState("");

  const handleChange = e => {
    updateMessageText(e.target.value);
    props.relayTyping(e.target.value !== "")
  }

  const submitMessage = _ => {
    props.sendMessage(messageText)
    updateMessageText("")
  }

  const handleKeyDown = e => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      submitMessage()
    }
  }

  return (
    <Box height="100%" display="flex" flexWrap="wrap">
      <Box width="100%" height="92%" padding="20px 20px 0 20px">
        <Box border="1px solid #d9e7ff" height="100%" borderRadius="10px" padding="10px" overflowY="auto" overflowX="hidden" position="relative">
          {props.searching ? (
            <Center height="100%" backgroundImage="url('https://media1.giphy.com/media/1fhj6lj9qMupwVxTFY/giphy.gif')" backgroundRepeat="no-repeat" backgroundSize="cover">
              <Heading size="xl">
                Finding stranger <Spinner />
              </Heading>
            </Center>
          ) : (
            props.messages.map((message, index) => <Message username={props.username} message={message} key={index} />)
          )}
          {props.typing && <Text position="absolute" bottom="5px" width="100%" textAlign="center" fontWeight="bold">Stranger Is Typing...</Text>}
          <Box float="left" clear="both" ref={props.bottomOfChat}></Box>
        </Box>
      </Box>
      <Box alignSelf="flex-end" width="100vw" padding='20px' height="8%">
        <FormControl display="flex" justifyContent="space-between" height="100%">
          <Button height="100%" minHeight='100%' colorScheme="red" onClick={props.disconnect}>Leave</Button>
          <Textarea isDisabled={props.searching} height="100%" minHeight='100%' type="text" margin='0 10px 0 10px' value={messageText} onChange={handleChange} resize="none" placeholder="Type a message..." onKeyDown={handleKeyDown}/>
          {props.searching ? (
            <Button height="100%" minHeight='100%' colorScheme="blue" onClick={props.stopSearch}>Stop</Button>
          ) : (
            <Button height="100%" minHeight='100%' colorScheme="blue" onClick={submitMessage}>Send</Button>
          )}
        </FormControl>
      </Box>
    </Box>
  )
}

export default ChatView;
