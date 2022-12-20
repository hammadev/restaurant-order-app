import Box from "./Box.js";
import Content from "./Content.js";

const Layout = ({ children }) => (
  <Box
    css={{
      maxW: "100%"
    }}
  >
    {children}
  </Box>
);

export default Layout;