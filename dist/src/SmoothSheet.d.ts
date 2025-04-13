import React, { ReactNode } from 'react';
export type SmoothSheetRef = {
    close: () => void;
};
type Props = {
    isVisible: boolean;
    onClose: () => void;
    snapPoint?: number;
    children: ReactNode;
};
declare const SmoothSheet: React.ForwardRefExoticComponent<Props & React.RefAttributes<SmoothSheetRef>>;
export default SmoothSheet;
