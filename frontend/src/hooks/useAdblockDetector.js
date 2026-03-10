import { useState, useEffect, useCallback, useRef } from 'react';
import { detectAdblock, sendAdblockLog } from '../utils/adblockDetect';

/**
 * useAdblockDetector — React hook for adblock detection.
 *
 * @param {Object}  [config]
 * @param {string}  [config.logEndpoint]  - Server endpoint for logging
 * @param {string}  [config.baitPath]     - Bait file URL
 * @param {string}  [config.location]     - Page identifier for logging
 * @param {boolean} [config.skip]         - Skip detection entirely
 * @returns {{ detected: boolean|null, loading: boolean, retry: Function, details: Object|null }}
 */
const useAdblockDetector = (config = {}) => {
  const {
    logEndpoint = '/api/log/adblock',
    baitPath,
    location: pageLocation,
    skip = false,
  } = config;

  const [detected, setDetected] = useState(null);
  const [loading, setLoading] = useState(!skip);
  const [details, setDetails] = useState(null);
  const hasLogged = useRef(false);

  const runDetection = useCallback(async () => {
    setLoading(true);
    hasLogged.current = false;

    try {
      const options = {};
      if (baitPath) options.baitUrl = baitPath;

      const result = await detectAdblock(options);

      setDetected(result.detected);
      setDetails(result.details);

      // Log once per detection run
      if (!hasLogged.current) {
        hasLogged.current = true;
        sendAdblockLog(
          {
            detected: result.detected,
            details: result.details,
            location: pageLocation || 'calculator',
          },
          logEndpoint,
        );
      }
    } catch {
      // On error, assume no adblock so the user can continue
      setDetected(false);
      setDetails(null);
    } finally {
      setLoading(false);
    }
  }, [baitPath, logEndpoint, pageLocation]);

  useEffect(() => {
    if (skip) {
      setLoading(false);
      setDetected(false);
      return;
    }
    runDetection();
  }, [skip, runDetection]);

  const retry = useCallback(() => {
    runDetection();
  }, [runDetection]);

  return { detected, loading, retry, details };
};

export default useAdblockDetector;
