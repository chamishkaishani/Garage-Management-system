import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import img4 from '../components/Image/img4.jpg'

const back = {
  backgroundImage: `url(${img4})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '110vh',
};

const styles = {
 container: {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    height: '100%', 
    overflow: 'auto', 
  },
  tableContainer: {
    width: '100%%', 
    margin: '20px auto', 
    overflowX: 'auto', 
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    position: 'sticky',
    top: 0,
    background: '#f2f2f2',
    zIndex: 1,
  },
  td: {
    display: 'flex',
    gap: '5px',
  },
};

const User = () => {
  const [users, setUsers] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5173/backend/user/getall");
        setUsers(response.data);
        setFilterData(response.data); // Update filterdata state here
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const getSearch = event.target.value.toLowerCase();
  setQuery(getSearch);

  if (getSearch.length > 0) {
    const searchData = filterdata.filter((item) => item.username.toLowerCase().includes(getSearch));
    setUsers(searchData);
  } else {
    setUsers(filterdata);
  }
  };

  const deleteUser2 = async (userId) => {
    await axios.delete(`http://localhost:5173/backend/user/delete2/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='row mt-3'>
      <div className='col-md-12 mt-3 mb-3'>
        
        <div className='col-md-6'>
          <input type="text" name='email' value={query} className='form.control' onChange={(e) => handleSearch(e)} placeholder='search email' />
        </div>
      </div>
      <div style={styles.tableContainer}>
        <table hoverable className='mt-5 shadow-md' style={styles.table} border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th style={styles.th}>Emp_no</th>
              <th style={styles.th}>Emp_name</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.empname}</td>
                <td>{user.phone_number}</td>
                <td>{user.username}</td>
                <td style={styles.td}>
                  <button className='text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 bg-red-500' onClick={() => deleteUser2(user._id)}>Delete</button>
                  <Link to={`/edituser/${user._id}`}>
                    <button className='bg-green-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function Employee() {
  return (
    <div style={styles.container} className='bg-blue-200' >
      <Link to="/signup">
        <button className='bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>+ Add Employee</button>
      </Link>
      <User />
    </div>
  );
}


