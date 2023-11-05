import React, { useState, useEffect } from 'react';
import { auth } from './Firebase';
import { Spinner } from '@chakra-ui/spinner'; // Corrected import statement
import { storage } from './Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';



import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ClimbingBoxLoader } from 'react-spinners/ClimbingBoxLoader';
import { useNavigate } from 'react-router-dom';

export default function CreateAccount() {
    const [loading, setLoading] = useState(false);
  const [color, setColor] = useState('#ffffff');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const[suid,setSuid] = useState('');
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: '',
    City: '',
    age: '',
    phone: '',
    gender: '',
    adhar: '',
    alter: '',
    auid: '',
    aimg: '',
  });



  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const NavaigateToLogin =()=>{
    navigate('/login');
  }


  const handleSubmit = () => {
  
    
    const imageRef = ref(storage, 'image' +details.alter);
    uploadBytes(imageRef, selectedFile)
      .then(() => {
        getDownloadURL(imageRef).then((url) => {
          
         // setDetails({ ...details, aimg: url });
           PostData();
        });
      
      })
      
      .catch((error) => {
        console.log(error.message);
      });
       
  };

  const PostData =  () => {
    const {
      name,
      City,
      age,
      phone,
      gender,
      adhar,
      alter,
      auid,
      aimg,
    } = details;

    const res = fetch(
      'https://voting-a45af-default-rtdb.firebaseio.com/users/' +details.alter+ '.json',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          City,
          age,
          phone,
          gender,
          adhar,
          alter,
          auid,
          aimg:'https://firebasestorage.googleapis.com/v0/b/voting-a45af.appspot.com/o/image'+details.alter+'?alt=media&token=eab14b8b-63f7-43ec-9150-e6d7790f7ff8&_gl=1*ebtbrd*_ga*MTg1NDQzMjU1NS4xNjk3MDQxMzI4*_ga_CW55HF8NVT*MTY5OTA3ODUwNi4zOS4xLjE2OTkwODIxNDMuNTIuMC4w',
        }),
      }
    );
  };

  const signUp = (e) => {
    setLoading(true);

    checkAgeAndShowPopup(details.age);

    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uidq = user.uid;
        console.log(uidq)
        setSuid(uidq)
        setDetails({ ...details, auid: uidq });
        handleSubmit();
        setLoading(false);
        let id = details.alter
                 navigate('/home',{state:{id:id}})
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === 'auth/invalid-login-credentials') {
          alert(error.code)
        } else {
          console.error('Authentication error:', error.message);
          alert('You alredy voted')
        }
      });
  };

  function calculateAgeAndCheckIfAbove18(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const currentDate = new Date();

    const age = currentDate.getFullYear() - dob.getFullYear();

    if (
      currentDate.getMonth() < dob.getMonth() ||
      (currentDate.getMonth() === dob.getMonth() &&
        currentDate.getDate() < dob.getDate())
    ) {
      return age - 1;
    }

    return age;
  }

  function checkAgeAndShowPopup(dateOfBirth) {
    const age = calculateAgeAndCheckIfAbove18(dateOfBirth);

    if (age < 18) {
      alert('You must be 18 to vote!!');
      navigate('/')
    }
  }

  return (
    <div>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        flexDirection={'column'}
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
                           Vote for your future!!  
              </Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                Vote for your future!!
              </Text>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
            >
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id='firstName' isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        type='text'
                        onChange={(e) =>
                          setDetails({ ...details, name: e.target.value })
                        }
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id='lastName' isRequired>
                      <FormLabel>City/Town Name</FormLabel>
                      <Input
                        type='text'
                        onChange={(e) =>
                          setDetails({ ...details, City: e.target.value })
                        }
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id='email' isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id='password' isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl id='phone' isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type='tel'
                    onChange={(e) =>
                      setDetails({ ...details, phone: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl id='dob' isRequired>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    type='date'
                    onChange={(e) => {
                      setDetails({ ...details, age: e.target.value });
                      
                    }}
                  />
                </FormControl>
                <FormControl id='gender' isRequired>
                  <FormLabel>Gender</FormLabel>
                  <Input
                    type='text'
                    onChange={(e) =>
                      setDetails({ ...details, gender: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl id='aadharNo' isRequired>
                  <FormLabel>Aadhar Number</FormLabel>
                  <Input
                    type='text'
                    onChange={(e) =>
                      setDetails({ ...details, adhar: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl id='govtId' isRequired>
                  <FormLabel>Alternate Govt ID</FormLabel>
                  <Input
                    type='text'
                    onChange={(e) =>
                      setDetails({ ...details, alter: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl id='profilePicture' isRequired>
                  <FormLabel>Profile Picture</FormLabel>
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                  />
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText='Submitting'
                    size='lg'
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    onClick={signUp}
                  >
                    Verify me
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={'center'} >

              
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
