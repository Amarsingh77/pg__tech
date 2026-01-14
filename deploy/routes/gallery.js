import express from 'express';
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from '../controllers/galleryController.js';
import { protect, authorize } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.route('/')
    .get(getGalleryImages)
    .post(protect, authorize('admin', 'super_admin'), upload.single('image'), addGalleryImage);

router.route('/:id')
    .delete(protect, authorize('admin', 'super_admin'), deleteGalleryImage);

export default router;
