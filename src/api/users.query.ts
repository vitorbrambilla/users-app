import { useFetch } from "@/services/react-query";
import { UsersType } from "@/types/users.type";
import { UseQueryResult } from "@tanstack/react-query";

export const useGetUsers = (): UseQueryResult<{ users: Array<UsersType> }> =>
  useFetch(
    "/users",
    { page_size: 9999 },
    {
      queryKey: ["users", {}],
      retry: 1,
      staleTime: 1000 * 60,
    }
  );
