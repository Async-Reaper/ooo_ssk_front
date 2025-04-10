import * as React from 'react';
import { FireIcon as fire } from './Fire';

import { createIconComponent } from './createIcon';

export type IconName = 'fire'

export const iconSet: {
  [key in IconName]: React.FC<{ size?: number; name?: IconName | undefined }>
} = {
    // @ts-ignore
    fire,
};

export const Emoji = createIconComponent<IconName, typeof iconSet>({
    componentName: 'Emoji',
    iconSet,
    defaultSize: 24,
});
