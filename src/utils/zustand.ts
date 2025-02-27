import type { Parameters_, Selector } from "@/types/zustand.type";
import type { StoreApi, UseBoundStore } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";
type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
): WithSelectors<S> => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/explicit-function-return-type
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

function createSelector<T, S>(
  store: UseBoundStore<StoreApi<T>>,
  key: keyof T
): Selector<typeof store, S> {
  return (state) => state[key as never];
}

function useGenericStore<U, S>(
  store: UseBoundStore<StoreApi<S>>,
  selector: Parameters_<U, S>[1],
  equalityFn?: Parameters_<U, S>[2]
): U {
  return useStoreWithEqualityFn(store, selector, equalityFn);
}

export function createGetterHook<T, S>(
  store: UseBoundStore<StoreApi<T>>,
  key: keyof T
): { getter: () => S; useStore: () => S } {
  const selector = createSelector<T, S>(store, key);
  const getter = (): S => selector(store.getState());
  const useStore = (): S => useGenericStore(store, selector);
  return {
    getter: typeof getter() === "function" ? (getter() as () => S) : getter,
    useStore,
  };
}
