import React, { useContext, useEffect } from 'react'
import { GlobalStateContext } from '../../contexts/GlobalContext';
import { Image, Text, Button } from "@nextui-org/react";
import CartItem from './CartItem';

export default function Cart() {

    const { CartItems, setCartItems } = useContext(GlobalStateContext);
    // console.log(CartItems);
    let totalPrice = 0;

    if (CartItems.length == 0) {
        return (
            <div className='CartContainer EmptyCartContainer'>
                <Image
                    src="https://www.getillustrations.com/packs/download-simple-colorful-outline-illustrations/scenes/_1x/e-commerce,%20shopping%20_%20empty,%20cart,%20not%20found,%20product,%20item,%20purchase_md.png"
                    showSkeleton={true}
                    width={'90%'}
                    height={120}
                />
                <Text h3 style={{ textAlign: 'center', marginTop: 10 }}>Your cart is empty!</Text>
            </div>
        );
    }

    return (
        <div className='CartContainer'>
            <div className='cartHeader'>
                <Text h3 style={{ textAlign: 'center', marginTop: 10 }}>Cart</Text>
            </div>
            <div className='CartContainerInner'>
                {
                    CartItems.map((item, i) => {
                        console.log("totalPrice",item.total_price);
                        totalPrice += item.total_price;
                        return(
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
                <Button css={{width:'100%'}}>
                    Proceed to checkout
                </Button>
            </div>
        </div>
    );

}