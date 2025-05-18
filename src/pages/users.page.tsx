import {
  useDeleteUser,
  useGetUsers,
  usePostUsers,
  usePutUsers,
} from "@/api/users.query";
import { UsersDataTable } from "@/components/users/data-table.component";
import NewUserModal from "@/components/users/new-user-modal.component";
import { usersColumns } from "@/components/users/table-columns.component";
import UsersTableHeader from "@/components/users/table-header.component";
import { toast } from "@/hooks/use-toast";
import { UsersForm } from "@/schemas/users.schema";
import { usersStyles } from "@/styles/users.styles";
import type { FunctionComponent } from "@/types/react.type";
import { CustomAlertDialog } from "@/ui/custom-alert-dialog";
import { Icons } from "@/ui/icons";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const handleRequestError = (error: AxiosError): void => {
  const message =
    (error.response?.data as { error: string })?.error ??
    "Ocorreu um erro. Por favor, tente novamente.";

  toast({
    title: "Erro",
    description: message,
    variant: "destructive",
  });
};

export default function UsersPage(): FunctionComponent {
  const [selected, setSelected] = useState<UsersForm>({} as UsersForm);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [users, setUsers] = useState<Array<UsersForm>>([]);

  const {
    data: usersData,
    isFetching,
    refetch,
    isError: isGetWithError,
  } = useGetUsers();
  const { mutate: post, isPending: isPostLoading } = usePostUsers();
  const { mutate: put, isPending: isPutLoading } = usePutUsers();
  const { mutate: deleteUser, isPending: isDeleteLoading } = useDeleteUser();

  const handleRequestSuccess = (type: "create" | "update" | "delete"): void => {
    if (type === "delete") {
      setIsDeleteModalOpen(false);
    } else {
      setIsNewUserModalOpen(false);
    }

    setSelected({} as UsersForm);

    toast({
      title: "Sucesso",
      description: `Usuário ${type === "create" ? "criado" : type === "update" ? "atualizado" : "excluído"} com sucesso.`,
      variant: "success",
    });

    void refetch();
  };

  const handleAction = (data: UsersForm): void => {
    const dataFormatted = {
      ...data,
      status: data?.status || false,
    };

    if (data?.id) {
      put(dataFormatted, {
        onSuccess: () => {
          handleRequestSuccess("update");
        },
        onError: handleRequestError,
      });
    } else {
      post(dataFormatted, {
        onSuccess: () => {
          handleRequestSuccess("create");
        },
        onError: handleRequestError,
      });
    }
  };

  const handleDelete = (): void => {
    deleteUser(selected.id, {
      onSuccess: () => {
        handleRequestSuccess("delete");
      },
      onError: handleRequestError,
    });
  };

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
                onOpenModal={() => {
                  setIsNewUserModalOpen(true);
                  setSelected({} as UsersForm);
                }}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />

              <UsersDataTable
                columns={usersColumns(
                  (item: UsersForm): void => {
                    setIsNewUserModalOpen(true);

                    setSelected(item);
                  },
                  (item: UsersForm): void => {
                    setSelected(item);

                    setIsDeleteModalOpen(true);
                  }
                )}
                data={users}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </>
          )}
        </div>
      </main>

      <NewUserModal
        open={isNewUserModalOpen}
        setOpen={setIsNewUserModalOpen}
        onConfirm={handleAction}
        selectedUser={selected}
        setSelectedUser={setSelected}
        isActionLoading={isPostLoading || isPutLoading}
      />

      <CustomAlertDialog
        title="Exclusão"
        description={`Deseja excluir o usuário "${selected?.name}"?`}
        open={isDeleteModalOpen}
        onOpenChange={() => {
          setSelected({} as UsersForm);
          setIsDeleteModalOpen(!isDeleteModalOpen);
        }}
        onAction={handleDelete}
        isActionLoading={isDeleteLoading}
      />
    </>
  );
}
