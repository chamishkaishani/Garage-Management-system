import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img12 from '../components/Image/img12.jpg';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
import jsPdf from 'jspdf';
import 'jspdf-autotable';
import logo from '../components/Image/logo.png'
import Admindashboard from '../components/Admindashboard';

const tableWidth = 'w-2/4';

const back = {
    backgroundImage: `url(${img12})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '110vh',
  };

export default function Salaryreport() {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); 
    const [totalSalary, setTotalSalary] = useState(0);

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
    const deleteemp = async (id) => {
        try {
          const res = await fetch(`/backend/employee/deleteEmpsalary/${id}`, {
            method: 'DELETE',
          });
    
          setFormData(formData.filter((issue) => issue._id !== id));
          alert('Successfully deleted');

        } catch (error) {
          console.log(error.message);
        }
      };

    useEffect(() => {
       
        const calculateTotalSalary = () => {
            let total = 0;
            formData.forEach(user => {
                total += user.day * user.perdaysalary;
            });
            setTotalSalary(total);
        };

        calculateTotalSalary();
    }, [formData]);

    function handleDownload() {
        const doc = new jsPdf();
        const marginLeft = 40;

        doc.setDrawColor(0);
        doc.setLineWidth(2);
        doc.roundedRect(10, 20, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 40, 10, 10, 'D');

        doc.setFontSize(15);
        doc.text('Salary Report', 90, 35);

        const headers = [['UserName', 'Days', 'PerDay Salary', 'Salary']];
        const data = formData.map((item) => [
            item.username,
            item.day,
            item.perdaysalary,
            item.day * item.perdaysalary,
        ]);

        const columnStyles = {
          0: { columnWidth: 55 }, 
          1: { columnWidth: 40 }, 
          2: { columnWidth: 40 }, 
          3: { columnWidth: 45 }, 
      };
     
      const end = `Total Pay: ${totalSalary}`;


        doc.autoTable({
            startY: 50,
            head: headers,
            body: data,
            columnStyles: columnStyles, 

        });

       
        doc.addImage(logo, 'PNG', 85, 180, 50, 50);
        doc.text(end,marginLeft, 270)

        doc.save('Salary Report.pdf');
    }

    return (
        <div style={back}>
            <div className='container mx-auto mt-10 bg-transparent'>
            <h1 className='text-3xl text-center text-amber-400 font-semibold my-7'>Salary Report</h1>
            <table className={`table-auto ${tableWidth}  mx-auto 'border-3 border-black' `}>
            <thead>
                <tr className='bg-gray-100'>
                    <th className='border border-gray-600 px-4 py-2 bg-slate-600'>UserName</th>
                    <th className='border border-gray-600 px-4 py-2  bg-slate-600'>Days</th>
                    <th className='border border-gray-600 px-4 py-2  bg-slate-600'>Per day Salary</th>
                    <th className='border border-gray-600 px-4 py-2  bg-slate-600'>Salary</th>
                    <th className='border border-gray-600 px-4 py-2  bg-slate-600'>Action</th>

                </tr>
            </thead>
            <tbody>
                {formData.map((user) => (
                    <tr key={user._id}>
                        <td className='border border-gray-600 px-4 py-2  text-slate-200 font-semibold'>{user.username}</td>
                        <td className='border border-gray-600 px-4 py-2  text-slate-200 font-semibold'>{user.day}</td>
                        <td className='border border-gray-600 px-4 py-2  text-slate-200 font-semibold'>{user.perdaysalary}</td>
                        <td className='border border-gray-600 px-4 py-2  text-slate-200 font-semibold'>{user.day * user.perdaysalary}</td>
                        <td className='border border-gray-600 px-4 py-2  text-slate-200 font-semibold'><div className='m-4 text-red-500'><button onClick={() => deleteemp(user._id)}><FaTrash/></button></div></td>
                    </tr>
                ))}
            </tbody>
            <tr className='border border-gray-600 px-4 py-2'>
                <td colSpan="3" className='text-right font-semibold text-amber-500'>Total Pay:</td>
                <td className='border border-gray-600 px-4 py-2  text-amber-500'>{totalSalary}</td>
            </tr>
        </table>
        <div className='mt-4 text-center'>
            <button onClick={handleDownload} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                Download Report
            </button>
        </div>
    </div></div>
        
    );
}
