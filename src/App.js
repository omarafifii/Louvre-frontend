import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import {useRoutes} from 'hookrouter';
import MyRoutes from './components/MyRoutes'

export const MyContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  username: null,
  role: null,
  token: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("username", JSON.stringify(action.payload.username));
      localStorage.setItem("role", JSON.stringify(action.payload.role));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      console.log("payload: ",action.payload);
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload.username,
        role: action.payload.role,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        role: null,
        token: null
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const routeResult = useRoutes(MyRoutes);
  return (
    <ChakraProvider theme={theme}>
      <MyContext.Provider
        value={{
          state,
          dispatch
        }}
      >
        {routeResult}
      </MyContext.Provider>
    </ChakraProvider>
    // <ChakraProvider theme={theme}>
    //   <Box textAlign="center" fontSize="xl">
    //     <Grid minH="100vh" p={3}>
    //       <ColorModeSwitcher justifySelf="flex-end" />
    //       <VStack spacing={8}>
    //         <Logo h="40vmin" pointerEvents="none" />
    //         <Text>
    //           Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
    //         </Text>
    //         <Link
    //           color="teal.500"
    //           href="https://chakra-ui.com"
    //           fontSize="2xl"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           Learn Chakra
    //         </Link>
    //       </VStack>
    //     </Grid>
    //   </Box>
    // </ChakraProvider>
  );
}

export default App;
