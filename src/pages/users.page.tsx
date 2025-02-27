import { useGetUsers } from "@/api/users.query";
import { UsersDataTable } from "@/components/users/data-table.component";
import { usersColumns } from "@/components/users/table-columns.component";
import UsersTableHeader from "@/components/users/table-header.component";
import { usersStyles } from "@/styles/users.styles";
import type { FunctionComponent } from "@/types/react.type";
import { UsersType } from "@/types/users.type";
import { Icons } from "@/ui/icons";
import { useEffect, useState } from "react";

export default function UsersPage(): FunctionComponent {
  const [globalFilter, setGlobalFilter] = useState("");
  const [users, setUsers] = useState<Array<UsersType>>([]);

  const {
    data: usersData,
    isFetching,
    isError: isGetWithError,
  } = useGetUsers();

  useEffect(() => {
    if (usersData?.users && !isGetWithError) {
      setUsers(usersData?.users ?? []);
    } else {
      setUsers([]);
    }
  }, [usersData?.users, isGetWithError]);

  return (
    <>
      <main className={usersStyles.main}>
        <div className={usersStyles.titleContainer}>
          <span className={usersStyles.title}>Usuários</span>
        </div>

        <div className={usersStyles.content}>
          {isFetching ? (
            <div className={usersStyles.loaderContainer}>
              <Icons.loader2Icon className={usersStyles.loader} />
            </div>
          ) : (
            <>
              <UsersTableHeader
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />

              <UsersDataTable
                columns={usersColumns()}
                data={users}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </>
          )}
        </div>
      </main>
    </>
  );
}
