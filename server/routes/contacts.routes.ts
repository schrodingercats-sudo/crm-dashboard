import { Router } from 'express';
import { getDb } from '../database';

const router = Router();

// Get all contacts
router.get('/', async (req, res) => {
    try {
        const db = getDb();
        const contacts = await db.all('SELECT * FROM contacts');

        // Fetch owners for each contact
        for (const contact of contacts) {
            const owners = await db.all('SELECT name, avatar FROM lead_owners WHERE contact_id = ?', [contact.id]);
            contact.leadOwners = owners;
        }

        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
});

// Create a contact
router.post('/', async (req, res) => {
    const { name, avatar, email, phone, purpose, amount, progress, stage, leadOwners } = req.body;
    try {
        const db = getDb();
        const result = await db.run(
            'INSERT INTO contacts (name, avatar, email, phone, purpose, amount, progress, stage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, avatar, email, phone, purpose, amount, progress, stage]
        );
        const id = result.lastID;

        if (leadOwners && Array.isArray(leadOwners)) {
            for (const owner of leadOwners) {
                await db.run('INSERT INTO lead_owners (contact_id, name, avatar) VALUES (?, ?, ?)', [id, owner.name, owner.avatar]);
            }
        }

        const newContact = await db.get('SELECT * FROM contacts WHERE id = ?', [id]);
        newContact.leadOwners = leadOwners || [];
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create contact' });
    }
});

export default router;
