import express from 'express'
import { signin } from '../controllers/userController'

const router=express.Router()

router.get('/signin',signin) 
  

  export default router