
import React, { useState } from "react";
const Fetchimgupload = () => {
  const [image, setImage] = useState("");
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "tutorial");
    data.append("cloud_name", "breellz");
    fetch("http://localhost:5050/image", {
      method: "post",
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
};

export default Fetchimgupload;
