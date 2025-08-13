/**
 * This is a context api which store the data
 * 
 * 
 */

import { createContext, useEffect, useState, useRef } from "react";

export const EditorContext = createContext();

const EditorProvider = ({ children }) => {
  const [bgImage, setBgImage] = useState(null);
  const [fields, setFields] = useState([]);
  const [dateField, setDateField] = useState([]);
  const [mydate, setMyDate] = useState(false);
  const [qrCode, setQrCode] = useState([]);
  const [myqr, setMyQr] = useState(false);
  const [imgFields, setImgFields] = useState([]);
  const [thumbnail, setThumbnail] = useState(
    "https://cdn.shopify.com/s/files/1/0533/2089/files/img-url.jpg"
  );
  const pageRef = useRef(null);
  const myvalue = {
    bgImage,
    setBgImage,
    fields,
    setFields,
    pageRef,
    imgFields,
    setImgFields,
    thumbnail,
    setThumbnail,
    qrCode,
    setQrCode,
    dateField,
    setDateField,
    mydate,
    setMyDate,
    myqr,
    setMyQr,
  };
  return (
    <EditorContext.Provider value={myvalue}>{children}</EditorContext.Provider>
  );
};

export default EditorProvider;
