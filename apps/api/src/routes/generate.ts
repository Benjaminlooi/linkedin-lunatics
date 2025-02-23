import { Router } from 'express';
import { generateLinkedInPost } from '../services/openai';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const generatedPost = await generateLinkedInPost(content);
    res.json({ post: generatedPost });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate post' });
  }
});

export default router; 