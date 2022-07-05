import { Container, Divider, Flex, VStack } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Image from 'next/image';
import AddTxButton from '../components/AddTxButton';
import MyConnectButton from '../components/MyConnectButton';
import MyFooter from '../components/MyFooter';
import MyHeader from '../components/MyHeader';

import styles from '../styles/Home.module.css'

// export default function Home(): AppProps {
export default function Home() {
  return (
    <Container maxH="container.xl" p={0}>
      <MyHeader />
      <Divider p={5} />
      <MyConnectButton />
      <Flex h="100vh" py={20}>
        <VStack>
          <h3>Hola a todos</h3>
          <AddTxButton />
          <VStack>
            <MyFooter />
          </VStack>
        </VStack>
      </Flex>
    </Container>
  )
}
