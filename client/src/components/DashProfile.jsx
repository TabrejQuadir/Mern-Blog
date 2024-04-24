// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button, TextInput } from 'flowbite-react';
// import { useSelector, useDispatch } from 'react-redux';
// import { signInSuccess } from '../redux/user/userSlice';// Import the signInSuccess action

// export default function DashProfile() {
//   const dispatch = useDispatch();
//   const { currentUser } = useSelector((state) => state.user);
//   const [imageFile, setImageFile] = useState(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('image', imageFile);
//     formData.append('username', e.target.username.value);
//     formData.append('email', e.target.email.value);
//     formData.append('password', e.target.password.value);

//     try {
//       const response = await axios.post('http://localhost:4000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       // Check if imageUrl is present in the response
//       const newimageUrl = response.data.imageUrl;
//       const filename = newimageUrl.split('/').pop(); // Extract the filename from the URL

//       if (newimageUrl) {
//         const updatedUser = { ...currentUser, profilePicture: filename };
//         dispatch(signInSuccess(updatedUser)); // Dispatch action to update Redux store
//         console.log('Form submitted successfully', updatedUser);
//       } else {
//         console.error('Error: Image URL not found in response');
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };
//   return (
//     <div className='max-w-lg mx-auto p-3 w-full'>
//       <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
//       <form className='flex flex-col gap-4' onSubmit={handleFormSubmit}>

//         <div className='size-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative'>

//           <img
//              src={`http://localhost:4000/uploads/${currentUser.profilePicture}`}
//             // alt='user'
//             className='rounded-full size-full object-cover border-8 border-[lightgray]'
//           />
//           {/* {console.log(currentUser.profilePicture)} */}
//         </div>
//         <input type='file' onChange={handleImageChange} className=' top-10 left-3 ' />

//         <TextInput
//           type='text'
//           id='username'
//           name='username'
//           placeholder='username'
//           defaultValue={currentUser.username}
//         />
//         <TextInput
//           type='email'
//           id='email'
//           name='email'
//           placeholder='email'
//           defaultValue={currentUser.email}
//         />
//         <TextInput
//           type='password'
//           id='password'
//           name='password'
//           placeholder='password'
//         />
//         <Button type='submit' gradientDuoTone='purpleToBlue' outline>
//           Update
//         </Button>
//       </form>
//       <div className="text-red-700 flex justify-between mt-5">
//         <span className='cursor-pointer'>Delete Account</span>
//         <span className='cursor-pointer'>Sign Out</span>
//       </div>
//     </div>
//   );
// }


import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = () => {
    console.log("uploading image...");

    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        setImageFileUploadProgress(null);
        });
      }
    );
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100
                    })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt=''
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
              }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
        />
        <TextInput type='password' id='password' placeholder='password' />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  );
}