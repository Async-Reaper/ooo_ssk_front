import * as React from 'react';
import {SVGAttributes} from 'react';
import {ArrowIcon as arrow} from './Arrow';
import {BurgerIcon as burger} from './Burger';
import {CasesIcon as cases} from './Cases';
import {CloseIcon as close} from './Close';
import {CopyIcon as copy} from './Copy';
import {DollarIcon as dollar} from './Dollar';
import {EyeIcon as eye} from './Eye';
import {HeadphonesIcon as headphones} from './Headphones';
import {HeartIcon as heart} from './Heart';
import {InstagramIcon as instagram} from './Instagram';
import {LightningIcon as lightning} from './Lightning';
import {LockIcon as lock} from './Lock';
import {LogoutIcon as logout} from './Logout';
import {MinusIcon as minus} from './Minus';
import {NoteIcon as note} from './Note';
import {NotificationIcon as notification} from './Notification';
import {PauseIcon as pause} from './Pause';
import {PlayIcon as play} from './Play';
import {PlusIcon as plus} from './Plus';
import {PointIcon as point} from './Point';
import {ReloadIcon as reload} from './Reload';
import {SendIcon as send} from './Send';
import {ShoppingCartIcon as shopping_cart} from './ShoppingCart';
import {SoundIcon as sound} from './Sound';
import {StartIcon as start} from './Start';
import {TelegramIcon as telegram} from './Telegram';
import {TiktokIcon as tiktok} from './Tiktok';
import {UnlockIcon as unlock} from './Unlock';
import {UpIcon as up} from './Up';
import {UpgradeIcon as upgrade} from './Upgrade';
import {UploadIcon as upload} from './Upload';
import {VkRoundIcon as vk_round} from './VkRound';
import {VkIcon as vk} from './Vk';
import {VolumeIcon as volume} from './Volume';
import {WalletIcon as wallet} from './Wallet';
import {YoutubeIcon as youtube} from './Youtube';

export type IconName =
  | 'arrow'
  | 'burger'
  | 'cases'
  | 'close'
  | 'copy'
  | 'dollar'
  | 'eye'
  | 'headphones'
  | 'heart'
  | 'instagram'
  | 'lightning'
  | 'lock'
  | 'logout'
  | 'minus'
  | 'note'
  | 'notification'
  | 'pause'
  | 'play'
  | 'plus'
  | 'point'
  | 'reload'
  | 'send'
  | 'shopping_cart'
  | 'sound'
  | 'start'
  | 'telegram'
  | 'tiktok'
  | 'unlock'
  | 'up'
  | 'upgrade'
  | 'upload'
  | 'vk_round'
  | 'vk'
  | 'volume'
  | 'wallet'
  | 'youtube';

export const iconSet: {
  [key in IconName]: React.FC<SVGAttributes<SVGElement> & {size?: number}>;
} = {
  arrow,
  burger,
  cases,
  close,
  copy,
  dollar,
  eye,
  headphones,
  heart,
  instagram,
  lightning,
  lock,
  logout,
  minus,
  note,
  notification,
  pause,
  play,
  plus,
  point,
  reload,
  send,
  shopping_cart,
  sound,
  start,
  telegram,
  tiktok,
  unlock,
  up,
  upgrade,
  upload,
  vk_round,
  vk,
  volume,
  wallet,
  youtube,
};
