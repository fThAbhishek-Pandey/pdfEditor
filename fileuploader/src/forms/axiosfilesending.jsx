import React, {useState} from 'react'
import axios from 'axios'
const Axiosfilesending =  () => {
  const [image, setImage] = useState("");
    const uploadImage = async () => {
      const formdata = new FormData();
      formdata.append("file", image);
      formdata.append("axious", "axios for file sending");
      formdata.append("Abhishek", "pandey");
   const {data} =  await axios.post("http://localhost:5050/image", formdata, {
      
        enctype: "multipart/form-data",
      })
    };
  
    return (
      <div>
        <div>
            <h2>axios</h2>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            name="cocirculer"
            id="hi"
          ></input>
          <button onClick={uploadImage}>Upload</button>
        </div>
      </div>
    );
}

export default Axiosfilesending