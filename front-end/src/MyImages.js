import React, { useState, useEffect, useContext } from "react";
import {
  List,
  Avatar,
  Space,
  Button,
  Row,
  Col,
  Modal,
  Input,
  Select,
} from "antd";
import {Redirect} from 'react-router-dom';
import {userContext} from './userContext';

const { Option } = Select;
function MyImages() {
  const [images, setImages] = useState([]);
  const {loggedIn} = useContext(userContext);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [pictureBeingEdited, setPictureBeingEdited] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/userimages`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((_) => alert("unable to fetch user specific images"));
  }, []);

  function handleModalOk() {
    setModalVisibility(false);
    fetch(`${process.env.REACT_APP_URL}/editimg`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(pictureBeingEdited),
    })
      .then((res) => {
        if (res.status === 200) {
          fetch(`${process.env.REACT_APP_URL}/userimages`, { credentials: "include" })
            .then((res) => res.json())
            .then((data) => setImages(data))
            .catch((_) => alert("unable to fetch user specific images"));
        }
      })
      .catch((_) => alert("unable to edit image"));
    setPictureBeingEdited({});
  }

  function deleteImg(id) {
    fetch(`${process.env.REACT_APP_URL}/deleteimg`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ pictureID: id }),
    }).then((res) => {
      if (res.status === 200) {
        setImages((old) => {
          console.log(old);
          const objCopy = [...images];
          for (let i = 0; i < objCopy.length; i++) {
            if (objCopy[i].pictureID === id) {
              objCopy.splice(i, 1);
            }
          }
          return objCopy;
        });
      }
    });
  }

  function handleModalCancel() {
    setModalVisibility(false);
    setPictureBeingEdited({});
  }

  function handleModalOpen(picturedetails) {
    setPictureBeingEdited(picturedetails);
    setModalVisibility(true);
  }

  if(!loggedIn){
    return <Redirect to='/login'></Redirect>
  }
  return (
    <Row>
      <Col span={22} offset={1}>
        <h1 style={{ textAlign: "center" }}>Your Images</h1>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={images}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              actions={[]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src={`${process.env.REACT_APP_URL}/images/${item.path}`}
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.ownerUsername}</a>}
                description={"$" + item.price}
              />
              {item.public ? (
                <p>This item is listed on the marketplace</p>
              ) : (
                <p>This item is not listed on the marketplace</p>
              )}
              {
                <Button
                  onClick={(_) =>
                    handleModalOpen({
                      id: item.pictureID,
                      price: item.price,
                      public: item.public,
                    })
                  }
                  type="primary"
                >
                  EDIT
                </Button>
              }
              {
                <Button
                  onClick={(_) => deleteImg(item.pictureID)}
                  type="danger"
                >
                  DELETE
                </Button>
              }
            </List.Item>
          )}
        />

        <Modal
          title="Edit image details.."
          visible={modalVisibility}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          <label>Price</label>
          <Input
            onChange={(e) =>
              setPictureBeingEdited({
                ...pictureBeingEdited,
                price: e.target.value,
              })
            }
            value={pictureBeingEdited.price}
            placeholder="Basic usage"
          />
          <label>Public</label>
          <Select
            key={pictureBeingEdited.public}
            defaultValue={pictureBeingEdited.public == 1 ? "true" : "false"}
            style={{ width: 120 }}
            onChange={(e) =>
              setPictureBeingEdited({
                ...pictureBeingEdited,
                public: e == "true" ? 1 : 0,
              })
            }
          >
            <Option value="true">True</Option>
            <Option value="false">False</Option>
          </Select>
        </Modal>
      </Col>
    </Row>
  );
}

export default MyImages;
