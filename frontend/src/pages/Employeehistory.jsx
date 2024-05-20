import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img24 from '../components/Image/img24.jpg';

const tableWidth = 'w-3/4';

const back = {
    backgroundImage: `url(${img24})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '110vh',
  };




   export default function Employeehistory() {
    const [formData, setFormData] = useState([]);
    const [error, setError] = useState([null]);
    const [loading, setloading] = useState(false)
   
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setloading(true);
          const response = await axios.get("http://localhost:5173/backend/employeehistory/getAllemphistory");
          setFormData(response.data);
          setloading(false); 
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error.message);
          setloading(false);
        }
      };
      fetchData();
    }, []);

    return(
        <div className='container mx-auto mt-10'style={back}>
            <h1 className='text-3xl text-center text-amber-400 font-semibold my-7'>Employee History</h1>
            <table className={`table-auto ${tableWidth}border-3 border-black my-50 mx-96`}>
                <thead>
                <tr className='bg-gray-100'>
                    
                    <th className='border border-gray-800 px-4 py-2  bg-slate-600'>Emp_name</th>
                    <th className='border border-gray-800 px-4 py-2  bg-slate-600'>Phone</th>
                    <th className='border border-gray-800 px-4 py-2  bg-slate-600'>Email</th>
                    
                    
                </tr>
                </thead>
                <tbody>
                    {formData.map((employeehistory) =>(
                        <tr key={employeehistory._id}>
                            <td className='border border-gray-600 px-4 py-2 bg-slate-200 text-slate-900 font-semibold'>{employeehistory.empname}</td>
                            <td className='border border-gray-600 px-4 py-2  bg-slate-200 text-slate-900 font-semibold'>{employeehistory.phone_number}</td>
                            <td className='border border-gray-600 px-4 py-2  bg-slate-200 text-slate-900 font-semibold'>{employeehistory.username}</td>
                            
                            <td></td>

                        </tr>

                    ))}
                </tbody>
            </table>

        </div>
    )
}




