const router = require('express').Router()
const upCtrlr = require('../controllers/upload')
const uploadCtrlr = require('../controllers/uploads')
const multer = require('multer')

const storage = multer.diskStorage({ 
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage })
//photo is name of the input element
router.post('/', upload.single('photo'), upCtrlr.uploading)
router.post('/uploadPhotos', uploadCtrlr.uploadPhotos)


module.exports = router