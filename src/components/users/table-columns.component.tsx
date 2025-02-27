import { dataTableStyles } from "@/styles/users.styles";
import { UsersType } from "@/types/users.type";
import { Button } from "@/ui/button";
import { Icons } from "@/ui/icons";
import { ColumnDef } from "@tanstack/react-table";

export const usersColumns = (): Array<ColumnDef<UsersType>> => [
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
    cell: ({ row }) => (row?.original?.status ? "ATIVO" : "INATIVO"),
  },
];
