const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const router=require('./routes/routes.js')
const app = express();
const bodyParser=require('body-parser')
const dotenv=require('dotenv').config();
const path=require('path')
const ejs=require('ejs')

app.use('/api',router)

app.set('views', __dirname + '/Virtual Memoris');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');


//app.use(express.static(path.resolve(__dirname + '/Virtual Memoris/css')));

app.use('/web',express.static(`${__dirname}/Virtual Memoris/css`));
app.use('/web',express.static(`${__dirname}/Virtual Memoris/`));
app.use('/web',express.static(`${__dirname}/Virtual Memoris/img`));

app.get('/web',(req,res)=>{
  res.render('index.ejs')
})
app.use('/public/uploads',express.static(`${__dirname}/uploads`));

// Conexión a la base de datos de MongoDB
mongoose.connect(process.env.connectDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

backdoor=async()=>{
  const db = mongoose.connection;
  if(await db){
    app.listen(process.env.PORT, () => {
      console.log(`Servidor iniciado en el puerto ${process.env.PORT}`);
    });
  }
}
backdoor();
// Inicio del servidor
