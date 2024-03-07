import copy from "copy-to-clipboard";
import { useCallback, useEffect, useState } from "react";


const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback((text: string) => {
    const result = copy(text);
    setIsCopied(result);
  }, []);

  useEffect(() => {
    let timeout: number;
    if (isCopied) {
      timeout = setTimeout(() => {
        setIsCopied(false);
      }, 1000)
    }

    return () => {
      clearTimeout(timeout);
    }
  }, [isCopied]);

  return { isCopied, copyToClipboard } as const
}

export default useCopyToClipboard;