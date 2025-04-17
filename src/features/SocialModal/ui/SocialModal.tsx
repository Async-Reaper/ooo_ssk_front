import React from "react";
import { Modal } from "@shared/ui/Modal/Modal";
import { AppImage, Button, Typography } from "@shared/ui";
import cls from "./SocialModal.module.scss";

interface SocialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SocialModal = React.memo(({ isOpen, onClose }: SocialModalProps) => {
  const handleClose = () => {
    localStorage.setItem("isModalSocialView", "true");
    onClose();
  };
  
  const openTG = () => {
    window.open("https://t.me/cck_snack");
  };

  const openVK = () => {
    window.open("https://vk.com/cck_nvkz_snacks");
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="l"
      className={cls.social__modal}
    >
      <AppImage className={cls.decoration__left} src="/common/decoration-left.svg" />
      <AppImage className={cls.decoration__right} src="/common/decoration-right.svg" />
      <div className={cls.promo__wrapper}>
        <Typography variant="h1" font="secondary" align="center" uppercase color="green-primary">
          У НАС ПОЯВИЛСЯ ТЕЛЕГРАММ КАНАЛ
        </Typography>
        <Typography variant="h2" font="secondary" align="center" uppercase color="white-bg">
          Скорее подписывайтесь
        </Typography>
        <div className={cls.button__group}>
          <Button variant="outlined" className={cls.button__tg} size="xl" onClick={openTG}>
            <Typography variant="h4" bold>
              Телеграмм
            </Typography>
          </Button>
          <Button variant="outlined" className={cls.button__vk} size="xl" onClick={openVK}>
            <Typography variant="h4" color="green-primary" bold>
              Группа ВК
            </Typography>
          </Button>
        </div>
        <Typography variant="h3" font="secondary" align="center" uppercase color="white-bg">
          А также не забывайте про нашу группу в вк
        </Typography>
      </div>
    </Modal>
  );
});
