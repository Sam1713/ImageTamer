import express from 'express'
import { deleteImage, homePage, postImages, rearrangeImages } from '../controllers/userController'
import { verifyUser } from '../middleware/verifyUser'
import upload from '../utils/multer';

const router=express.Router()

router.get('/home', verifyUser('user'), homePage); 
router.post('/postImages',verifyUser('user'),upload.array('files'),postImages)
router.put('/reorder',verifyUser('user'),upload.array('none'),rearrangeImages)
router.delete('/deleteImage/:id',verifyUser('user'),deleteImage)
  

  export default router