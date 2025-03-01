import { useFetch } from "@/services/react-query";
import { UsersType } from "@/types/users.type";
import { UseQueryResult } from "@tanstack/react-query";

export const useGetUsers = (): UseQueryResult<{ users: Array<UsersType> }> =>
  useFetch(
    "/users",
    {},
    {
      queryKey: ["users", {}],
      retry: 1,
      staleTime: 1000 * 60,
    }
  );
