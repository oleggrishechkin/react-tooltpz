import { createContext } from 'react';

const PortalNodeContext = createContext<HTMLElement>(document.body);

// eslint-disable-next-line import/no-default-export
export default PortalNodeContext;
