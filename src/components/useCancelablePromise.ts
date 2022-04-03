import { useRef, useEffect } from "react";

export function makeCancelable<T>(promise: Promise<T>) {
  let isCanceled = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise
      .then((value) =>
        isCanceled ? reject({ isCanceled, value }) : resolve(value)
      )
      .catch((error) => (isCanceled ? reject({ isCanceled }) : reject(error)));
  });

  return {
    promise: wrappedPromise,
    cancel() {
      isCanceled = true;
    },
  };
}

export function useCancelablePromise(cancelable = makeCancelable) {
  const emptyPromise = Promise.resolve(true);

  // test if the input argument is a cancelable promise generator
  if (cancelable(emptyPromise).cancel === undefined) {
    throw new Error(
      "promise wrapper argument must provide a cancel() function"
    );
  }

  const promises = useRef<
    {
      raw: Promise<any>;
      wrapped: {
        promise: Promise<unknown>;
        cancel(): void;
      };
    }[]
  >([]);

  useEffect(() => {
    return function cancel() {
      promises.current.forEach(({ wrapped }) => wrapped.cancel());
      promises.current = [];
    };
  }, []);

  // useEffect(() => {
  //   console.log(promises);
  // });

  function cancelablePromise<T>(p: Promise<T>) {
    for (let i = 0; i < promises.current.length; i++) {
      if (promises.current[i].raw == p)
        return promises.current[i].wrapped.promise as Promise<T>;
    }
    const cPromise = cancelable(p);
    promises.current.push({
      raw: p,
      wrapped: cPromise,
    });
    return cPromise.promise as Promise<T>;
  }

  return {
    /**
     * use this wrap a Promise which will throw an error with `error.isCanceled` is `true`
     * and `error.value` which is the canceled but returned value when unmount.
     * If your set Image is
     *
     */
    cancelablePromise,
  };
}
