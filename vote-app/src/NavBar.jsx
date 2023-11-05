import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { auth, db } from './Firebase'
import React, { useState, useEffect } from 'react';
import 'firebase/auth';
import { set, ref, onValue, remove, update } from "firebase/database";
// import { ref, get } from 'firebase/database';
 





const  NavBar = (props)=> {
      const [timeRemaining, setTimeRemaining] = useState(10)
     const [todos, setTodos] = useState(new Map());
     const [userData, setUserData] = useState(null);
    const[user,setUser] = useState('')
     useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log(user.uid)
        setUser(user.uid)
            // Reference to the user's data in the Firebase Realtime Database
            let id = '/users/'+props.id
    const userRef = ref(db,id )
   // alert(id)
   
        onValue(userRef, (snapshot) => {
       setTodos(new Map());
      const data = snapshot.val();
      if (data !== null) {
        console.log("hello")
        const userMap = new Map(Object.entries(data));
        //console.log(userMap)
        setTodos(userMap)
         //const todosMap = new Map();
        // Object.values(data).map((todo) =>  {
        //     // todosMap.set(todo.key, todo);
        //    // console.log(todo)
        // });
       // 
       console.log(props.id)
      }else{
        console.log("no")
      }
    });

      } else {
        // No user is signed in.
        console.log("no")
      }
    });

     return () =>   unsubscribe();
 
  },[]);
      
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>{"Hello " + todos.get('name')} </Box>


          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={todos.get('aimg')}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={todos.get('aimg')}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{todos.get('name')}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>{"Region: "+todos.get('City')}</MenuItem>
                  <MenuItem>{"Voter-Id: "+todos.get('alter')}</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )

}
export default NavBar;
 
