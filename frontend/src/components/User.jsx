import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import {
      deleteUserFailure,
      deleteUserStart,
      deleteUserSuccess,
      signOutUserFailure,
      signOutUserStart,
      signOutUserSuccess,
      updateUserFailure,
      updateUserStart, 
      updateUserSuccess, } from "../redux/user/userSlice";
import { useDispatch } from 'react-redux';


export default function User() {
    
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUplardError, setFileIploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSignOutModal, setShowSignOutModal] = useState(false);



    const dispatch = useDispatch();


   


    useEffect(() => {
        if (file) {
          handleFileUpload(file);
        }
      }, [file]);
    

      const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);


        uploadTask.on('state_changed',
    (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setFilePerc(Math.round(progress));
    },
    (error) => {
        setFileIploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
        );
        };

        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.id]: e.target.value });
          };


          const handleSubmit = async(e) =>{
            e.preventDefault();
            try{
              dispatch(updateUserStart());
              const res = await fetch(`/backend/user/updatestaff/${currentUser._id}`, {
                method:'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify(formData),
              });
              const data = await res.json();
              if(data.success ===false){
                dispatch(updateUserFailure(error.message));
                return;
              }
        
              dispatch(updateUserSuccess(data));
              setUpdateSuccess(true);
            }catch(error){
              dispatch(updateUserFailure(error.message));
            }
          };
          const handleDelete = async () => {
            setShowDeleteModal(true); 
          };
        
          const confirmDelete = async () => {
            try {
              dispatch(deleteUserStart());
              const res = await fetch(`/backend/user/deletestaff/${currentUser._id}`, {
                method: 'DELETE',
              });
              const data = await res.json();
              if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
              }
              dispatch(deleteUserSuccess(data));
              window.location.href = '/signin';
            } catch (error) {
              dispatch(deleteUserFailure(error.message));
            }
          };
        
          const handleSignOut = async () => {
            setShowSignOutModal(true); 
          };
          const confirmSignOut = async () => {
        
        
            try {
              dispatch(signOutUserStart())
              const res = await fetch('/backend/auth/signout');
              const data  = await res.json();
              if(data.success === false) {
                dispatch(signOutUserFailure(data.message));
                return;
              }
                dispatch(signOutUserSuccess(data));
            }catch (error){
              dispatch(signOutUserFailure(data.message));
        
            }
          }


  return (
    <div className='p-3 max-w-lg mx-auto basis-3/4 '> 

        <h1 className='text-3xl  font-semibold my-7 text-center ml-50'>Profile</h1>
        
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-96' >

        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />        
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile"
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />


        <p className="text-sm self-center">
          {fileUplardError ?
            (<span className="text-red-700">Error Image Upload(image must be less than 2mb)</span>) :
            filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) :
              filePerc === 100 ? (
                <span className="text-green-700">Image Successfully Uploaded!</span>
              ) : (
                  ''
                )}
        </p>

        <input type="text" placeholder='fullname' defaultValue={currentUser.empname} id="empname"
         className='border p-3 rounded '   onChange={handleChange} />
        <input type="text" placeholder='mobile' defaultValue={currentUser.phone_number} id="phone_number"
         className='border p-3 rounded' onChange={handleChange}/>
        <input type="email" placeholder='username' defaultValue={currentUser.username} id="username"
         className='border p-3 rounded' onChange={handleChange} />
      
        <input type="password" placeholder='password' 
        className='border p-3 rounded' id="password" onChange={handleChange}/>
        
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70'>Update</button>

  
         
        </form>

        {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-70 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg max-w-md">
            <p className="text-xl font-semibold mb-5">Confirm Account Deletion</p>
            <p className="text-gray-700 mb-5">Are you sure you want to delete your account?</p>
            <div className="flex justify-end">
              <button onClick={confirmDelete} className="bg-green-700 text-white rounded-lg px-4 py-2 mr-4">Yes</button>
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2">No</button>
            </div>
          </div>
        </div>
      )}

{showSignOutModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-70 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg max-w-md">
            <p className="text-xl font-semibold mb-5">Confirm Account SignOut</p>
            <p className="text-gray-700 mb-5">Are you sure you want to signout your account?</p>
            <div className="flex justify-end">
              <button onClick={confirmSignOut} className="bg-red-500 text-white rounded-lg px-4 py-2 mr-4">Yes</button>
              <button onClick={() => setShowSignOutModal(false)} className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2">No</button>
            </div>
          </div>
        </div>
      )}

        <div className="flex justify-between mt-5 ">

        <span onClick={handleDelete}  className="text-red-700 cursor-pointer">Delete Account</span>

        <span onClick={handleSignOut}  className="text-red-700 cursor-pointer">Sign out</span>

      </div>

      <p className="text-red-700 mt-5">{error ? error : ''}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? 'User is updated successfully!' : ''}</p>
    </div>
  )
}
