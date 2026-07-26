import { useEffect, useRef } from 'react';

/**
 * PageLoader controller.
 * Manages the lifecycle of the initial HTML cinematic movie intro loader (#loader).
 * Calls onComplete callback when loading is done.
 */
const PageLoader = ({ onComplete }) => {
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const loader = document.getElementById('loader');
    if (!loader) {
      document.body.style.overflow = 'auto';
      onCompleteRef.current?.();
      return;
    }

    let transitionTimeout;

    const hideLoader = () => {
      // Add hidden class to trigger CSS fade-out transition
      loader.classList.add('hidden');

      // After transition completes, enable scroll and remove loader element
      transitionTimeout = setTimeout(() => {
        document.body.style.overflow = 'auto';
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
        onCompleteRef.current?.();
      }, 850);
    };

    // Keep loader active for 2.6s for full movie studio intro sequence
    const initialLoadTimer = setTimeout(hideLoader, 2600);

    return () => {
      clearTimeout(initialLoadTimer);
      clearTimeout(transitionTimeout);
    };
  }, []);

  return null;
};

export default PageLoader;
