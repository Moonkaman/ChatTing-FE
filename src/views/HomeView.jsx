import {useState} from 'react'
import {Heading, Center, Box, Button, Stack, Input, Text} from "@chakra-ui/react"
import {ChatIcon} from '@chakra-ui/icons'

function HomeView(props) {
  const [username, updateUsername] = useState(props.username)

  const handleChange = e => {
    updateUsername(e.target.value);
  }

  return (
    <Box>

      <Text width="75%" fontSize='xl' textAlign='center' margin="0 auto">
        Welcome to ChatTing! Enter a username and click "Connect" to chat with a random person.
      </Text>
      <Center marginTop="50px">
        <Stack>
          <Input placeholder="Enter a username" value={username} onChange={handleChange} />
          <Button onClick={e => props.startSearch(e, username)} leftIcon={<ChatIcon/>} colorScheme="blue">Connect</Button>
        </Stack>
      </Center>
    </Box>
  );
}

export default HomeView;
