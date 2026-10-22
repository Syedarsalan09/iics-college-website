import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

export default function useApiData(path) {
  const [result, setResult] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const requestKey = `${path}:${attempt}`;

  useEffect(() => {
    const controller = new AbortController();

    apiRequest(path, { signal: controller.signal })
      .then((data) => {
        setResult({ key: requestKey, data, error: "", loading: false });
      })
      .catch((requestError) => {
        if (requestError.name !== "AbortError") {
          setResult({
            key: requestKey,
            data: [],
            error: requestError.message,
            loading: false,
          });
        }
      });

    return () => controller.abort();
  }, [path, requestKey]);

  const retry = useCallback(() => {
    setAttempt((value) => value + 1);
  }, []);

  const currentResult =
    result?.key === requestKey
      ? result
      : { data: [], loading: true, error: "" };

  return { ...currentResult, retry };
}
