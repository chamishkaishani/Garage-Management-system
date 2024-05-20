import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img20 from '../components/Image/img20.jpg';
import axios from 'axios';
import { useSelector } from 'react-redux';

const tableWidth = 'w-1/4';

const back = {
  backgroundImage: `url(${img20})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '110vh',
};



export default function FirstAttendance() {
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

  const handleUserClick = (userData) => {
    setSelectedUser(userData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  


  return (
    <div className='container mx-auto mt-3 p-3'style={back}>
      <h1 className='text-3xl text-center text-amber-500 font-semibold my-7'>Attendance Form</h1>

      <table className={`table-auto ${tableWidth}  mx-auto`}>
        <thead>
          <tr>
            <th className='border border-gray-300 px-4 py-2 text-slate-100'>UserName</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((user) => (
            <tr key={user._id}>
              <td className='border border-gray-300 px-20  py-2'>
                <Link to={`mark/${user._id}`} className='text-blue-500 hover:underline'>
                  {user.username}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}












