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
  Text,
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

const AdminArt = props => {
  const initialState = {
    page_number: 1,
    number_of_pages: 0,
    items_per_page: 5,
    arts: null,
    deleted: false,
  };
  const [state, setState] = React.useState(initialState);
  const api_url = process.env.REACT_APP_API_URL;
  const { state: myState } = React.useContext(MyContext);

//   const handleDelete = () => {
//     fetch(
//         api_url +
//           `art`,
//         {
//             method: 'delete',
//           headers: {
//             Authorization: `Bearer ${myState.token}`,
//           },
//         }
//       )
//         .then(res => {
//           if (res.ok) {
//             return res.json();
//           } else {
//             throw res;
//           }
//         })
//         .then(resJson => {
//           console.log(resJson);
//           let data = {
//             ...state,
//             arts: resJson.arts,
//             number_of_pages: resJson.number_of_pages,
//             deleted: false,
//           };
//           setState(data);
//         })
//         .catch(error => {
//           console.log(error);
//         });
//   }
const handleDelete = (e) => {
    const song = e.target.getAttribute('data-item');
    console.log('We need to get the details for ', {song});
  }

  React.useEffect(() => {
    console.log('state', state);
    // fetch(api_url + 'users?page_size=5&page_number=1', {
    fetch(
      api_url +
        `art?page_size=${state.items_per_page}&page_number=${state.page_number}`,
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
          arts: resJson.arts,
          number_of_pages: resJson.number_of_pages,
          deleted: false,
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
            <Th>Item</Th>
            <Th>Name</Th>
            <Th>Artist</Th>
            <Th>Description</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {state.arts &&
            state.arts.map(art => (
              <Tr key={art._id}>
                <Td>
                  <img src={art.image} />
                </Td>
                <Td>{art.name}</Td>
                <Td>{art.artist}</Td>
                <Td>
                  <Text noOfLines={2}>{art.description}</Text>
                </Td>
                <Td>
                  <Button
                   data-item={art} 
                  colorScheme="red"
                  onClick={handleDelete}
                  >Delete</Button>
                </Td>
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
            disabled={
              state.page_number === state.number_of_pages ? true : false
            }
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

export default AdminArt;
