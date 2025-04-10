import React from 'react';
import styles from './styles.module.scss';

interface Props {
  size: number
}

const Component: React.FC<Props> = ({ size }) => (
    <div className={styles.emoji} style={{ width: `${size}px`, height: `${size}px` }}>
        🔥
    </div>
);

export const FireIcon = React.memo(Component);
