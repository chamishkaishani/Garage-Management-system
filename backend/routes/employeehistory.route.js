import express from 'express';
import { employeehis, getAllemphistory } from '../controllers/employeehistory.controller.js';

const router = express.Router();

router.post('/employeehis',employeehis)
router.get('/getAllemphistory',getAllemphistory)

export default router;