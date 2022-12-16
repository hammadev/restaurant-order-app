import { useContext } from "react";
import { Card, Grid, Image, Text, Link } from "@nextui-org/react";
import { ASSET_BASE_URL } from "../../api/config";
import { GlobalStateContext } from "../../contexts/GlobalContext";

const CartItem = (props) => {
    let item = props.item;

    const { CartItems, setCartItems } = useContext(GlobalStateContext);

    function deleteCartItem(item){
        let FilteredArray = CartItems.filter(Arritem => Arritem.product.id != item.product.id);
        setCartItems(FilteredArray);
    }

    return (
        <Card css={{ p: "$6", mw: "400px" }}>
            <Card.Header>
                <Image
                    alt="nextui logo"
                    src={`${ASSET_BASE_URL}${item.product.image}`}
                    width="60px"
                    height="60px"
                    showSkeleton
                />
                <Grid.Container css={{ pl: "$6" }}>
                    <Grid xs={12}>
                        <Text h4 css={{ lineHeight: "$xs" }}>
                            {props.item.qty}x - {item.product.name}
                        </Text>
                    </Grid>
                    <Grid xs={12}>
                        <Text css={{ color: "$accents8" }}>${item.product.price}</Text>
                    </Grid>
                </Grid.Container>
            </Card.Header>
            <Card.Body css={{ py: "$2" }}>
                {
                    props.item.selected_addon.length > 0 ?
                        <>
                            <Text b>
                                Add Ons
                            </Text>
                            {
                                props.item.selected_addon.map((item, i) => (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }} key={i}>
                                        <Text>
                                            {item.name}
                                        </Text>
                                        <Text>
                                            ${item.price}
                                        </Text>

                                    </div>
                                ))
                            }
                        </>
                        :
                        null
                }
                {
                    props.item.selected_variations.length > 0 ?
                        <>
                            <Text b>
                                Variation
                            </Text>
                            {
                                props.item.selected_variations.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <Text>
                                            {item.name}
                                        </Text>
                                        <Text>
                                            ${item.price}
                                        </Text>

                                    </div>
                                ))
                            }
                        </>
                        :
                        null
                }
            </Card.Body>
            <Card.Footer css={{display:"flex",justifyContent:'space-between'}}>
                <Text b>
                    Sub Total: ${item.total_price}
                </Text>
                <Link
                    icon
                    color="primary"
                    href="javascript:void(0)"
                    onClick={() => deleteCartItem(item)}
                >
                    Delete
                </Link>
            </Card.Footer>
        </Card>
    );
}

export default CartItem;