import { iconSet } from '../__generated/colored';
import type { IconName } from '../__generated/colored';
import { createIconComponent } from '../createIcon';

export { iconSet };
export type { IconName };

export const ColoredIcon = createIconComponent<IconName, typeof iconSet>({
    componentName: 'ColoredIcon',
    iconSet,
    defaultSize: 24,
});
