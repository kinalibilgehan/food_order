import React, {ReactNode, ErrorInfo} from 'react';
import {reduxstore} from '../../reduxstore/reduxstore';
import {
  setGlobalErrorInfoValue,
  setGlobalErrorValue,
} from '../../appslices/errorSlice';

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {hasError: false};

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    reduxstore.dispatch(setGlobalErrorValue(error));
    reduxstore.dispatch(setGlobalErrorInfoValue(errorInfo));
    const navigator = reduxstore.getState().navigator.value;
    if (navigator) {
      navigator('/Error');
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
