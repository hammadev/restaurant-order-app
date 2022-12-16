import React, { useContext } from 'react'
import { Card, Grid, Row, Text, Loading, Image, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, ASSET_BASE_URL } from "../../api/config";
import { GlobalStateContext } from "../../contexts/GlobalContext";

export default function ProductList(props) {

  const [data, setData] = useState();
  const [loading, setIsLoading] = useState(true);
  const { selectedItem, setSelectedItem, isShowModal, setIsShowModal } = useContext(GlobalStateContext);

  const fetchData = async () => {
    let data = await axios.get(`${BASE_URL}categories/products/${props.categoryId}/all`);
    setData(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const OnPressAddToCartBtn = (item) => {
    setSelectedItem(item);

    if(isShowModal)
      setIsShowModal(false);
    else
      setIsShowModal(true);

  };

  if (loading) {
    return (
      <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Loading size="xl" />
      </div>
    );
  }

  if (data.length <= 0) {
    return (
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <Image
          src="https://www.getillustrations.com/packs/download-simple-colorful-outline-illustrations/scenes/_1x/e-commerce,%20shopping%20_%20empty,%20cart,%20not%20found,%20product,%20item,%20purchase_md.png"
          showSkeleton={true}
          width={'30%'}
          height={120}
        />
        <Text h3 style={{ textAlign: 'center', marginTop: 10 }}>No Product Found!</Text>
      </div>
    );
  }

  return (
    <Grid.Container gap={2} justify="flex-start">
      {
        data.map((item, index) => (
          <Grid xs={6} sm={4} key={index}>
            <Card isPressable>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  src={ASSET_BASE_URL + item.image}
                  objectFit="contain"
                  width="100%"
                  height={160}
                  showSkeleton={true}
                  alt={item.name}
                />
              </Card.Body>
              <Card.Footer css={{ alignItems: "flex-start", flexDirection: 'column' }}>
                <Row wrap="wrap" justify="space-between" align="center">
                  <Text b>{item.name}</Text>
                  <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                    ${item.price}
                  </Text>
                </Row>
                <Text style={{ marginTop: 3, marginBottom: 10 }}>{item.description}</Text>
                <Button
                  auto
                  rounded
                  ripple={false}
                  size="sm"
                  onClick={() => OnPressAddToCartBtn(item)}
                  css={{
                    paddingHorizontal: 10,
                  }}
                >
                  Add to Cart
                </Button>
              </Card.Footer>
            </Card>
          </Grid>
        ))
      }
      
    </Grid.Container>
  );
}
