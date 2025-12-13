import { Router } from 'express';
import { getDb } from '../database';

const router = Router();

// Get all deals
router.get('/', async (req, res) => {
    try {
        const db = getDb();
        const deals = await db.all('SELECT * FROM deals');
        res.json(deals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch deals' });
    }
});

// Create a deal
router.post('/', async (req, res) => {
    const { title, company, value, stage, ownerAvatar, type, typeColor } = req.body;
    try {
        const db = getDb();
        const result = await db.run(
            'INSERT INTO deals (title, company, value, stage, ownerAvatar, type, typeColor) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, company, value, stage, ownerAvatar, type, typeColor]
        );
        const id = result.lastID;
        const newDeal = await db.get('SELECT * FROM deals WHERE id = ?', [id]);
        res.status(201).json(newDeal);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create deal' });
    }
});

export default router;
