import { Container, Divider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import AddTxButton from '../components/AddTxButton';
import MyConnectButton from '../components/MyConnectButton';
import MyFooter from '../components/MyFooter';
import MyHeader from '../components/MyHeader';

import styles from '../styles/Home.module.css'
import TokenForm from '../components/TokenForm';

// export default function Home(): AppProps {
export default function Home() {
  return (
    <Container maxW="container.xl" p={0}>
      <MyConnectButton />
      <MyHeader />
      <Divider p={5} />
      {/* <Flex h="100vh" py={10}> */}
        <TokenForm />
        {/* <MyForm />
        <VStack w="full" h="full" p={10} spacing={10}
          alignItems="flex-start">
          <h3>Second section</h3>
          <MyFooter />
        </VStack> */}
      {/* </Flex> */}
    </Container>
  )
}
