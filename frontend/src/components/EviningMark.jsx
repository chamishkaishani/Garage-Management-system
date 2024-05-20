import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import img10 from '../components/Image/img10.jpg'
import { FaTrash } from 'react-icons/fa';

const tableWidth = 'w-2/4';


const back = {
  backgroundImage: `url(${img10})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '110vh',
};




export default function EviningMark() {


 const [formData, setFormData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/backend/attendence/getAllAttendance');
        setFormData(res.data);
 
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);


  const deleteStatus = async (id) => {
    try {
      const res = await fetch(`/backend/attendence/deleteattendence/${id}`, {
        method: 'DELETE',
      });

      setFormData(formData.filter((issue) => issue._id !== id));
      alert('Successfully deleted');
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='container mx-auto mt-10 p-3'style={back}>
      <h1 className='text-3xl text-center  text-amber-500 font-semibold my-7'>Attendance List</h1>

      <table className={`table-auto ${tableWidth}  mx-auto 'border-3 border-black' `}>
        <thead>
          <tr>
            <th className='border border-gray-300 px-4 py-2 bg-slate-700 text-slate-200'>UserName</th>
            <th className='border border-gray-300 px-4 py-2 bg-slate-700  text-slate-200'>Action</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((user) => (
            <tr key={user._id}>
              <td className='border border-gray-300 px-4 py-2 bg-slate-400'>{user.username}</td>
              <td className='border border-gray-300 px-4 py-2  bg-slate-400'>
                <div className='flex items-center justify-center'>
                  <button onClick={() => deleteStatus(user._id)} className='text-red-500'>
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
);
}
