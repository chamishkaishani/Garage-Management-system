
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';

import About from './pages/About';
import Hearder from './components/Header';
import Admin from './pages/Admin';
import Employee from './pages/Employee';
import Progresssupervisor from './pages/Progresssupervisor';
import Customer from './pages/Customer';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Customersignup from './pages/Customersignup';
import PrivateRoute from './components/PrivateRoute';
import Staffsignin from './pages/Staffsignin';
import User from './components/User';
import Admindashboard from './components/Admindashboard';
import EditUSer from './pages/EditUSer';
import Fristattendence from './components/Fristattendence';
import MarkAttedence from './components/MarkAttedence';
import EviningMark from './components/EviningMark';
import LeaveAttendence from './components/LeaveAttendence';
import AddSalary from './pages/AddSalary';
import Salary from './pages/Salary';
import Salaryreport from './pages/Salaryreport';
import Employeehistory from './pages/Employeehistory';





export default function App() {
  return (
    <BrowserRouter>

    <Hearder/>
     <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin/>} />
        
        <Route  element={<PrivateRoute />} >
         <Route path="/signup" element={<Signup/>} />
        </Route>
        

        <Route  element={<PrivateRoute />} >
           <Route path="/admin" element={<Admin />} />
        </Route>

        <Route path="/about" element={<About />} />

        <Route  element={<PrivateRoute />} >
           <Route path="/progresssupervisor" element={<Progresssupervisor />} />
        </Route>
        
        <Route  element={<PrivateRoute />} >
         <Route path="/employee" element={<Employee />} />
        </Route>

        <Route  element={<PrivateRoute />} >
         <Route path="/edituser/:id" element={<EditUSer />} />
        </Route>

       
        
         <Route  element={<PrivateRoute />} >
           <Route path="/customer" element={<Customer />} />
        </Route>
        
        <Route path="/customersignup" element={<Customersignup />} />

        <Route  element={<PrivateRoute />} >
           <Route path="/staffsignin" element={<Staffsignin />} />
        </Route>

        <Route  element={<PrivateRoute />} >
           <Route path="/user" element={<User />} />
        </Route>

        <Route  element={<PrivateRoute />} >
          <Route path="/admindashboard" element={<Admindashboard />} />
        </Route>

        <Route path="/arrival" element={<Fristattendence />} />

        <Route path="/arrival/mark/:id" element={<MarkAttedence />} />

        <Route path="/leave" element={<EviningMark />} />

        <Route path="/leave/emark/:id" element={<LeaveAttendence />} />

        <Route path="/addsalary" element={<AddSalary />} />

        {/* <Route path="/addsalary" element={<AddSalary />} /> */}

        <Route path="/addsalary/salary/:id" element={<Salary/>} />

        <Route path="/salaryreport" element={<Salaryreport />} />

        <Route path="/employeehistory" element={<Employeehistory/>}/>

        
      </Routes>
     </BrowserRouter>
  )
}
