import React, { useContext, useEffect } from 'react'
import { Image, Text, Button, } from "@nextui-org/react";
import GlobalStateContext from '../../contexts/GlobalContext';
import CartItem from './CartItem';
import Link from 'next/link';
import { useRouter } from 'next/router'

export default function Cart({ payment, paymentFunc }) {

    const router = useRouter()
    const { CartItems } = useContext(GlobalStateContext);

    let totalPrice = 0;

    if (CartItems.length == 0) {
        return (
            <div className='CartContainer EmptyCartContainer'>
                <Image
                    src="https://www.getillustrations.com/packs/download-simple-colorful-outline-illustrations/scenes/_1x/e-commerce,%20shopping%20_%20empty,%20cart,%20not%20found,%20product,%20item,%20purchase_md.png"
                    showSkeleton={true}
                    width={'90%'}
                    height={120}
                    alt="Empty Cart"
                />
                <Text h3 style={{ textAlign: 'center', marginTop: 10 }}>Your cart is empty!</Text>
            </div>
        );
    }

    return (
        <div className='CartContainer'>
            <div className='cartHeader'>
                <Text h3 style={{ textAlign: 'center', }}>My Cart</Text>
            </div>
            <div className='CartContainerInner'>
                {
                    CartItems.map((item, i) => {
                        // console.log("totalPrice",item.total_price);
                        totalPrice += item.total_price;
                        return (
                            <div key={i} style={{ marginBottom: 10 }}>
                                <CartItem item={item} />
                            </div>
                        );
                    })
                }
            </div>
            <div className='cartSummary'>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text>Subtotal</Text>
                    <Text>${totalPrice}</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text>Delivery</Text>
                    <Text>$19</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text b>Grand Total</Text>
                    <Text b>${totalPrice + 19}</Text>
                </div>
                {
                    payment ? 
                    <Button css={{ width: '100%' }} onClick={paymentFunc}>
                        Continue to Payment
                    </Button>
                    :
                    <Button css={{ width: '100%' }} onClick={() => router.push({ pathname: '/checkout', query: CartItems })}>
                        Proceed to checkout
                    </Button>

                }
                <Link href="/checkout">
                </Link>
            </div>
        </div>
    );

}
