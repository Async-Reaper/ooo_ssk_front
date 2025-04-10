import * as React from 'react';
import {SVGAttributes} from 'react';

import {useIconColor} from './useIconColor';
import {PlusIcon} from '../__generated/general/Plus';

export type IconProps<IconName> = Omit<SVGAttributes<SVGElement>, 'color'> & {
  /** color of icon */
  color?: DesignSystemColors
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
  fallbackIconComponent?: React.FC<SVGAttributes<SVGElement> & { size?: number }>
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

    const IconComponent: React.FC<IconProps<IconName>> = ({
        color,
        name,
        size = defaultSize,
        ...props
    }) => {
        const isIconPresentInSet = iconSet.hasOwnProperty(name);

        const endColor = useIconColor(color);

        if (!isIconPresentInSet) {
            console.warn(`${componentName}: icon with name="${name}" was not found!;`);
        }

        const IconComponent = isIconPresentInSet ? iconSet[name] : fallbackIconComponent;

        return <IconComponent color={endColor} size={size} viewBox="0 0 24 24" {...props} />;
    };

    IconComponent.displayName = componentName;

    return IconComponent;
};
