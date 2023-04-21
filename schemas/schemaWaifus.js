const mongoose=require('mongoose')

const waifusSchema = new mongoose.Schema({
    nombre: String,
    info: String,
    imagen: String
  });
  
  
  const waifusModel = mongoose.model('waifus', waifusSchema);


module.exports=waifusModel;