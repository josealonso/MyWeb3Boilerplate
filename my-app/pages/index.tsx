import { Container, Divider, Flex, VStack } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import AddTxButton from '../components/AddTxButton';
import MyConnectButton from '../components/MyConnectButton';
import MyFooter from '../components/MyFooter';
import MyHeader from '../components/MyHeader';

import styles from '../styles/Home.module.css'

// export default function Home(): AppProps {
export default function Home() {
  return (
    <Container maxW="container.xl" p={0}>
      <MyConnectButton />
      <MyHeader />
      <Divider p={5} />
      <Flex h="100vh" py={10}>
        <VStack w="full" h="full" p={10} spacing={10}
          alignItems="flex-start">
          <h3>First section</h3>
          <AddTxButton />
        </VStack >
        <VStack w="full" h="full" p={10} spacing={10}
          alignItems="flex-start" bg="gray.50">
          <h3>Second section</h3>
          <MyFooter />
        </VStack>
      </Flex>
    </Container>
  )
}
