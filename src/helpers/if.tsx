import React, {Fragment, ReactNode} from 'react';

interface ifProps {
  show: boolean;
  children: ReactNode;
  fallback?: any;
}

export const If: React.FC<ifProps> = ({
  show = false,
  fallback = '',
  children,
}) => {
  return <Fragment>{show ? children : fallback}</Fragment>;
};
