import {Text, Box} from "@chakra-ui/react"

const Message = props => {
  return (
    <Box display="flex">
      <Text fontWeight="bold" margin="0 5px 5px 0" color={props.username === props.message.username ? '#8c7ae6' : '#e67e22'}>{props.message.username}{props.username === props.message.username ? " (You)" : ""}:</Text>
      <Text>{props.message.message}</Text>
    </Box>
  )
}

export default Message
