import React, { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';

const MockFrontEnd = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = async () => {
    try {
      // Simulate picking an image file (assuming "test-image.jpg" is in the public folder)
      const selectedImage = new File(['brownies.jpg'], 'brownies.jpg', { type: 'image/jpeg' });
      
      // Simulate FormData for image upload
      const formData = new FormData();
      formData.append('file', selectedImage);

      // Simulate backend API URL
      const backendApiUrl = 'http://localhost:8000/api/process/';

      // Simulate the POST request to the backend
      const response = await axios.post(backendApiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response from the server
      console.log('Response from the server:', response.data);
      // Update the state or perform any other actions based on the response
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <button onClick={handleImageUpload}>Upload Image</button>
      {image && <img src={image} alt="Uploaded" style={{ width: '200px', height: '200px' }} />}
    </div>
  );
};

export default MockFrontEnd;