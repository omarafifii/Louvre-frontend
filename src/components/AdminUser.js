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
  ButtonGroup,
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
    current_page: 1,
    number_of_pages: 0,
    items_per_page: 5,
    users: null,
  };
  const [state, setState] = React.useState(initialState);
  const api_url = process.env.REACT_APP_API_URL;
  const { state: myState } = React.useContext(MyContext);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= state.number_of_pages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <Button
        key={number}
        id={number}
        onClick={() =>
          // handlePageClick(number)
          setState({ ...state, current_page: number })
        }
        bg={number === state.current_page ? 'blue.400' : ''}
        // colorScheme={(number === state.current_page)?"blue":""}

        // bg="blue.400"
      >
        {number}
      </Button>
    );
  });

  React.useEffect(() => {
    // console.log('state', state);
    // fetch(api_url + 'users?page_size=5&current_page=1', {
    fetch(
      api_url +
        `users?page_size=${state.items_per_page}&page_number=${state.current_page}`,
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
        // console.log(resJson);
        let data = {
          ...state,
          users: resJson.users,
          number_of_pages: resJson.number_of_pages,
        };
        setState(data);
      })
      .catch(error => {
        // console.log(error);
      });
  }, [state.current_page]);

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
                {/* <Td>{index}</Td> */}
                <Td>
                  {index + state.items_per_page * (state.current_page - 1)}
                </Td>
                <Td>{user.username}</Td>
                <Td>{user.phone}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <Center>
        <ButtonGroup m={5} size="sm" isAttached variant="outline">
          <Button
            // colorScheme="teal"
            disabled={state.current_page === 1 ? true : false}
            onClick={() =>
              setState({ ...state, current_page: state.current_page - 1 })
            }
          >
            Prev Page
          </Button>
          {renderPageNumbers}
          <Button
            // colorScheme="teal"
            disabled={
              state.current_page === state.number_of_pages ? true : false
            }
            // rightIcon={<ArrowForwardIcon />}
            onClick={() =>
              setState({ ...state, current_page: state.current_page + 1 })
            }
          >
            Next Page
          </Button>
        </ButtonGroup>
      </Center>
    </Fragment>
  );
};

export default AdminUser;
