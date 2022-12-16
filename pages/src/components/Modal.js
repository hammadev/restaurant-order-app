import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button, Text, Image, Radio, Checkbox, Row, Col } from "@nextui-org/react";
import { GlobalStateContext } from "../../contexts/GlobalContext";
import { ASSET_BASE_URL } from '../../api/config';
import confetti from 'canvas-confetti';
import TextArea from './TextArea';

export default function CartModal() {

  const { selectedItem, isShowModal, setIsShowModal, CartItems, setCartItems } = useContext(GlobalStateContext);

  const [TotalPrice, setTotalPrice] = useState(selectedItem.price);
  const [SelectedAddon, setSelectedAddon] = useState([]);
  const [SelectedVariant, setSelectedVariant] = useState([]);

  const [qty, setQty] = useState(1);

  useEffect(() => {
    setTotalPrice(selectedItem.price);
  },[]);

  useEffect(() => {
    clearCartHistory();
  }, [isShowModal]);

  function clearCartHistory(){
    setTotalPrice();
    setSelectedAddon([]);
    setSelectedVariant([]);
    setQty(1);
  }

  function getTotal(){
    let GrandTotal = TotalPrice ? TotalPrice : selectedItem.price; 
    GrandTotal = GrandTotal;
    return GrandTotal;
  }

  const AddAddon = (item) => {
    
    let ifAddonAlreadyAdded = SelectedAddon.find(Arr => Arr.id === item.id);

    if(ifAddonAlreadyAdded == undefined){

      // let GrandTotal = TotalPrice ? TotalPrice : selectedItem.price; 
      let GrandTotal = getTotal(); 

      SelectedAddon.push(item);
      setSelectedAddon(SelectedAddon);
      setTotalPrice(GrandTotal+item.price);
      // console.log("TotalPrice",TotalPrice);
    }else{
      let FilteredArray = SelectedAddon.filter(Arritem => Arritem.id != item.id);
      setSelectedAddon(FilteredArray);
      setTotalPrice(TotalPrice - item.price);
    }

    // console.log("ifAddonAlreadyAdded",ifAddonAlreadyAdded);
    // console.log("SelectedAddon",SelectedAddon);

  }

  const ChooseVariant = (item) => {
    console.log(item);
  }

  const OnPressAddToCartBtn = () => {

    let item = {
      product: selectedItem,
      selected_addon: SelectedAddon,
      selected_variations: SelectedVariant,
      total_price: TotalPrice ? TotalPrice * qty : selectedItem.price * qty,
      qty,
    };

    // setCartItems(item);
    CartItems.push(item);
    setCartItems(CartItems);
    
    setIsShowModal(false);
    
    // clearCartHistory();
    // console.log(item);

    confetti({
      particleCount: 100,
      startVelocity: 30,
      spread: 360,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      }
    });
  };


  return (
    <Modal
      scroll
      width="40%"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={isShowModal}
      onClose={() => {
        setIsShowModal(false);
        // clearCartHistory();
      }}
    >
      <Modal.Header css={{ display: "flex", justifyContent: "space-between" }}>
        <Text h3 id="modal-title" size={22}>
          {selectedItem.name}
        </Text>
        <Text h3 id="modal-title" size={22}>
          ${selectedItem.price}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col span={4}>
            <Image
              src={ASSET_BASE_URL + selectedItem.image}
              objectFit="contain"
              width={"100%"}
              height={100}
              showSkeleton={true}
              alt={selectedItem.name}
            />
          </Col>
          <Col span={6}>
            <Text id="modal-description">{selectedItem.description}</Text>
          </Col>
        </Row>

        {selectedItem.variations
          ? selectedItem.variations.map((item, i) => {
              return (
                <div key={i}>
                  <Text h3>{item.name}</Text>
                  {item.values ? (
                    <Radio.Group
                      css={{ width: "100%" }}
                      onChange={() => ChooseVariant(item)}
                    >
                      {item.values.map((itemI, i) => (
                        <Radio
                          size={"xs"}
                          value={itemI.label}
                          css={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            position: "relative",
                          }}
                          key={i}
                        >
                          <Text style={{ fontSize: 16 }}>{itemI.label}</Text>
                          {itemI.optionPrice > 0 ? (
                            <Text
                              style={{
                                position: "absolute",
                                right: 0,
                                fontSize: 16,
                              }}
                            >
                              ${itemI.optionPrice}
                            </Text>
                          ) : null}
                        </Radio>
                      ))}
                    </Radio.Group>
                  ) : null}
                </div>
              );
            })
          : null}

        {(selectedItem.add_ons || []).length > 0 ? <Text h3>Addon</Text> : null}

        {selectedItem.add_ons
          ? selectedItem.add_ons.map((item, i) => (
              <Checkbox
                onChange={() => AddAddon(item)}
                color="primary"
                size="sm"
                css={{ width: "100%" }}
                key={i}
              >
                {item.name}
                <Text style={{ fontSize: 16 }}>${item.price}</Text>
              </Checkbox>
              // <Text h3>{item.name}</Text>
            ))
          : null}

        <TextArea />
      </Modal.Body>
      <Modal.Footer css={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Text h6 size={16}>
            Total Price: $
            {TotalPrice ? TotalPrice * qty : selectedItem.price * qty}
          </Text>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Button.Group>
            <Button
              onClick={() => {
                qty > 1 ? setQty(qty - 1) : null;
              }}
            >
              -
            </Button>
            <Button disabled>{qty}</Button>
            <Button onClick={() => setQty(qty + 1)}>+</Button>
          </Button.Group>

          <Button auto onClick={OnPressAddToCartBtn}>
            Add to Cart
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
