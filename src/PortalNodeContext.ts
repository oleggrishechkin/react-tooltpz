import { createContext } from 'react';

export const PortalNodeContext = createContext(typeof document === 'undefined' ? null : document.body);
