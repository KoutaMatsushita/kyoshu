import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent } from "react";
import { User } from "../types";

export const EditNameModal: React.FC<{
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newName: string) => void;
}> = ({ currentUser, isOpen, onClose, onSave }) => {
  const [value, setValue] = React.useState(currentUser.displayName);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);
  const _onClose = () => {
    setValue(currentUser.displayName);
    onClose();
  };
  const _onSave = (e: FormEvent) => {
    e.preventDefault();
    onSave(value);
  };

  return (
    <Modal isOpen={isOpen} onClose={_onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>表示名変更</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={_onSave}>
          <ModalBody>
            <FormControl id="dislay-name" isRequired>
              <FormLabel>表示名</FormLabel>
              <Input placeholder="山田太郎" onChange={handleChange} value={value} isRequired />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              確定
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
