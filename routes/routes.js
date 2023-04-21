const express=require('express')
const router=express.Router();
const controllerMulter=require('../Controllers/controllerMulter')
const controller=require('../Controllers/controllerMain.js')
const waifusModel=require('../schemas/schemaWaifus.js')
const multer=require('multer')
const bodyParser=require('body-parser')

const app = express();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    cb(null, false);
  }
});


router.get('/waifus',(req,res)=>{controller.getAllWaifus(req,res)})

router.post('/waifus',controllerMulter.array('imagen'),async (req,res)=>{controller.addWaifu(req,res)})

router.put('/waifus/:id',controllerMulter.array('imagen'),async (req,res)=>{console.log('hola');controller.modifyWaifu(req,res)})

router.delete('/waifus',upload.none(),async (req,res)=>{controller.deleteWaifu(req,res)})


module.exports=router;