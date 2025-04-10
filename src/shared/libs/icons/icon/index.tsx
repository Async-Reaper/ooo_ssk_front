import { iconSet } from '../__generated/general';
import type { IconName } from '../__generated/general';
import { createIconComponent } from '../createIcon';

export { iconSet };
export type { IconName };

export const Icon = createIconComponent<IconName, typeof iconSet>({
    componentName: 'Icon',
    iconSet,
    defaultSize: 24,
});
