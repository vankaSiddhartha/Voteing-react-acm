import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { auth,db } from './Firebase';
import { useState ,useEffect} from 'react';
import { set, ref, onValue, remove, update } from "firebase/database";

 const Polt = (props) => {
  const navigate = useNavigate();
   
  
  
  const [vote, setVote] = useState(0);
    const initialMinutes = 3;
  const initialSeconds = 0;
   
 const [seconds, setSeconds] = useState(180);



  useEffect(() => {
     const timerInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(timerInterval);
        navigate('/results');
      }
    }, 1000);
    const voteRef = ref(db, '/pol/'+props.id.get('id')+'/vote');

    const updateVote = (csnapshot) => {
      const cdata = csnapshot.val();
      if (cdata !== null) {
        setVote(cdata);
      }
    };

    // Attach the onValue listener to update the vote when it changes in Firebase
    const voteListener = onValue(voteRef, updateVote);

    // Cleanup the listener when the component unmounts
    return () => {
      // Unsubscribe from the Firebase reference to avoid memory leaks
      voteListener(); clearInterval(timerInterval);
    };
  }, [seconds, navigate]); // The empty dependency array means this effect runs once, like componentDidMount
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
const handleIncrement = async () => {
    try {
      // Perform the increment operation (e.g., increment by 1)
      const newValue = (vote || 0) + 1;

      // Update the incremented value back in Firebase
      const valueRef =ref(db,  '/pol/'+props.id.get('id')+'/vote');
      await set(valueRef, newValue);

      // Update the local state with the new value
      setVote(newValue);
      const id = props.id.get('city')
        navigate('/results',{state:{id:id}});
      
    } catch (error) {
      console.error('Error incrementing value:', error);
    }
  };

 


  return (
   
     <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Flex>
          <Image
            rounded={'md'}
            alt={'product image'}
            src={
             props.id.get('img')
            }
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {props.id.get('name')}
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}>
               {props.id.get('party')}
           
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
            }>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'300'}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore
              </Text>
              <Text fontSize={'lg'}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet
                at delectus doloribus dolorum expedita hic, ipsum maxime modi nam officiis
                porro, quae, quisquam quos reprehenderit velit? Natus, totam.
              </Text>
            </VStack>
            
            
          </Stack>

          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            onClick={handleIncrement}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}>
             Vote : {formatTime(seconds)}:
        {seconds < 10 ? '0' + seconds : seconds}
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={'center'}>
            
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  )
};

export default Polt;



