import React from 'react'

import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import App from './App'
import { useNavigate } from 'react-router-dom';

export default function Hero() {
    const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/createAccount');
  };
    const handleButtonClickToLogin = () => {
    navigate('/login');
  };
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}>
              Election
            </Text>
            <br />{' '}
            <Text color={'blue.400'} as={'span'}>
              Commission of India 
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
          Online elections offer greater accessibility, enabling voters to participate from the comfort of their homes, 
          increasing convenience and potentially boosting voter turnout.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
             onClick={handleButtonClick}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Vote now!!
            </Button>
           <Button  onClick={handleButtonClickToLogin}  _hover={{
                bg: 'white.500',
              }}
              rounded={'full'}>Login</Button>
          </Stack>
        </Stack>
       </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://media.istockphoto.com/id/1152403485/photo/voter-sign-india.jpg?s=2048x2048&w=is&k=20&c=0XAz4lFmzKuB7JA6ws2IsZqmB4HWnB6MSN8R_3M_e0Q='
          }
        />
      </Flex>
     
    </Stack>
     
  )
  
}
