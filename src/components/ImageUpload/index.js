import './index.css';
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import firebase from 'firebase';
import { db, storage } from '../../firebase.js';

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      'state_changed', 
      (snapshot) => {
        const progressInPercentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        const progress = Math.round(progressInPercentage)
        setProgress(progress);
      }, 
      (error) => {
        console.log(error);
        alert(error.message);
      }, 
      () => {
        storage.ref('images').child(image.name).getDownloadURL().then((url) => {
          db.collection('posts').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            imageUrl: url,
            username: username,
          });
          setProgress(0);
          setCaption('');
          setImage(null);
        });
      },
    );
  };

  return (
    <div className="imageupload">
      <progress className="imageupload__progress" value={progress} max="100" />
      <input 
        type="text" 
        placeholder="Enter a caption..." 
        onChange={event => setCaption(event.target.value)} 
        value={caption} 
      />
      <input type="file" onChange={handleChange} />
      <Button type="button" onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
