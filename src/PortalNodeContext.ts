import { createContext } from 'react';

const PortalNodeContext = createContext<HTMLElement>(document.body);

export default PortalNodeContext;
