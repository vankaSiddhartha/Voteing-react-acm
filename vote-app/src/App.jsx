import { ChakraProvider } from '@chakra-ui/react'
import { useState } from 'react'
import Hero from './Hero'
import Congress from './Congress'
import BJP from './BJP'

import Footer from './Footer'
import CreateAccount from './CreateAccount'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import LoginAccount from './LoginAccount'
import NavBar from './NavBar'
import { BiSlideshow } from 'react-icons/bi'
import SlideShow from './SlideShow'
import './App.css';
import Home from './Home'
import Polt from './Polt'
import Results from './Results'




function App() {
 

  return (
    <Router>
      <Routes>
         <Route path="/" element={
          <>
            <Hero />
            <BJP />
            <Congress/>
            <Footer/>
         
            
          
            

          
            
          </>
        } />
           
      <Route path="/createAccount" element={<CreateAccount />} /> 
      <Route path='/login' element ={<LoginAccount/>}/>
       <Route path='/home' element ={<Home/>}/>
       <Route path='/results' element ={ <Results/>}/>

       
      
        
      </Routes>
    </Router>
  );
}

export default App
