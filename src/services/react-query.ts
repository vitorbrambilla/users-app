import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryFunctionContext,
  type UseQueryOptions
} from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { api } from "./api";

type QueryKeyT = readonly [string, object | undefined];

export const fetcher = async <T>({
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKeyT>): Promise<T> => {
  const [url, parameters] = queryKey;

  const response = await api.get<T>(url, {
    params: { ...parameters, pageParam },
  });
  return response.data;
};

export const usePrefetch = <T>(url: string | null, parameters?: object) => {
  const queryClient = useQueryClient();

  return async () => {
    if (!url) {
      return;
    }

    const queryKey: QueryKeyT = [url, parameters];

    await queryClient.prefetchQuery<T, Error, T, QueryKeyT>({
      queryKey,
      queryFn: fetcher,
    });
  };
};

export const useFetch = <T>(
  url: string | null,
  parameters?: object,
  config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
  const queryKey: QueryKeyT = [url!, parameters];

  const context = useQuery<T, Error, T, QueryKeyT>({
    queryKey,
    queryFn: async (context) =>
      await fetcher<T>({
        ...context,
        queryKey,
      } as QueryFunctionContext<QueryKeyT>),
    enabled: !!url,
    ...config,
  });

  return context;
};

export const useFetchWithId = <T>(
  url: string | null,
  id?: number | string,
  parameters?: object,
  config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
  const queryKey: QueryKeyT = [`${url}/${id}`!, parameters];

  const context = useQuery<T, Error, T, QueryKeyT>({
    queryKey,
    queryFn: async (context) =>
      await fetcher<T>({
        ...context,
        queryKey,
      } as QueryFunctionContext<QueryKeyT>),
    enabled: !!url && !!id,
    ...config,
  });

  return context;
};

const useGenericMutation = <T, S>(
  fn: (data: T | S) => Promise<AxiosResponse<S>>,
  url: string,
  parameters?: object,
  updater?: ((oldData: T, newData: S) => T) | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, T | S>({
    mutationFn: fn,
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [url!, parameters],
        exact: true,
      });

      const previousData = queryClient.getQueryData([url, parameters]);

      queryClient.setQueryData<T>([url, parameters], (oldData) => {
        return updater ? updater(oldData!, data as S) : (data as T);
      });

      return previousData;
    },
    onError: (_e, _v, context) => {
      queryClient.setQueryData([url, parameters], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [url!, parameters],
        exact: true,
      });
    },
  });
};

export const useDelete = <T>(
  url: string,
  parameters?: object,
  updater?: (oldData: T, id: string | number) => T
) => {
  return useGenericMutation<T, string | number>(
    (id) => api.delete(`${url}/${id}`),
    url,
    parameters,
    updater
  );
};

export const usePost = <T, S>(
  url: string,
  parameters?: object,
  updater?: (oldData: T, newData: S) => T
) => {
  return useGenericMutation<T, S>(
    (data) => api.post<S>(url, data),
    url,
    parameters,
    updater
  );
};

export const usePatch = <T, S>(
  url: string,
  parameters?: object,
  updater?: (oldData: T, newData: S) => T
) => {
  return useGenericMutation<T, S>(
    (data) => api.patch<S>(url, data),
    url,
    parameters,
    updater
  );
};

export const usePut = <T, S>(
  url: string,
  parameters?: object,
  updater?: (oldData: T, newData: S) => T
) => {
  return useGenericMutation<T, S>(
    (data) => api.put<S>(url, data),
    url,
    parameters,
    updater
  );
};
