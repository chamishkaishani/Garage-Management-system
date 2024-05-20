import express from 'express';
import { deleteCustomer, deleteUser, deleteUser2, getAll, getOne, test, update, updateCustomer, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


  const router = express.Router();

  router.get('/test',test); 
  router.post('/update/:id',verifyToken,updateCustomer); 
  router.delete('/delete/:id',verifyToken,deleteCustomer); 
  router.post('/updatestaff/:id',verifyToken,updateUser); 
  router.delete('/deletestaff/:id',verifyToken,deleteUser); 
  router.get("/getall",getAll);
  router.get("/getone/:id",getOne);
  router.put("/update2/:id",update);
  router.delete("/delete2/:id",deleteUser2);



    export default router;
