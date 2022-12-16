import React, { useContext, useEffect, useState } from "react";
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
  const [totalPrice,setTotalPrice] = useState();
  useEffect(() => {
    let totalPrice = 0;
    CartItems.map((item, i) => {
      totalPrice += item.total_price;
    })
    setTotalPrice(totalPrice);
  }, []);

  const [deliveryType, SetDeliveryType] = useState('pickup');
  const [paymentType, SetPaymentType] = useState('online');
  const [loading, setLoading] = useState(false);

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

  const createCheckOutSession = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const checkoutSession = await axios.post(`${BASE_URL}pay-stripe`,
      {
        order_id: 1,
        order_amount: totalPrice,
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
        <Card css={{ marginTop: 30, marginBottom: 30, overflow: "hidden", padding: 20 }}>
          <Card.Body>
            <Row wrap="wrap" gap={1} className="default-row">
              <Col span={8}>
                <Text b>Delivery Type</Text>
                <div style={{ display: "flex", marginTop: 5 }}>

                
                  <Button color="primary" bordered={deliveryType == 'delivery' ? false : true} auto onPress={() => SetDeliveryType('delivery')}>
                    Home Delivery
                  </Button>

                  <Button
                    color="primary"
                    bordered={deliveryType == 'pickup' ? false : true}
                    css={{ marginLeft: 10 }}
                    auto
                    onPress={() => SetDeliveryType('pickup')}
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
                  <Button 
                    color="primary"
                    auto
                    bordered={paymentType == 'COD' ? false : true}
                    onPress={() => SetPaymentType('COD')}
                  >
                    Cash On Delivery
                  </Button>
                  <Button
                    bordered={paymentType == 'online' ? false : true}
                    color="primary"
                    css={{ marginLeft: 10 }}
                    auto
                    onPress={() => SetPaymentType('online')}
                  >
                    Online Payment
                  </Button>
                </div>
              </Col>
              <Col span={4}>
                <div className="checkout-side-area">
                  <Cart payment={true}  paymentFunc={createCheckOutSession} />
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
