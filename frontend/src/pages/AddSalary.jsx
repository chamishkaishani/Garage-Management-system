import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import img18 from '../components/Image/img18.jpeg'
import { useSelector } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import Admindashboard from '../components/Admindashboard';

const tableWidth = 'w-3/4';

const back = {
  backgroundImage: `url(${img18})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '110vh',
};

export default function AddSalary() {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // To store the selected user data
  
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await axios.get('http://localhost:5173/backend/employee/getAllemp');
          setFormData(res.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error.message);
          setLoading(false);
        }
      };
      fetchData();
    }, []);
  
    
  
  
    return (
      
       <div className='flex mx-auto bg-slate-500' style={back}> 

      <div className='' >
        <div className='w-72' style={{height:'750px'}}>< Admindashboard /></div>
      </div>
      
<div className='justify-between  mx-96 gap-6'>
        <h1 className='text-2xl text-center text-amber-400 font-semibold my-7'>Add Salary</h1>
  
        <table className={`table-auto ${tableWidth}  mx-auto 'border-3 border-black' `}>
          <thead>
            <tr>
              <th className='border border-gray-800 px-4 py-2 bg-slate-400'>UserName</th>
              <th className='border border-gray-800 px-4 py-2 bg-slate-400'>Action</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((user) => (
              <tr key={user._id}>
                <td className='border border-gray-800 px-4 py-2 bg-slate-300'>{user.username}</td>
               <td className='text-green-700 border border-gray-800 px-4 py-2 bg-slate-300'><Link to={`salary/${user._id}`}><FaEdit/></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
  
        </div>
      </div>
    );
  }
  