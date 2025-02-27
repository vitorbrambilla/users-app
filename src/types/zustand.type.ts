import type { StoreApi, UseBoundStore } from "zustand";
import type { useStoreWithEqualityFn } from "zustand/traditional";

export type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;

export type Parameters_<U, S> = Parameters<
  typeof useStoreWithEqualityFn<UseBoundStore<StoreApi<S>>, U>
>;

export type Selector<S, U> = (state: ExtractState<S>) => U;
