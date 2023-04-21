const express=require('express');
const multer=require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        switch (file.mimetype) {
            case 'image/jpg':
                cb(null, `${Date.now()}.jpg`);
            break;
            case 'image/jpeg':
                cb(null, `${Date.now()}.jpeg`);
            break;
            case 'image/png':
                cb(null, `${Date.now()}.png`);
            break;
            case 'image/gif':
                cb(null, `${Date.now()}.gif`);
            break;
            default:
            return cb(new Error('Solo se permiten archivos JPG,JPEG,PNG,GIF'));
        }
      
    }
  });
  
  const upload = multer({ storage});

  module.exports=upload;
  

