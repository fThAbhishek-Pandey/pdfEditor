import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import upload from './multer.js';
import ConnectCloudinary from './cloudnaryconfig.js';
import cloudinaryFunc from './cloudinaryfunc.js'
ConnectCloudinary();
const app = express();
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended:true}))
const port= process.env.PORT||5000
app.use('/uploads', express.static('uploads'));
app.post('/text', (req,res)=>{
  console.log(req.body);
  res.json(req.body());
})
app.post('/image',upload.single('file') ,async (req, res)=> {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any

    console.log('profile-upload-single');
    try {
      console.log("file-->",req.file,"body-->", req.body)
      const imagefile= req.file
      const data = await  cloudinaryFunc.cloudinaryUploadImage(imagefile)
      console.log("cloudinaryUploadImage : ",data)
      return res.json({
        sucess:true,
        data: data
      })
    } catch (error) {
      console.log(error)
    }
   
  })

app.get('/',(req,res) =>{
    res.send("api get link")}
)


app.listen( 5050, ()=> console.log("App is listening",port));
