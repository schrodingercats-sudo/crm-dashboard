import express from 'express';
import cors from 'cors';

import { initializeDatabase } from './database';
import contactsRoutes from './routes/contacts.routes';
import dealsRoutes from './routes/deals.routes';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contacts', contactsRoutes);
app.use('/api/deals', dealsRoutes);

// Initialize DB and start server
initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
});
