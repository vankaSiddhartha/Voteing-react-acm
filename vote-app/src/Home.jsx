import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Flex,
  Button,
  Toast,
} from '@chakra-ui/react';
import NavBar from './NavBar';
import { useLocation } from 'react-router-dom';
import SlideShow from './SlideShow';
import { auth, db } from './Firebase'
import React, { useState, useEffect } from 'react';
import 'firebase/auth';
import { set, ref, onValue, remove, update } from "firebase/database";
import Polt from './Polt';

const IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

export default function Home() {
    const location = useLocation()
    const [todos, setTodos] = useState(new Map());
    const [city,setCity] = useState('')
    /// 
      useEffect(() => {

        ///users/ASFDHRFDS/City
        const cityRef = ref(db,'users/'+location.state.id+'/City')
        onValue(cityRef, (csnapshot) => {
        
      const cdata = csnapshot.val();
      if (cdata !== null){
         setCity(cdata)
      }
      })
         const userRef = ref(db, '/pol');
    onValue(userRef, (snapshot) => {
        setTodos(new Map());
      const data = snapshot.val();
      if (data !== null){
        const subMap = new Map()
        for (let d in data){
           
              const userRef = ref(db, '/pol/'+d);
       onValue(userRef, (nsnapshot) => {
          const ndata = nsnapshot.val();
          if(ndata!==null){
     
    const userMap = new Map(Object.entries(ndata));
   
     
    subMap.set(d,userMap)
    
    
     console.log(todos)
          }
         })
    }
    setTodos(subMap)
    console.log(todos)
       
      }else{
        alert('nooo')
      }
    });
  }, []);
     const SliderData = [
  {
    image:
      'https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    image:
      'https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80'
  },
  {
    image:
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
  },
  {
    image:
      'https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80'
  },
  {
    image:
      'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
  }
];
  return (
      
    <div>
  
    
       <NavBar id = {location.state.id}/>
     <SlideShow slides={SliderData}/>

     {Array.from(todos.values())
      .filter((value) => value.get('city') === city)
  .map((value, index) => (
    <Polt id={value} key={index} />
  ))}


    
     
     
   
    
      
    </div>
  );
}