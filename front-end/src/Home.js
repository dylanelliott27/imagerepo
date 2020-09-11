import React, { useState, useEffect, useContext } from "react";
import {Redirect} from 'react-router-dom';
import { List, Avatar, Button, Row, Col } from "antd";
import { userContext } from "./userContext";

function Home() {
  const [publicImages, setPublicImages] = useState([]);
  const { updateUserInfo, loggedIn } = useContext(userContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/imagelist`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setPublicImages(data))
      .catch((_) => console.error("issue fetching imagedata"));
  }, []);

  function purchaseImage(pictureID) {
    fetch(`${process.env.REACT_APP_URL}/purchasereq`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ pictureID: pictureID }),
    })
      .then((res) => {
        if (res.status === 200) {
          fetch(`${process.env.REACT_APP_URL}/imagelist`, { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
              updateUserInfo();
              setPublicImages(data);
            })
            .catch((_) => console.error("issue fetching imagedata"));
        } 
      })
      .catch((_) => console.error("issue purchasing"));
  }

  if(!loggedIn){
    return <Redirect to='/login'></Redirect>
  }
  return (
    <Row>
      <Col span={22} offset={1}>
        <h1 style={{ textAlign: "center" }}>Marketplace</h1>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={publicImages}
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
              {item.isOwner ? (
                <Button type="danger">You own this</Button>
              ) : (
                <Button
                  onClick={(_) => purchaseImage(item.pictureID)}
                  type="primary"
                >
                  Purchase
                </Button>
              )}
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
}

export default Home;
