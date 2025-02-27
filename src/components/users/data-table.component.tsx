import { dataTableStyles } from "@/styles/users.styles";
import { FunctionComponent } from "@/types/react.type";
import { Button } from "@/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { cn } from "@/utils/tailwind";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

export interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>;
  data: Array<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

function UsersDataTable<TData, TValue>({
  columns,
  data,
  globalFilter,
  setGlobalFilter,
}: DataTableProps<TData, TValue>): FunctionComponent {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      globalFilter,
    },
  });

  return (
    <>
      <Table className={dataTableStyles.table}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className={dataTableStyles.tableRow} key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={dataTableStyles.tableHead}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={dataTableStyles.cellTableRow}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      dataTableStyles.tableCell,
                      index === 0 && "rounded-l-[5px]",
                      index === row.getVisibleCells().length - 1 &&
                        "rounded-r-[5px]"
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className={dataTableStyles.tableRow}>
              <TableCell
                colSpan={columns.length}
                className={dataTableStyles.notFoundCell}
              >
                Nenhum resultado encontrado!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className={dataTableStyles.paginationContainer}>
        <Button
          size="sm"
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className={dataTableStyles.paginationButton}
        >
          Anterior
        </Button>

        <Button
          size="sm"
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className={dataTableStyles.paginationButton}
        >
          Próxima
        </Button>
      </div>
    </>
  );
}

export { UsersDataTable };
