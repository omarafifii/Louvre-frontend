import React from 'react';
import { MyContext } from '../App';
import jwt_decode from "jwt-decode";
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

export const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(!show);
  const { dispatch } = React.useContext(MyContext);

  const initialState = {
    username: '',
    password: '',
    isSubmitting: false,
    errorMessage: null,
  };
  const [data, setData] = React.useState(initialState);
  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });
    fetch("http://localhost:8080/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then(resJson => {
        let token = resJson.token;
        let decoded = jwt_decode(token);
        console.log("resjson: ",resJson);
        console.log("decoded: ",decoded);
        // let payload1 = decoded.concat(resJson);
        dispatch({
            type: "LOGIN",
            payload: {...decoded, ...resJson}
        })
        
      })
      .catch(error => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        });
      });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      backgroundImage={'../../assets/login/bg.svg'}
      mx={'15%'}
    >
      <Stack spacing={8} mx={'auto'} minW={'50%'} py={12} px={6}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <Text align={'center'} fontSize={'xl'} fontWeight={600}>
              Log In
            </Text>
            {/* <Divider px={'0'} orientation={'horizontal'} bg={'blue.500'}/> */}
            <Box mx={8}>
              <FormControl id="email">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter username"
                  value={data.username}
                  name="username"
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    // pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={data.password}
                    name="password"
                    onChange={handleInputChange}
                  />
                  <InputRightElement width="4.5rem">
                      <img src='../../assets/login/group 18.svg' onClick={handleShow}/>
                    {/* <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button> */}
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                {data.errorMessage && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>{data.errorMessage}</AlertDescription>
                    <CloseButton position="absolute" right="8px" top="8px" />
                  </Alert>
                  //   <span className="form-error">{data.errorMessage}</span>
                )}
                <Button
                  my={'8'}
                  bg={'blue.400'}
                  color={'white'}
                  disabled={data.isSubmitting}
                  onClick={handleFormSubmit}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  {data.isSubmitting ? 'Loading...' : 'Login'}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
