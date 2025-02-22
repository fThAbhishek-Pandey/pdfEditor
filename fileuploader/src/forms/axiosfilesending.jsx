import React from 'react'
import axios from 'axios'
const Axiosfilesending =  () => {
  const [image, setImage] = useState("");
    const uploadImage = async () => {
      const data = new FormData();
      data.append("file", image);
      data.append("axious", "axios for file sending");
      data.append("Abhishek", "pandey");
     await axios.post("http://localhost:5050/image", {
        body: data,
        enctype: "multipart/form-data",
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
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