import React, { Fragment } from 'react';
import { MyContext } from '../App';

import {
  Center,
  SimpleGrid,
  VStack,
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
  Image,
  Button,
  ButtonGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

const HomeGuest = props => {
  const initialState = {
    current_page: 1,
    number_of_pages: 0,
    items_per_page: 6,
    arts: null,
    modal_image: null,
    modal_title: null,
    modal_artist: null,
    modal_description: null,
  };
  const [state, setState] = React.useState(initialState);
  const api_url = process.env.REACT_APP_API_URL;
  const { state: myState } = React.useContext(MyContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const getItems = () => {
    // console.log('in fetch');
    // console.log('page number:', state.current_page);
    // // console.log('in fetch')
    fetch(
      api_url +
        `art?page_size=${state.items_per_page}&page_number=${state.current_page}`,
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
        // console.log('resJson', resJson);
        let data = {
          ...state,
          arts: resJson.arts,
          number_of_pages: resJson.number_of_pages,
        };
        setState(data);
      })
      .catch(error => {
        // console.log(error);
      });
  };

  React.useEffect(() => {
    // console.log('state', state);
    // fetch(api_url + 'users?page_size=5&current_page=1', {
    getItems();
  }, [state.current_page]);

  return (
    <Fragment>
      <SimpleGrid minChildWidth="180px" spacing="40px" m={5}>
        {state.arts &&
          state.arts.map(art => (
            <Box
              maxW="md"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Image
                src={art.image}
                alt={'Art image'}
                onClick={() => {
                  setState({
                    ...state,
                    modal_image: art.image,
                    modal_title: art.name,
                    modal_artist: art.artist,
                    modal_description: art.description,
                  });
                  onOpen();
                }}
              />

              <Box p="6">
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {art.name}
                </Box>
              </Box>
            </Box>
          ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl"
      scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{state.modal_title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
            <Image src={state.modal_image} alt={'Art image'} w={'60%'} />
            <Box 
            // textAlign="left"
            // align="left"
            // left
            >
                {state.modal_title}
            </Box>
            <Box>
                By: {state.modal_artist}
            </Box>
            <Box>
                {state.modal_description}
            </Box>
            </VStack>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
           </ModalFooter> */}
        </ModalContent>
      </Modal>

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

export default HomeGuest;
