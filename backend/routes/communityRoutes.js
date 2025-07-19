const express = require('express')
const {getAllHospitals, addComment, getCommentsByPost} = require('../controllers/communityController')
// const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/gethospitals',getAllHospitals)

router.post('/addcomment',addComment)

router.get('/getcomment/:postId', getCommentsByPost);


module.exports = router;