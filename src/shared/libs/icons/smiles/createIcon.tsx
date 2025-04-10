import * as React from 'react';

import { PlusIcon } from '../__generated/general/Plus';

export type IconProps<IconName> = {
  /**
   * size of icon (outer boundaries)
   * @default 24
   * */
  size?: number
  /** name of icon in icon set provided */
  name: IconName
}

type IconComponentDescriptor<IconSet> = {
  /** component name, something line "Icon" or "Icon.Smth"
   *
   * also display name of the component
   */
  componentName: string
  /** set of icons to choose from; must comply to interface `{[name]: React.FC<..>, ...}` */
  iconSet: IconSet
  /** default size of the icon */
  defaultSize: number
  /** fallback icon component will be rendered in case we could not find "name" in iconSet */
  fallbackIconComponent?: React.FC<{ size?: number }>
}

export const createIconComponent = <
  IconName extends string,
  IconSet extends { [key in IconName]: React.FC<any> }
>(
        descriptor: IconComponentDescriptor<IconSet>,
    ) => {
    const {
        componentName, defaultSize, fallbackIconComponent = PlusIcon, iconSet,
    } = descriptor;

    const IconComponent: React.FC<IconProps<IconName>> = ({ name, size = defaultSize, ...props }) => {
        const isIconPresentInSet = iconSet.hasOwnProperty(name);

        if (!isIconPresentInSet) {
            console.warn(`${componentName}: icon with name="${name}" was not found!;`);
        }

        const IconComponent = isIconPresentInSet ? iconSet[name] : fallbackIconComponent;

        return <IconComponent size={size} {...props} />;
    };

    IconComponent.displayName = componentName;

    return IconComponent;
};
