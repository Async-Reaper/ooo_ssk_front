export const useIconColor = (color?: DesignSystemColors) => {
    if (!color) {
        return 'var(--color-gray-primary)';
    }

    return `var(--color-${color})`;
};
