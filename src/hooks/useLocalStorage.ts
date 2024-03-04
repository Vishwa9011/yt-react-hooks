import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";

type InitialValue<T> = T | (() => T);

function resolveValueOrFunction<T>(initialValue: InitialValue<T>): T {
  return initialValue instanceof Function ? initialValue() as T : initialValue;
}

// const useLocalStorage = <T>(key: string, initialValue?: T) => {

//   const [value, setValue] = useState<T>(() => {
//     const storedValue = localStorage.getItem(key);
//     try {
//       if (storedValue === "undefined" || storedValue === null) {
//         return resolveValueOrFunction(initialValue);
//       } else {
//         return JSON.parse(storedValue);
//       }
//     } catch (error) {
//       console.log('Error in localStorage: ', error);
//       return resolveValueOrFunction(initialValue);
//     }
//   });

//   useEffect(() => {
//     try {
//       localStorage.setItem(key, JSON.stringify(value));
//     } catch (error) {
//       console.log('Error in setting localStorage: ', error);
//     }
//   }, [value]);

//   return [value, setValue] as const;
// }

// export default useLocalStorage;

type LocalStorageEvent<T> = { key: string, value: T };

const dispatchLocalStorage = <T>(key: string, value: T) => {
  const event = new CustomEvent<LocalStorageEvent<T>>("localStorageChange", { detail: { key, value } });
  dispatchEvent(event);
};

const useLocalStorage = <T>(key: string, initialValue?: InitialValue<T>) => {

  const subscribe = useCallback((cb: () => void): (() => void) => {
    const listener = (event: CustomEvent<LocalStorageEvent<T>>) => {
      if (event.detail.key === key) {
        cb();
      }
    };
    window.addEventListener("localStorageChange", listener as EventListener);
    return () => window.removeEventListener("localStorageChange", listener as EventListener);
  }, [key]);

  const getSnapshot = useCallback((): T => {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null || storedValue === "undefined") {
      return initialValue === undefined ? undefined as T : resolveValueOrFunction<T>(initialValue);
    } else {
      try {
        return JSON.parse(storedValue);
      } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
        return initialValue === undefined ? undefined as T : resolveValueOrFunction<T>(initialValue);
      }
    }
  }, [key, initialValue]);

  const value = useSyncExternalStore(subscribe, getSnapshot);

  const setValue = useCallback((newValue: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      dispatchLocalStorage(key, newValue);
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  }, [key]);

  return [value, setValue] as const;
};

export default useLocalStorage;
