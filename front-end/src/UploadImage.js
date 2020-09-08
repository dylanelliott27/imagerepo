import React, { useState, useRef, useContext} from "react";
import { Form, Button} from "antd";
import { Redirect } from "react-router-dom";
import {userContext} from './App';

function UploadImage() {
  const [previewImages, setPreviewImages] = useState({});
  const {loggedIn} = useContext(userContext);
  const [successfulUpload, setSuccessfulUpload] = useState(false);
  const filesToBeUploaded = useRef(null);

  function previewImage(e) {
    Array.from(e.target.files).forEach((ele) => {
      const reader = new FileReader();
      readImage(ele, reader);
    });

    function readImage(ele, reader) {
      reader.readAsDataURL(ele);
      reader.addEventListener("load", function (e) {
        setPreviewImages((x) => ({
          ...x,
          [ele.name]: {
            price: 0,
            public: true,
            data: e.target.result,
            tags: "",
          },
        }));
      });
    }
  }

  function uploadFiles(files) {
    const fileList = filesToBeUploaded.current.files;

    let formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      let randomFileName = Math.floor(Math.random() * (125000 - 1) + 1);
      formData.append(randomFileName, fileList[i]);
      formData.append(
        randomFileName,
        JSON.stringify([
          previewImages[fileList[i].name].public,
          previewImages[fileList[i].name].price,
          previewImages[fileList[i].name].tags,
        ])
      );
    }

    fetch("http://localhost:8000/uploadimg", {
      body: formData,
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          setSuccessfulUpload(true);
        }
      })
      .catch((_) => alert("issue uploading the image"));
  }

  if(!loggedIn){
    return <Redirect to="/login"></Redirect>
  }
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  if (successfulUpload) {
    return <Redirect to="/myimages"></Redirect>;
  }

  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={uploadFiles}

    >
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>Upload a image</h1>

      <Form.Item {...formItemLayout} name="Images" label="Choose your images">
        <input
          type="file"
          ref={filesToBeUploaded}
          multiple
          onChange={(e) => previewImage(e)}
        ></input>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      {previewImages &&
        Object.keys(previewImages).map((e) => (
          <div>
            <img
              key={e}
              style={{ width: "150px", height: "100%" }}
              src={previewImages[e].data}
            ></img>
            <label>Price</label>
            <input
              onChange={(event) => {
                event.persist();
                setPreviewImages((old) => ({
                  ...old,
                  [e]: { ...previewImages[e], price: event.target.value },
                }));
              }}
            ></input>
            <label>Public</label>
            <select
              onChange={(event) => {
                event.persist();
                setPreviewImages((old) => ({
                  ...old,
                  [e]: { ...previewImages[e], public: event.target.value },
                }));
              }}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            <input
              onChange={(event) => {
                event.persist();
                setPreviewImages((old) => ({
                  ...old,
                  [e]: { ...previewImages[e], tags: event.target.value },
                }));
              }}
            ></input>
          </div>
        ))}
    </Form>
  );
}

export default UploadImage;
