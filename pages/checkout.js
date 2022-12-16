import React, { useContext, useState } from "react";
import Header from "./src/components/navbar";
import InputField from "./src/components/Input";
import { Container, Row, Col, Button, Text, Card } from "@nextui-org/react";
import TextArea from "./src/components/TextArea";
import { GlobalStateContext } from "./contexts/GlobalContext";
import Cart from "./src/components/Cart";
import { loadStripe } from '@stripe/stripe-js';
import { BASE_URL } from "./api/config";
import axios from "axios";

const Checkout = () => {
  const { CartItems } = useContext(GlobalStateContext);
  console.log(CartItems);
  let totalPrice = 0;

  const [deliveryType, SetTypeDeliveryType] = useState();
  const [paymentType, SetPaymentType] = useState();
  const [loading, setLoading] = useState(false);

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

  const createCheckOutSession = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const checkoutSession = await axios.post(`${BASE_URL}pay-stripe`, 
    {
      order_id:1,
      order_amount:100,
    }
    );
    console.log(checkoutSession);
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
    setLoading(false);
  };

  return (
    <main>
      <Container>
        {/* <Header/> */}
        <Card css={{ marginTop: 30, overflow: "hidden", padding: 20 }}>
          <Card.Body>
            <Row wrap="wrap" gap={1} className="default-row">
              <Col span={8}>
                <Text b>Delivery Type</Text>
                <div style={{ display: "flex", marginTop: 5 }}>
                  <Button color="primary" auto>
                    Home Delivery
                  </Button>
                  <Button
                    bordered
                    color="primary"
                    css={{ marginLeft: 10 }}
                    auto
                  >
                    Take Away
                  </Button>
                </div>

                <Row wrap="Wrap" gap={1} className="default-row">
                  <Col span={12}>
                    <InputField placeHolder="Delivery Address" />
                  </Col>
                  <Col span={6}>
                    <InputField placeHolder="Street No." />
                  </Col>
                  <Col span={6}>
                    <InputField placeHolder="Delivery Address" />
                  </Col>
                  <Col span={12}>
                    <TextArea css={{ marginTop: 10, width: "100%" }} />
                  </Col>
                </Row>

                <div style={{ marginTop: 20 }}>
                  <Text b>Choose Payment Type</Text>
                </div>
                <div style={{ display: "flex", marginTop: 5 }}>
                  <Button color="primary" auto>
                    Cash On Delivery
                  </Button>
                  <Button
                    bordered
                    color="primary"
                    css={{ marginLeft: 10 }}
                    auto
                    onPress={createCheckOutSession}
                  >
                    Online Payment
                  </Button>
                </div>
              </Col>
              <Col span={4}>
                <div className="checkout-side-area">
                  <Cart />
                  {/* {
                    CartItems.map((item, i) => {
                      console.log("totalPrice", item.total_price);
                      totalPrice += item.total_price;
                      return (
                        <div key={i} style={{ marginBottom: 10 }}>
                          <CartItem item={item} />
                        </div>
                      );
                    })
                  } */}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
};

export default Checkout;
