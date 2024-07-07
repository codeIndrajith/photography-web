import express from 'express';
import { registerPhClub } from '../controllers/phClubController.js';
import { authPhClub } from '../controllers/phClubController.js';
const router = express.Router();

router.post('/', registerPhClub);
router.post('/phClub-auth', authPhClub);

export default router;
