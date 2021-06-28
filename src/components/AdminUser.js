import React, { Fragment } from 'react';
import { MyContext } from '../App';
import Header from './Header';

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

const AdminUser = props => {
  const initialState = {
    user_image: 'assets/nav/users/user_w@1x.svg',
    art_image: 'assets/nav/art/supervised_user_circle.svg',
  };
  const [data, setData] = React.useState(initialState);

  
  return (
    <div></div>
  );
};

export default AdminUser;
