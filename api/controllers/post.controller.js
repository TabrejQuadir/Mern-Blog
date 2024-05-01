import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to create a post'));
    }
    if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, 'Please provide all required fields'));
    }
    const slug = req.body.title
      .split(' ')
<<<<<<< HEAD
      .join('-')
=======
      .join('')
>>>>>>> 946522f3b2a854422211da368690aa1f474d3713
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');
    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.id,
    });
    try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      next(error);
    }
  };