import { Sidebar } from 'flowbite-react';
import { HiDocument, HiOutlineExclamationCircle, HiUser } from 'react-icons/hi';
import { FaMale, FaQrcode } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Admindashboard() {
  return (
    <Sidebar className='flex flex-col gap-4 bg-slate-900 w-50'> 
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/employee'>
            <Sidebar.Item className='flex items-center border bg-slate-500 hover:bg-blue-600 text-white rounded-md p-3 cursor-pointer'>
              <div className='flex flex-row'><FaMale className='mr-2 my-1' />Manage Employee</div> {/* Adjust margin-right for icon spacing */}
              
            </Sidebar.Item>
          </Link>
          <Link to='/leave'>
            <Sidebar.Item   className='flex items-center border bg-slate-500 hover:bg-green-600 text-white rounded-md p-3 cursor-pointer'>
             <div className='flex flex-row me-12'><FaQrcode className='mr-2 my-1 ' /> Attendance</div>  {/* Adjust margin-right for icon spacing */}
             
            </Sidebar.Item>
          </Link>
          <Link to='/salaryreport'>
            <Sidebar.Item className='flex items-center border bg-slate-500 hover:bg-yellow-600 text-white rounded-md p-3 cursor-pointer'>
              <div className='flex flex-row me-9'><HiDocument className='mr-2 my-1' /> Salary reports</div> {/* Adjust margin-right for icon spacing */}
              
            </Sidebar.Item>
          </Link>
          <Link to='/addsalary'>
            <Sidebar.Item  className='flex items-center border bg-slate-500 hover:bg-red-600 text-white rounded-md p-3 cursor-pointer'>
             <div className='flex flex-row me-14'><HiUser className='mr-2 my-1' />Add salary</div>  {/* Adjust margin-right for icon spacing */}
              
            </Sidebar.Item>
          </Link>  
          <Link to='/arrival'>
            <Sidebar.Item  className='flex items-center border bg-slate-500 hover:bg-blue-600 text-white rounded-md p-3 cursor-pointer'>
              <div className='flex flex-row me-3 '><FaQrcode className='mr-2 my-1' />Mark Attendance</div> {/* Adjust margin-right for icon spacing */}
              
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
