import { UsersForm } from "@/schemas/users.schema";
import { useFetch, usePost } from "@/services/react-query";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export const useGetUsers = (): UseQueryResult<{ users: Array<UsersForm> }> =>
  useFetch(
    "/users",
    {},
    {
      queryKey: ["users", {}],
      retry: 1,
      staleTime: 1000 * 60,
    }
  );

export const usePostUsers = (): UseMutationResult<
  AxiosResponse,
  AxiosError,
  UsersForm
> => usePost("/users");
