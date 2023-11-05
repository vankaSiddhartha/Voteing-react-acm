import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';



import { Spinner } from '@chakra-ui/spinner';
import { auth } from './Firebase';
 import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
 import { logIn } from './Firebase';

export default function LoginAccount() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[loading,setLoading] = useState(false)
  const[city,getCity] = useState('')
 

   const Login = async (e) => {
      setLoading(true);
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(email);
      setLoading(false)
      let id = city
       navigate('/results',{state:{id:id}})
       alert(city)
    } catch (err) {
      console.error('Error:', err);
      setLoading(false)
      
     

    }

  
    
  
   

  };


  return (
    <div>
    
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
     {loading ? (
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        ) : (
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Login
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
           
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e)=>setEmail(e.target.value)}/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={(e)=>setPassword(e.target.value)} />
                <Button
                  size="sm"
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputGroup>
            </FormControl>
            <FormControl id="aadharNo" isRequired>
              <FormLabel>City/Region</FormLabel>
              <Input type="text"onChange={(e)=>getCity(e.target.value)} />
            </FormControl>
            <FormControl id="phone" isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input type="tel" />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={Login}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                New user? <Link color={'blue.400'}>Create Account</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
       )}
    </Flex>
       
    </div>
  );
}
