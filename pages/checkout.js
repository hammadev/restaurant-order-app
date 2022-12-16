import React, { useContext, useState } from 'react'
import Header from "./src/components/navbar";
import InputField from "./src/components/Input";
import { Container, Row, Col, Button, Text, Card } from "@nextui-org/react";
import TextArea from "./src/components/TextArea";
import { GlobalStateContext } from "./contexts/GlobalContext";
import Cart from './src/components/Cart';

const Checkout = () => {

    const { CartItems } = useContext(GlobalStateContext);
    console.log(CartItems);
    let totalPrice = 0;

    const [deliveryType,SetTypeDeliveryType] = useState();
    const [paymentType,SetPaymentType] = useState();

    
    return (
        <main>
            <Container>
                {/* <Header/> */}
                <Card css={{ marginTop: 30, overflow: 'hidden', padding: 20 }}>
                    <Card.Body>
                        <Row wrap="Wrap">
                            <Col span={8}>
                                <Text b>Delivery Type</Text>
                                <div style={{ display: 'flex', marginTop: 5 }}>
                                    <Button color="primary" auto>
                                        Home Delivery
                                    </Button>
                                    <Button bordered color="primary" css={{ marginLeft: 10 }} auto>
                                        Take Away
                                    </Button>
                                </div>
                                <InputField placeHolder="Delivery Address" />
                                <Row wrap="Wrap" >
                                    <Col span={6}>
                                        <InputField placeHolder="Street No." />
                                    </Col>
                                    <Col span={6}>
                                        <InputField placeHolder="Delivery Address" />
                                    </Col>
                                </Row>
                                <TextArea css={{ marginTop: 10, width: '100%' }} />

                                <div style={{ marginTop: 20 }}>
                                    <Text b>Choose Payment Type</Text>
                                </div>
                                <div style={{ display: 'flex', marginTop: 5 }}>
                                    <Button color="primary" auto>
                                        Cash On Delivery
                                    </Button>
                                    <Button bordered color="primary" css={{ marginLeft: 10 }} auto>
                                        Online Payment
                                    </Button>
                                </div>
                            </Col>
                            <Col span={4}>
                                <div className=''>
                                    <Cart/>
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
}

export default Checkout;