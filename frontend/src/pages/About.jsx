import React from 'react'
import img25 from '../components/Image/img25.jpg';
import img26 from '../components/Image/img26.jpg';
import img27 from '../components/Image/img27.jpg';
import img28 from '../components/Image/img28.jpg';
import img29 from '../components/Image/img29.jpg';

export default function About() {
  return (
    <div className='container mx-auto mt-10'>
      <div className='container mx-auto mt-11'>
        <h1 className='text-3xl text-center text-amber-400 font-semibold my-7'>ABOUT US</h1>
        <p className='3xl text-center text-red-500'>
          We are here to fix the issues of your vehicle
          <div className='bg-slate-200 w-70 h-70 flex flex-row'>
          <img src={img25} alt="garage" width="250px" height="250px"className='mx-4'/>
          <img src={img26} alt="garage" width="250px" height="250px"className='mx-10'/>
          <img src={img27} alt="garage" width="250px" height="250px"className='mx-14'/>
          <img src={img28} alt="garage" width="250px" height="250px"className='mx-17'/>
          <img src={img29} alt="garage" width="250px" height="250px"className='mx-20'/>

          
          </div>
        </p>
        <div>
          <p className='4xl text-center text-black-500'>
              We are the number one of the world
          </p>
          <p className='className=4xl text-center text-black-50'>
            <ul>
              <li> Phone Number: 041-4900778</li>
              <li>email:egmotors@gmail.com.</li>
              <li>address:359/1/1,Nagahamawatha,Pelenwaththa,pannipitiya,Sri Lanka.</li>
            </ul>
            
            
            
          </p>
        </div>

      </div>
    </div>
    
  )
}
