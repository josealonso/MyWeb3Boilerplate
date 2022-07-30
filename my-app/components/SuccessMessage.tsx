import { useState } from 'react';
import {
    Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, useDisclosure, ModalOverlay
}
    from '@chakra-ui/react';

export default function SuccessMessage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isModalOpen, setIsModalOpen] = useState(true);

    setInterval(() => {
        setIsModalOpen(false);
    }, 3000);

    return (
        <>
            <Modal isCentered isOpen={isModalOpen} onClose={onClose}>
                <ModalOverlay
                    bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)'
                />
                <ModalContent>
                    <ModalHeader>GOOD NEWS</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Your tokens have been minted!</Text>
                        <Text>Let's make the token visible in your wallet</Text>
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button onClick={onClose}>Close</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
