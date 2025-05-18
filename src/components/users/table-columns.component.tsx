import { UsersForm } from "@/schemas/users.schema";
import { dataTableStyles, newUserModalStyles } from "@/styles/users.styles";
import { Button } from "@/ui/button";
import { Icons } from "@/ui/icons";
import { Switch } from "@/ui/switch";
import { cn } from "@/utils/tailwind";
import { ColumnDef } from "@tanstack/react-table";

export const usersColumns = (
  handleEdit: (item: UsersForm) => void,
  handleDelete: (item: UsersForm) => void
): Array<ColumnDef<UsersForm>> => [
  {
    accessorKey: "name",
    header: ({ column }): JSX.Element => (
      <Button
        variant="outline"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
        className={dataTableStyles.sortHeader}
      >
        Nome
        <Icons.arrowUpDown className={dataTableStyles.sortIcon} />
      </Button>
    ),
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Switch
        checked={row?.original?.status}
        className={cn([newUserModalStyles.switch, "cursor-default"])}
      />
    ),
  },
  {
    accessorKey: "actions",
    header: (): JSX.Element => (
      <div className={cn([dataTableStyles.flexCenter, "pl-2"])}>
        <span>Ações</span>
      </div>
    ),
    cell: ({ row }): JSX.Element => (
      <div className={cn([dataTableStyles.flexCenter, "gap-4"])}>
        <Icons.pencil
          className={dataTableStyles.actionIcon}
          onClick={() => {
            handleEdit(row.original);
          }}
        />

        <Icons.trash2
          className={dataTableStyles.actionIcon}
          onClick={() => {
            handleDelete(row.original);
          }}
        />
      </div>
    ),
  },
];
