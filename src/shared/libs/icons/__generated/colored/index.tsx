import * as React from 'react';
import {SVGAttributes} from 'react';
import {CheckboxIcon as checkbox} from './Checkbox';
import {ErrorIcon as error} from './Error';
import {FireIcon as fire} from './Fire';
import {LockIcon as lock} from './Lock';
import {PlusIcon as plus} from './Plus';
import {UnlockIcon as unlock} from './Unlock';
import {UsersIcon as users} from './Users';

export type IconName =
  | 'checkbox'
  | 'error'
  | 'fire'
  | 'lock'
  | 'plus'
  | 'unlock'
  | 'users';

export const iconSet: {
  [key in IconName]: React.FC<SVGAttributes<SVGElement> & {size?: number}>;
} = {
  checkbox,
  error,
  fire,
  lock,
  plus,
  unlock,
  users,
};
