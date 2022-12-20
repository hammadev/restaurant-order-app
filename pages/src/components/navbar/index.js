import React from "react";
import { Navbar, Button, Link, Text, Card, Radio } from "@nextui-org/react";
import Layout from "./Layout.js";
import AcmeLogo from "./AcmeLogo.js";

function Header() {
  const [variant, setVariant] = React.useState("floating");

  const variants = ["static", "floating", "sticky"];
  
  return (
    <Layout>
      <Navbar isBordered variant={variant}>
        <Navbar.Brand>
          <AcmeLogo />
          <Text b color="inherit" hideIn="xs">
            EPIC BURGER & WINGS
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          {/* <Navbar.Link href="#">Features</Navbar.Link>
          <Navbar.Link isActive href="#">Customers</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Company</Navbar.Link> */}
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} href="#">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </Layout>
  )
}

export default Header;