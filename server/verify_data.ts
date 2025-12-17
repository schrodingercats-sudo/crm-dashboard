import mongoose from 'mongoose';
import Contact from './models/contact.model';
import Deal from './models/deal.model';
import dotenv from 'dotenv';

dotenv.config();

async function verify() {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/crm_db';
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        const contactCount = await Contact.countDocuments();
        console.log(`Contacts count: ${contactCount}`);

        const dealCount = await Deal.countDocuments();
        console.log(`Deals count: ${dealCount}`);

        if (contactCount > 0 && dealCount > 0) {
            console.log('Verification SUCCESS: Data exists in MongoDB.');
        } else {
            console.log('Verification WARNING: Data missing or empty.');
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error('Verification FAILED:', error);
        process.exit(1);
    }
}

verify();
