import {Heading, Center, Box, Button, FormControl, Textarea, Spinner, Text} from "@chakra-ui/react"

const TopBar = (props) => {
  return (
    <Box
    width="100%"
    padding="20px"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    boxShadow="0px 0px 5px gray"
    height="100%"
  >
    <Box 
    display="flex"
    >
      <Heading size="xl" color="#8c7ae6">Chat</Heading> <Heading size="xl" color="#e67e22">Ting</Heading>
    </Box>

    <Heading size="md" color="#8c7ae6">{props.numUsers} Online</Heading>
  </Box>
  )
}

export default TopBar
