import React, { useRef, useEffect } from 'react';
function useDebounce(delay = 100, callback = () => {}) {
  const timeout = useRef(0);

  useEffect(() => {
    timeout.current = 0;
    return () => clearTimeout(timeout.current);
  }, []);

  function handleDebounce(...args) {
    const self = this;
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      callback.apply(self, args);
    }, delay);
  }

  return handleDebounce;
}

export default useDebounce;
