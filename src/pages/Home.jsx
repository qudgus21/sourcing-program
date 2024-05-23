import React, { useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Container, Button, Alert } from 'react-bootstrap';

const HomePage = () => {

  useEffect(()=> {
    const fetchUsers = async () => {
      const docRef = doc(db, process.env.REACT_APP_FIREBASE_COLLECTION_NAME, process.env.REACT_APP_FIREBASE_DOCUMENT_NAME);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
    };

    fetchUsers();
  },[])

  return (
    <div className="home-page">
      <Alert variant="success" className="mt-[10px]">
        This is a success alert from React-Bootstrap3
      </Alert>
    </div>
  )
};

export default HomePage;