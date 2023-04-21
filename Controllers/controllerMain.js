const express=require('express');
const mongoose=require('mongoose')
const waifusModel=require('../schemas/schemaWaifus.js')
const multer=require('multer');

//MULTER

//POST AÑADIR WAIFU     REQUIERE ID
module.exports.addWaifu=async(req,res)=>{
try {
  var URLcompleta=`${req.protocol}://${req.hostname}:${process.env.PORT}`
  const newWaifus = new waifusModel({
  nombre: req.body.nombre,
  info:req.body.info,
  imagen: `${URLcompleta}/public/${req.files[0].path}`
  });
  await newWaifus.save();
  res.status(201).send({ message: 'Waifu agregada correctamente' });
} catch (err) {
  console.error(err);
  res.status(400).send({ message: 'Faltan ingresar datos de la Waifu, debe ingresar nombre, info y imagen' });
    }
}

//GET MOSTRAR TODAS LAS WAIFUS
module.exports.getAllWaifus=async(req,res)=>{
    try{
    const waifus=await waifusModel.find({}).exec()
    return res.send(waifus)}
    catch(error){
      return res.status(500)
    }
}

//DEL BORRAR UNA WAIFU  REQUIERE ID
module.exports.deleteWaifu=async(req,res)=>{
  
  try{
    var _id=req.body.id;
    if(!_id){
      return res.status(400)
    }
      const waifu=await waifusModel.findByIdAndRemove({_id}).exec();
      console.log(await waifu)
      if(waifu)return res.send(`Waifu borrada correctament id: ${_id}`)
      if(!waifu)return res.status(419).send('No existe ninguna waifu con el id indicado')
    }catch(error){
      return res.status(500)
    }
}
//PUT MODIFICAR UNA WAIFU   REQUIERE ID
module.exports.modifyWaifu=async(req,res)=>{
  try {
    var URLcompleta=`${req.protocol}://${req.hostname}:${process.env.PORT}`
    var _id=req.params.id;
    var {nombre,info}=req.body
    if(_id){
        if(req.files.length!==0){
        const update=await waifusModel.findOneAndUpdate({_id},{$set:{nombre,info,imagen: `${URLcompleta}/public/${req.files[0].path}`}});
        return res.send(`Waifu modificada correctamente id: ${_id}`);
        }else{
          const update=await waifusModel.findOneAndUpdate({_id},{$set:{nombre,info,}});
        return res.send(`Waifu modificada correctamente id: ${_id}`);
        }
    }else{
      return res.status(404);
    }
  } catch (error) {
    console.log(error)
  }
}