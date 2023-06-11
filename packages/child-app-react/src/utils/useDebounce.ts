import React from 'react';

export default function useDebounce<T>(value: T,time:number): T {
  const [cacheValue, setCacheValue] = React.useState(value);
  React.useEffect(() => {
    const timeout = setTimeout(
      () => {
        setCacheValue(value);
      },
        time
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return cacheValue;
}
