import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from './Firebase'; // Import your Firebase configuration
import { Text, Card } from '@chakra-ui/react';
import CardR from './CardR';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

function Results() {

    const today = new Date();
const[resultTime,setResultTime] = useState('2023-11-06T17:30:00')
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1 and pad with leading zero if needed.
const day = String(today.getDate()).padStart(2, '0');
const hours = String(today.getHours()).padStart(2, '0');
const minutes = String(today.getMinutes()).padStart(2, '0');
const seconds = String(today.getSeconds()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
const date2 = resultTime ;
const timestamp1 = new Date(formattedDate)
const timestamp2 = new Date(date2)
 let remaingtime = (timestamp2-timestamp1)/1000
  const location = useLocation();
  const [todos, setTodos] = useState(new Map());
  const [showResults, setShowResults] = useState(false);
  const originalTime = moment('2023-11-06T17:30:00');
    const formattedTime = originalTime.format('D/M/YYYY h:mm:ss a');
    useEffect(() => {
        const timeRef = ref(db,'/results');
          onValue(timeRef, (nsnapshot) => {
            const ndata = nsnapshot.val();
            if (ndata !== null) {
              console.log(ndata)
               setResultTime(ndata)
            }
          });
    const handlePopState = () => {
      if (window.location.pathname === '/home') {
        window.location.pathname = '/';
      }
    };

    window.addEventListener('popstate', handlePopState);
    const userRef = ref(db, '/pol');
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const subMap = new Map();

        for (let d in data) {
          const userRef = ref(db, '/pol/' + d);
          onValue(userRef, (nsnapshot) => {
            const ndata = nsnapshot.val();
            if (ndata !== null) {
              const userMap = new Map(Object.entries(ndata));
              subMap.set(d, userMap);
            }
          });
        }
        setTodos(subMap);

        // Set a timer to show results after 1 hour (3600 seconds)
        setTimeout(() => {
          setShowResults(true);
         
        }, 3600 * 1000);

        // Update the time remaining every second
        const timer = setInterval(() => {
          setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);

        return () => {
          window.removeEventListener('popstate', handlePopState);
          clearInterval(timer);
        };
      } else {
        alert('nooo');
      }
    });
  }, []);
    const targetTimeIST = originalTime.toDate();

  // Get the current time in IST
  const currentTimeIST = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // Calculate the time difference in seconds
  const s = (targetTimeIST - new Date(currentTimeIST))
  const timeRemainingInSeconds = Math.max(Math.floor((targetTimeIST - new Date(currentTimeIST)) / 1000), 0);
      // alert(timeRemainingInSeconds)
     
       const [timeRemaining, setTimeRemaining] = useState(remaingtime);
  // const [showResults, setShowResults] = useState(false);
  // const [timeRemaining, setTimeRemaining] = useState(timeRemainingInSeconds);


if(timeRemaining<0){
  setShowResults(true)
  setTimeRemaining(0)
}



  function formatTimeRemaining(timeRemaining) {
    const days = Math.floor(timeRemaining / (60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeRemaining % (60 * 60)) / 60);
    const seconds = timeRemaining % 60;
     //console.log(s)
   
    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }

  return (
     <div>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Results in {location.state.id}
      </Text>
      {showResults ? (
        <Card>
          <ul>
            {Array.from(todos.values())
              .sort((a, b) => b.get('vote') - a.get('vote'))
              .filter((value) => value.get('city') === location.state.id)
              .map((value, index) => (
                <CardR id={value} key={index} />
              ))}
          </ul>
        </Card>
      ) : (
        <Text fontSize="lg">Time Remaining: {formatTimeRemaining(timeRemaining)}</Text>
      )}
    </div>
  );
}

export default Results;