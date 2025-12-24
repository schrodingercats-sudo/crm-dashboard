import { Router } from 'express';
import { supabase } from '../database';

const router = Router();

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Create a task
router.post('/', async (req, res) => {
    const { title, description, dueDate, priority, status, assignee } = req.body;
    try {
        const { data, error } = await supabase
            .from('tasks') // Ensure 'tasks' table exists in Supabase
            .insert({ title, description, due_date: dueDate, priority, status, assignee })
            .select()
            .single();

        if (error) throw error;

        // Map back to frontend expected format if needed, but for now assuming direct mapping or frontend handles snake_case if we change it.
        // Actually, let's map it to match frontend interace:
        // Frontend: dueDate -> Backend: due_date
        const newTask = {
            ...data,
            dueDate: data.due_date
        };

        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

export default router;
