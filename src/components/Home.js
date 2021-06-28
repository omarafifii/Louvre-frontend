import React, { Fragment } from 'react';
import { MyContext } from '../App';
import Header from "./Header";
import HomeAdmin from './HomeAdmin';
import HomeGuest from './HomeGuest';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Divider,
    InputGroup,
    InputRightElement,
    Text,
    useColorModeValue,
    Alert,
    AlertIcon,
    AlertDescription,
    CloseButton,
  } from '@chakra-ui/react';

  
  const Home = () => {

    const { state: myState } = React.useContext(MyContext);
    return(
        <Fragment>
            <Header/>
            {(myState.role === 'ADMIN')?<HomeAdmin/>:<HomeGuest/>}
        </Fragment>
    );
  };

  export default Home;