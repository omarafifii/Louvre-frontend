import React, { Fragment } from 'react';
import { MyContext } from '../App';

import {
  Center,
  ArrowForwardIcon,
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
  Th,
  Tr,
  Table,
  Thead,
  Tbody,
  Td,
} from '@chakra-ui/react';

const AdminUser = props => {
  const initialState = {
    page_number: 1,
    number_of_pages: 0,
    items_per_page: 5,
    users: null,
  };
  const [state, setState] = React.useState(initialState);
  const api_url = process.env.REACT_APP_API_URL;
  const { state: myState } = React.useContext(MyContext);

  React.useEffect(() => {
    console.log('state', state);
    // fetch(api_url + 'users?page_size=5&page_number=1', {
    fetch(
      api_url +
        `users?page_size=${state.items_per_page}&page_number=${state.page_number}`,
      {
        headers: {
          Authorization: `Bearer ${myState.token}`,
        },
      }
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(resJson => {
        console.log(resJson);
        let data = {
          ...state,
          users: resJson.users,
          number_of_pages: resJson.number_of_pages
        };
        setState(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [state.page_number]);

  return (
    <Fragment>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Username</Th>
            <Th>Phone</Th>
          </Tr>
        </Thead>
        <Tbody>
          {state.users &&
            state.users.map((user, index) => (
              <Tr>
                <Td>{index}</Td>
                <Td>{user.username}</Td>
                <Td>{user.phone}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <Center>
        <Stack direction="row">
          <Button
            colorScheme="teal"
            disabled={state.page_number === 1 ? true : false}
            onClick={() =>
              setState({ ...state, page_number: state.page_number - 1 })
            }
          >
            Prev Page
          </Button>
          <Button
          colorScheme="teal"
          disabled={state.page_number === state.number_of_pages ? true : false}
            // rightIcon={<ArrowForwardIcon />}
            onClick={() =>
              setState({ ...state, page_number: state.page_number + 1 })
            }
          >
            Next Page
          </Button>
        </Stack>
      </Center>
    </Fragment>
  );
};

export default AdminUser;
