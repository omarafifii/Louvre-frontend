import React from 'react';
import { MyContext } from '../App';
import { navigate } from 'hookrouter';
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
  useBreakpointValue,
} from '@chakra-ui/react';

const Header = props => {
  const { dispatch } = React.useContext(MyContext);
  const api_url = process.env.REACT_APP_API_URL;
  const { state: myState } = React.useContext(MyContext);

  const initialState = {
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

  const handleLogout = event => {
    event.preventDefault();
    // console.log('In handlelogout');
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });
    fetch(api_url + 'user/logout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${myState.token}`,
      },
    })
      .then(res => {
        // console.log(res);
        if (res.ok) {
          dispatch({
            type: 'LOGOUT',
            payload: {},
          });
          navigate('/', true);
          //   return res.json();
        }
        throw res;
      })
      //   .then(resJson => {
      //     // console.log('2');
      //     dispatch({
      //         type: "LOGOUT",
      //         payload: {}
      //     })
      //     // console.log('3');
      //     navigate('/');
      //     // console.log('4');
      //   })
      .catch(error => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText,
        });
      });
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex flex={{ base: 1 }} justify={{ base: 'left', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'left', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
          >
            Louvre
          </Text>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <Stack
            align={'center'}
            direction={'column'}
            spacing={0}
            //   display={{ base: 'none', md: 'inline-flex' }}
          >
            <Text fontSize={'md'}>{myState.username}</Text>
            <Text fontSize={'10px'}>{myState.role}</Text>
          </Stack>
          <Button
            display={{ base: 1, md: 'inline-flex' }}
            justify={{ base: 'center', md: 'start' }}
            fontSize={'sm'}
            fontWeight={600}
            onClick={handleLogout}
            color={'white'}
            bg={'blue.500'}
            href={'#'}
            _hover={{
              bg: 'blue.400',
            }}
          >
            Logout
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Header;
