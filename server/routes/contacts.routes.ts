import { Router } from 'express';
import { supabase } from '../database';

const router = Router();

// Get all contacts
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('contacts')
            .select('*, lead_owners(*)')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Map snake_case database fields to camelCase if frontend expects it, 
        // or just return as is matching schema.sql columns.
        // Frontend likely expects nested leadOwners from previous Mongoose structure.
        // In schema.sql: lead_owners table has contact_id.
        // Supabase select with join returns data nested.

        // Transforming response to match likely frontend expectation if needed,
        // but typically Supabase returns `lead_owners: [...]`. 
        // We'll keep it simple for now or transform if verified frontend breaks.
        res.json(data);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
});

// Create a contact
router.post('/', async (req, res) => {
    const { name, avatar, email, phone, purpose, amount, progress, stage, leadOwners } = req.body;
    try {
        // Insert Contact
        const { data: contact, error: contactError } = await supabase
            .from('contacts')
            .insert({
                name,
                avatar,
                email,
                phone,
                purpose,
                amount,
                progress,
                stage
            })
            .select()
            .single();

        if (contactError) throw contactError;

        // Insert Lead Owners if any
        if (leadOwners && Array.isArray(leadOwners) && leadOwners.length > 0) {
            const ownersToInsert = leadOwners.map((owner: any) => ({
                contact_id: contact.id,
                name: owner.name,
                avatar: owner.avatar
            }));

            const { error: ownersError } = await supabase
                .from('lead_owners')
                .insert(ownersToInsert);

            if (ownersError) console.error('Error inserting owners:', ownersError);
        }

        // Return complete object
        const { data: newContact, error: fetchError } = await supabase
            .from('contacts')
            .select('*, lead_owners(*)')
            .eq('id', contact.id)
            .single();

        if (fetchError) throw fetchError;

        res.status(201).json(newContact);
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ error: 'Failed to create contact' });
    }
});

export default router;
