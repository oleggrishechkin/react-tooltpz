import { createPortal } from 'react-dom';
import { ReactElement, ReactNode, useContext } from 'react';
import PortalNodeContext from './PortalNodeContext';

interface PortalProps {
    children?: ReactNode;
    portalNode?: HTMLElement;
}

const Portal = ({ children, portalNode }: PortalProps): ReactElement => {
    const contextPortalNode = useContext(PortalNodeContext);

    return createPortal(children || null, portalNode || contextPortalNode);
};

export default Portal;
