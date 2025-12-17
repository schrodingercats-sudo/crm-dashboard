import { Router } from 'express';
import { supabase } from '../database';

const router = Router();

// Get all deals
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('deals')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error fetching deals:', error);
        res.status(500).json({ error: 'Failed to fetch deals' });
    }
});

// Create a deal
router.post('/', async (req, res) => {
    const { title, company, value, stage, ownerAvatar, type, typeColor } = req.body;
    try {
        // Note: Schema uses 'owner_avatar', 'type_color'. Frontend sends 'ownerAvatar', 'typeColor'.
        const { data, error } = await supabase
            .from('deals')
            .insert({
                title,
                company,
                value,
                stage,
                owner_avatar: ownerAvatar,
                type,
                type_color: typeColor
            })
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        console.error('Error creating deal:', error);
        res.status(500).json({ error: 'Failed to create deal' });
    }
});

export default router;
