import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database;

export async function initializeDatabase() {
    db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    await db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avatar TEXT,
      email TEXT,
      phone TEXT,
      purpose TEXT,
      amount REAL,
      progress INTEGER,
      stage TEXT
    );

    CREATE TABLE IF NOT EXISTS lead_owners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contact_id INTEGER,
      name TEXT,
      avatar TEXT,
      FOREIGN KEY(contact_id) REFERENCES contacts(id)
    );

    CREATE TABLE IF NOT EXISTS deals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      company TEXT,
      value REAL,
      stage TEXT,
      ownerAvatar TEXT,
      type TEXT,
      typeColor TEXT
    );
  `);

    // Seed data if empty or low count
    const contactCount = await db.get('SELECT COUNT(*) as count FROM contacts');
    if (contactCount.count < 20) {
        console.log('Seeding contacts...');
        const contacts = [
            { name: 'Jenny Wilson', avatar: 'https://i.pravatar.cc/40?u=jenny.wilson', email: 'jenny.wilson@gmail.com', phone: '(603) 555-0123', purpose: 'Home Loan', amount: 978878, progress: 70, stage: 'New', owners: [{ name: 'A', avatar: 'https://i.pravatar.cc/40?u=owner1' }, { name: 'B', avatar: 'https://i.pravatar.cc/40?u=owner2' }] },
            { name: 'Eleanor Pena', avatar: 'https://i.pravatar.cc/40?u=eleanor.pena', email: 'eleanor.pena@gmail.com', phone: '(208) 555-0112', purpose: 'Gold Loan', amount: 9878, progress: 20, stage: 'In progress', owners: [{ name: 'C', avatar: 'https://i.pravatar.cc/40?u=owner3' }, { name: 'D', avatar: 'https://i.pravatar.cc/40?u=owner4' }, { name: 'E', avatar: 'https://i.pravatar.cc/40?u=owner5' }] },
            { name: 'Jane Cooper', avatar: 'https://i.pravatar.cc/40?u=jane.cooper', email: 'jane.cooper@gmail.com', phone: '(205) 555-0100', purpose: 'Business Loan', amount: 43532, progress: 45, stage: 'Loan Granted', owners: [{ name: 'F', avatar: 'https://i.pravatar.cc/40?u=owner6' }, { name: 'G', avatar: 'https://i.pravatar.cc/40?u=owner7' }] },
            { name: 'Imalia Jones', avatar: 'https://i.pravatar.cc/40?u=imalia.jones', email: 'imalia.jones@gmail.com', phone: '(201) 555-0124', purpose: 'Property Loan', amount: 978878, progress: 96, stage: 'In progress', owners: [{ name: 'H', avatar: 'https://i.pravatar.cc/40?u=owner8' }] },
            { name: 'Linda Miles', avatar: 'https://i.pravatar.cc/40?u=linda.miles', email: 'linda.miles@gmail.com', phone: '(307) 555-0153', purpose: 'Education Loan', amount: 9878, progress: 50, stage: 'New', owners: [{ name: 'I', avatar: 'https://i.pravatar.cc/40?u=owner9' }, { name: 'J', avatar: 'https://i.pravatar.cc/40?u=owner10' }] },
            { name: 'Bella Sanders', avatar: 'https://i.pravatar.cc/40?u=bella.sanders', email: 'bella.sanders@gmail.com', phone: '(907) 555-0101', purpose: 'Gold Loan', amount: 13324, progress: 42, stage: 'Loan Granted', owners: [{ name: 'K', avatar: 'https://i.pravatar.cc/40?u=owner11' }] },
            { name: 'Jacob Jones', avatar: 'https://i.pravatar.cc/40?u=jacob.jones', email: 'jacob.jones@gmail.com', phone: '(907) 555-0101', purpose: 'Home Loan', amount: 13324, progress: 56, stage: 'New', owners: [{ name: 'L', avatar: 'https://i.pravatar.cc/40?u=owner12' }, { name: 'M', avatar: 'https://i.pravatar.cc/40?u=owner13' }] },
            { name: 'John Doe', avatar: '', email: 'john.doe@example.com', phone: '(555) 555-0200', purpose: 'Car Loan', amount: 25000, progress: 80, stage: 'In progress', owners: [] },
            { name: 'Alice Smith', avatar: '', email: 'alice.smith@example.com', phone: '(555) 555-0201', purpose: 'Personal Loan', amount: 15000, progress: 90, stage: 'Loan Granted', owners: [] },
        ];

        for (const contact of contacts) {
            const result = await db.run(
                'INSERT INTO contacts (name, avatar, email, phone, purpose, amount, progress, stage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [contact.name, contact.avatar, contact.email, contact.phone, contact.purpose, contact.amount, contact.progress, contact.stage]
            );
            const contactId = result.lastID;
            if (contactId) {
                for (const owner of contact.owners) {
                    await db.run('INSERT INTO lead_owners (contact_id, name, avatar) VALUES (?, ?, ?)', [contactId, owner.name, owner.avatar]);
                }
            }
        }

        // Generate more dummy contacts
        const purposes = ['Home Loan', 'Gold Loan', 'Business Loan', 'Property Loan', 'Education Loan', 'Car Loan', 'Personal Loan'];
        const stages = ['New', 'In progress', 'Loan Granted'];

        for (let i = 10; i <= 60; i++) {
            const purpose = purposes[Math.floor(Math.random() * purposes.length)];
            const stage = stages[Math.floor(Math.random() * stages.length)];
            const progress = Math.floor(Math.random() * 100);
            const amount = Math.floor(Math.random() * 100000) + 5000;

            const result = await db.run(
                'INSERT INTO contacts (name, avatar, email, phone, purpose, amount, progress, stage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [`Contact ${i}`, `https://i.pravatar.cc/40?u=${i}`, `contact${i}@example.com`, `(555) 555-${1000 + i}`, purpose, amount, progress, stage]
            );
        }
    }

    const dealCount = await db.get('SELECT COUNT(*) as count FROM deals');
    if (dealCount.count < 10) {
        console.log('Seeding deals...');
        const deals = [
            { title: 'Acme Corp License', company: 'Acme Corporation', value: 12000, stage: 'New', ownerAvatar: 'https://i.pravatar.cc/150?u=1', type: 'Software', typeColor: 'bg-blue-100 text-blue-800' },
            { title: 'Website Redesign', company: 'Stark Industries', value: 25000, stage: 'New', ownerAvatar: 'https://i.pravatar.cc/150?u=2', type: 'Service', typeColor: 'bg-purple-100 text-purple-800' },
            { title: 'Q4 Strategy', company: 'Wayne Enterprises', value: 8500, stage: 'New', ownerAvatar: 'https://i.pravatar.cc/150?u=3', type: 'Consulting', typeColor: 'bg-green-100 text-green-800' },
            { title: 'Enterprise Plan', company: 'Cyberdyne Systems', value: 50000, stage: 'Negotiation', ownerAvatar: 'https://i.pravatar.cc/150?u=4', type: 'Software', typeColor: 'bg-blue-100 text-blue-800' },
            { title: 'Staff Training', company: 'Umbrella Corp', value: 5000, stage: 'Negotiation', ownerAvatar: 'https://i.pravatar.cc/150?u=5', type: 'Training', typeColor: 'bg-yellow-100 text-yellow-800' },
            { title: 'Cloud Migration', company: 'Massive Dynamic', value: 120000, stage: 'Won', ownerAvatar: 'https://i.pravatar.cc/150?u=6', type: 'Software', typeColor: 'bg-blue-100 text-blue-800' },
        ];

        for (const deal of deals) {
            await db.run(
                'INSERT INTO deals (title, company, value, stage, ownerAvatar, type, typeColor) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [deal.title, deal.company, deal.value, deal.stage, deal.ownerAvatar, deal.type, deal.typeColor]
            );
        }

        // Generate more dummy deals
        const dealStages = ['New', 'Negotiation', 'Won', 'Lost'];
        const dealTypes = ['Software', 'Service', 'Consulting', 'Training'];
        const typeColors = ['bg-blue-100 text-blue-800', 'bg-purple-100 text-purple-800', 'bg-green-100 text-green-800', 'bg-yellow-100 text-yellow-800'];

        for (let i = 1; i <= 20; i++) {
            const stage = dealStages[Math.floor(Math.random() * dealStages.length)];
            const typeIndex = Math.floor(Math.random() * dealTypes.length);
            const type = dealTypes[typeIndex];
            const typeColor = typeColors[typeIndex];
            const value = Math.floor(Math.random() * 50000) + 1000;

            await db.run(
                'INSERT INTO deals (title, company, value, stage, ownerAvatar, type, typeColor) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [`Deal ${i}`, `Company ${i}`, value, stage, `https://i.pravatar.cc/150?u=${i + 100}`, type, typeColor]
            );
        }
    }
}

export function getDb() {
    if (!db) {
        throw new Error('Database not initialized');
    }
    return db;
}
