import { usersStyles } from "@/styles/users.styles";
import type { FunctionComponent } from "@/types/react.type";
import SearchInput from "@/ui/search-input";

interface IProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

export default function UsersTableHeader({
  globalFilter,
  setGlobalFilter,
}: IProps): FunctionComponent {
  return (
    <>
      <div className={usersStyles.headerContainer}>
        <SearchInput
          placeholder="O que procura?"
          wrapperClassName={usersStyles.searchInputWrapper}
          className={usersStyles.searchInput}
          iconClassName={usersStyles.searchInputIcon}
          value={globalFilter ?? ""}
          onChange={(event) => {
            setGlobalFilter(event.target.value);
          }}
        />
      </div>
    </>
  );
}
