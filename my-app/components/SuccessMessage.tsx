import { useState } from 'react';
import {
    Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, useDisclosure, ModalOverlay, Button
}
    from '@chakra-ui/react';

export default function SuccessMessage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isModalOpen, setIsModalOpen] = useState(true);

    function closePopup() {
        console.log(" ========================= Inside closePopup");
        setIsModalOpen(false);
    }

    // setInterval(() => {
    //     setIsModalOpen(false);
    // }, 3000);

    return (
        <div>
            <Modal isCentered isOpen={isModalOpen} onClose={onClose}>
                <ModalOverlay
                    bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)'
                />
                <ModalContent>
                    <ModalHeader>GOOD NEWS</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Your tokens have been minted!</Text>
                        <Text>Let us make the token visible in your wallet</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={closePopup}>OK</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
