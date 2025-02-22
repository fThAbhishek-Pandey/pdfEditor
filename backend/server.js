import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import upload from './multer.js';
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
app.post('/image',upload.single('file') ,function (req, res) {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    console.log('profile-upload-single');
    // console.log(JSON.stringify(req.file))
    try {
      var response = '<a href="/">Home</a><br>'
      response += "Files uploaded successfully.<br>"
      // response += `<img src="${req.file.path}" /><br>`
      console.log(req.file, req.body)
      return res.json("success fully uploaded")
    } catch (error) {
      console.log(error)
    }
   
  })

app.get('/',(req,res) =>{
    res.send("api get link")}
)


app.listen( 5050, ()=> console.log("App is listening",port));
