import React, { useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Container, Button, Alert } from 'react-bootstrap';

const Login = () => {
  

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
      <div>이미지</div>
      <div>크몽아이디</div>
      <div>라이센스키</div>
    </div>
  )
};

export default Login;