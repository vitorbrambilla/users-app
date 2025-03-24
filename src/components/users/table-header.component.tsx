import { usersStyles } from "@/styles/users.styles";
import type { FunctionComponent } from "@/types/react.type";
import { Button } from "@/ui/button";
import { Icons } from "@/ui/icons";
import SearchInput from "@/ui/search-input";

interface IProps {
  onOpenModal: () => void;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

export default function UsersTableHeader({
  onOpenModal,
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

        <Button className={usersStyles.button} onClick={onOpenModal}>
          <Icons.squarePlus height={16} />
          NOVO USUÁRIO
        </Button>
      </div>
    </>
  );
}
