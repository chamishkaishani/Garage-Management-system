import express from 'express';
import { createIssue } from '../controllers/issues.controller.js';

const router = express.Router();

 
router.post('/createIssue',createIssue);

export default router;