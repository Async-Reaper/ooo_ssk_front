import React, { useState } from "react";
import { AppImage, Button, HStack } from "../../../../shared/ui";
import { Modal } from "../../../../shared/ui/Modal/Modal";
import { INomenclature } from "../..";
import { __API__ } from "../../../../shared/protocols/api";
import cls from "./NomenclatureInfo.module.scss";

interface NomenclatureInfoProps {
  isOpen: boolean;
  onClose: () => void;
  nomenclature: INomenclature;
}

const Component = ({ isOpen, onClose, nomenclature }: NomenclatureInfoProps) => {
  const [pictureIndex, setPicture] = useState(0);
  const lenghtPictures = nomenclature!.pictures.length;
  const onHandleSwipe = (operand: string) => {
    if (operand === "+") {
      if (pictureIndex + 1 !== lenghtPictures) { setPicture(pictureIndex + 1); }
    } else if (pictureIndex - 1 >= 0) { setPicture(pictureIndex - 1); }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="slider"
    >
      <HStack className={cls.slider_wrap} gap="16">
        <Button size="s" variant="outlined" onClick={() => { onHandleSwipe("-"); }}>
          {"<"}
        </Button>
        <AppImage className={cls.image_wrap} src={__API__ + nomenclature!.pictures[pictureIndex].path} />
        <Button size="s" variant="outlined" onClick={() => { onHandleSwipe("+"); }}>
          {">"}
        </Button>
      </HStack>
    </Modal>
  ); 
};

export const NomenclatureInfo = React.memo(Component);
