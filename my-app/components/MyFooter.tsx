import { Text, Image } from "@chakra-ui/react";
import { AppProps } from "next/app";

const MyFooter = () => {
    return (
        <>
            <Text>
                Powered by{' '}
            </Text>
            <Image src="/petete.jpg"
                alt="JR Logo" width={90} height={40} /></>
    );
};

export default MyFooter;
