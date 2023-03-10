import React, { useEffect, useState } from "react";
import Header from "./src/components/navbar";
import ProductList from "./src/components/ProductList";
import { Row, Text, Col, Loading, Button } from "@nextui-org/react";
import Cart from "./src/components/Cart";
import Menu from "./src/components/Menu";
import axios from "axios";
import { BASE_URL } from "./api/config";
import CartModal from "./src/components/Modal";

export default function Home() {
  const [data, setData] = useState();
  const [loading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
  
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      };  
  
      let data = await axios.get('https://demoappprojects.com/epic-burger/api/v1/categories',config);
  
      // console.log(data);
      setData(data.data);
      setIsLoading(false);
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScroll() {
    const currentScrollPosition =
      window.scrollY || document.documentElement.scrollTop;
    const CartContainerPostition = document.querySelector(".main-product-container").offsetTop;
    const CartContainerElement = document.querySelector(".CartContainer");
    const CartContainerWidth = CartContainerElement.offsetWidth;
    // console.log(CartContainerWidth);

    CartContainerElement.style.width = CartContainerWidth + "px";
    
    if (CartContainerPostition <= currentScrollPosition) {
      CartContainerElement.classList.add("cart-sticky");
    } else {
      CartContainerElement.classList.remove("cart-sticky");
    }
  }

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading size="xl" />
      </div>
    );
  }

  return (
    <main>
      <div className="Homebanner">
        <Header />
      </div>
      <Menu category={data} />

      <div
        className="main-product-container"
        style={{ width: "100%", overflow: "hidden", position: "relative" }}
      >
        <Row gap={1} wrap="Wrap" className="default-row">
          <Col span={9}>
            {data.map((item, i) => (
              <div key={i} id={`cat_sec_${item.id}`}>
                <Text
                  h1
                  style={{
                    marginTop: 50,
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  {item.name}
                </Text>
                <ProductList categoryId={item.id} />
              </div>
            ))}
          </Col>
          <Col span={3}>
            <Cart />
          </Col>
        </Row>
      </div>

      <CartModal />
    </main>
  );
}
