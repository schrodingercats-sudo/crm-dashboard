import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_KEY environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function initializeDatabase() {
    console.log('Initializing Supabase connection...');

    // Check if contacts table has data
    const { count, error } = await supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error('Error checking contacts:', error);
        return;
    }

    if (count === 0) {
        console.log('Seeding contacts...');
        const contacts = [
            { name: 'Jenny Wilson', avatar: 'https://i.pravatar.cc/40?u=jenny.wilson', email: 'jenny.wilson@gmail.com', phone: '(603) 555-0123', purpose: 'Home Loan', amount: 978878, progress: 70, stage: 'New' },
            { name: 'Eleanor Pena', avatar: 'https://i.pravatar.cc/40?u=eleanor.pena', email: 'eleanor.pena@gmail.com', phone: '(208) 555-0112', purpose: 'Gold Loan', amount: 9878, progress: 20, stage: 'In progress' },
            { name: 'Jane Cooper', avatar: 'https://i.pravatar.cc/40?u=jane.cooper', email: 'jane.cooper@gmail.com', phone: '(205) 555-0100', purpose: 'Business Loan', amount: 43532, progress: 45, stage: 'Loan Granted' },
            { name: 'Imalia Jones', avatar: 'https://i.pravatar.cc/40?u=imalia.jones', email: 'imalia.jones@gmail.com', phone: '(201) 555-0124', purpose: 'Property Loan', amount: 978878, progress: 96, stage: 'In progress' },
            { name: 'Linda Miles', avatar: 'https://i.pravatar.cc/40?u=linda.miles', email: 'linda.miles@gmail.com', phone: '(307) 555-0153', purpose: 'Education Loan', amount: 9878, progress: 50, stage: 'New' },
            { name: 'Bella Sanders', avatar: 'https://i.pravatar.cc/40?u=bella.sanders', email: 'bella.sanders@gmail.com', phone: '(907) 555-0101', purpose: 'Gold Loan', amount: 13324, progress: 42, stage: 'Loan Granted' },
            { name: 'Jacob Jones', avatar: 'https://i.pravatar.cc/40?u=jacob.jones', email: 'jacob.jones@gmail.com', phone: '(907) 555-0101', purpose: 'Home Loan', amount: 13324, progress: 56, stage: 'New' },
            { name: 'John Doe', avatar: '', email: 'john.doe@example.com', phone: '(555) 555-0200', purpose: 'Car Loan', amount: 25000, progress: 80, stage: 'In progress' },
            { name: 'Alice Smith', avatar: '', email: 'alice.smith@example.com', phone: '(555) 555-0201', purpose: 'Personal Loan', amount: 15000, progress: 90, stage: 'Loan Granted' },
        ];

        // Insert contacts one by one to get IDs for lead owners
        // Note: For bulk insert we'd need to handle relations differently or use a stored procedure, 
        // but for seeding this loop is fine.
        for (const contact of contacts) {
            const { data, error: insertError } = await supabase
                .from('contacts')
                .insert(contact)
                .select()
                .single();

            if (insertError) {
                console.error('Error inserting contact:', insertError);
                continue;
            }

            // Add some dummy lead owners
            // Logic to mimic previous random/hardcoded assignments could go here if tables set up.
            // For now, keeping it simple as schema supports it.
        }

        // Generate more dummy contacts
        const purposes = ['Home Loan', 'Gold Loan', 'Business Loan', 'Property Loan', 'Education Loan', 'Car Loan', 'Personal Loan'];
        const stages = ['New', 'In progress', 'Loan Granted'];
        const extraContacts = [];

        for (let i = 10; i <= 60; i++) {
            const purpose = purposes[Math.floor(Math.random() * purposes.length)];
            const stage = stages[Math.floor(Math.random() * stages.length)];
            const progress = Math.floor(Math.random() * 100);
            const amount = Math.floor(Math.random() * 100000) + 5000;

            extraContacts.push({
                name: `Contact ${i}`,
                avatar: `https://i.pravatar.cc/40?u=${i}`,
                email: `contact${i}@example.com`,
                phone: `(555) 555-${1000 + i}`,
                purpose,
                amount,
                progress,
                stage
            });
        }

        const { error: bulkError } = await supabase.from('contacts').insert(extraContacts);
        if (bulkError) console.error('Error bulk seeding contacts:', bulkError);
    }

    // Check Deals
    const { count: dealCount, error: dealError } = await supabase
        .from('deals')
        .select('*', { count: 'exact', head: true });

    if (!dealError && dealCount === 0) {
        console.log('Seeding deals...');
        const deals = [
            { title: 'Acme Corp License', company: 'Acme Corporation', value: 12000, stage: 'New', owner_avatar: 'https://i.pravatar.cc/150?u=1', type: 'Software', type_color: 'bg-blue-100 text-blue-800' },
            { title: 'Website Redesign', company: 'Stark Industries', value: 25000, stage: 'New', owner_avatar: 'https://i.pravatar.cc/150?u=2', type: 'Service', type_color: 'bg-purple-100 text-purple-800' },
            { title: 'Q4 Strategy', company: 'Wayne Enterprises', value: 8500, stage: 'New', owner_avatar: 'https://i.pravatar.cc/150?u=3', type: 'Consulting', type_color: 'bg-green-100 text-green-800' },
            { title: 'Enterprise Plan', company: 'Cyberdyne Systems', value: 50000, stage: 'Negotiation', owner_avatar: 'https://i.pravatar.cc/150?u=4', type: 'Software', type_color: 'bg-blue-100 text-blue-800' },
            { title: 'Staff Training', company: 'Umbrella Corp', value: 5000, stage: 'Negotiation', owner_avatar: 'https://i.pravatar.cc/150?u=5', type: 'Training', type_color: 'bg-yellow-100 text-yellow-800' },
            { title: 'Cloud Migration', company: 'Massive Dynamic', value: 120000, stage: 'Won', owner_avatar: 'https://i.pravatar.cc/150?u=6', type: 'Software', type_color: 'bg-blue-100 text-blue-800' },
        ];

        await supabase.from('deals').insert(deals);

        // More dummy deals...
        const dealStages = ['New', 'Negotiation', 'Won', 'Lost'];
        const dealTypes = ['Software', 'Service', 'Consulting', 'Training'];
        const typeColors = ['bg-blue-100 text-blue-800', 'bg-purple-100 text-purple-800', 'bg-green-100 text-green-800', 'bg-yellow-100 text-yellow-800'];
        const extraDeals = [];

        for (let i = 1; i <= 20; i++) {
            const stage = dealStages[Math.floor(Math.random() * dealStages.length)];
            const typeIndex = Math.floor(Math.random() * dealTypes.length);
            const type = dealTypes[typeIndex];
            const typeColor = typeColors[typeIndex];
            const value = Math.floor(Math.random() * 50000) + 1000;

            extraDeals.push({
                title: `Deal ${i}`,
                company: `Company ${i}`,
                value,
                stage,
                owner_avatar: `https://i.pravatar.cc/150?u=${i + 100}`,
                type,
                type_color: typeColor
            });
        }
        await supabase.from('deals').insert(extraDeals);
    }
}
