import React, { Fragment } from 'react';
import { MyContext } from '../App';
import Header from './Header';
import AdminArt from './AdminArt';
import AdminUser from './AdminUser';

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
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
} from '@chakra-ui/react';

const HomeAdmin = props => {
  const initialState = {
    user_image: 'assets/nav/users/user@1x.svg',
    art_image: 'assets/nav/art/supervised_user_circle.svg',
  };
  const [data, setData] = React.useState(initialState);

  const setTabImage = index => {
    // console.log('index ', index);
    let mydata;
    switch (index) {
      case 0:
        // console.log('case 0');
        mydata = {
          user_image: 'assets/nav/users/user@1x.svg',
          art_image: 'assets/nav/art/supervised_user_circle.svg',
        };
        setData(mydata);
        break;
      case 1:
        // console.log('case 1');
        mydata = {
          user_image: 'assets/nav/users/user_w@1x.svg',
          art_image: 'assets/nav/art/supervised_user_circle@1x.svg',
        };
        setData(mydata);
        break;
      default:
        return;
    }
  };

  return (
    <Tabs isLazy orientation="vertical" onChange={index => setTabImage(index)}>
      <TabList>
        <Tab _selected={{ bg: 'blue.500' }}>
          <img src={data.art_image} alt="" />
        </Tab>
        <Tab _selected={{ bg: 'blue.500' }}>
          <img src={data.user_image} alt="" />
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <AdminArt/>
        </TabPanel>
        <TabPanel>
          <AdminUser/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default HomeAdmin;
