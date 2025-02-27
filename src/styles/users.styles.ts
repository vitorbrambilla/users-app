import { cn } from "@/utils/tailwind";

export const usersStyles = {
  main: cn(["w-full xl:w-[80%] px-4 xl:px-0 flex flex-col justify-center"]),
  titleContainer: cn(["h-auto flex justify-between px-2 mb-2"]),
  title: cn(["text-sm md:text-md font-normal leading-4 select-none"]),
  goBackButton: cn([
    "flex justify-center items-center gap-[6px] text-blue-dark-400 p-0 h-fit",
  ]),
  goBackText: cn(["text-xs font-bold leading-normal select-none"]),
  content: cn([
    "w-full h-[79vh] bg-complementary-white rounded-[20px] border border-primary-200 p-4 overflow-auto scroll_primary",
  ]),
  loaderContainer: cn(["flex justify-center items-center h-full"]),
  loader: cn(["size-8 animate-spin"]),
  headerContainer: cn([
    "sticky top-0 bg-complementary-white z-50 w-full p-4 flex flex-col md:flex-row justify-between items-center gap-y-4",
  ]),
  button: cn([
    "bg-primary-50 border border-primary-200 text-primary-300 w-[280px] max-w-full h-[34px] text-sm md:text-md font-normal leading-normal tracking-[4px] gap-[10px] rounded-sm",
    "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent",
  ]),
  searchInputWrapper: cn(["w-[280px] h-[34px]"]),
  searchInput: cn([
    "bg-primary-50 border border-primary-200 rounded-sm h-[34px]",
  ]),
  searchInputIcon: cn(["text-primary-700"]),
};

export const dataTableStyles = {
  table: cn(["border-separate border-spacing-y-3 text-blue-dark-800"]),
  tableRow: cn(["hover:bg-transparent"]),
  tableHead: cn(["font-normal text-sm leading-[14px] h-fit pl-2"]),
  cellTableRow: cn(["text-start bg-transparent hover:bg-primary-50"]),
  tableCell: cn(["py-0 px-3 h-[2.5rem]"]),
  notFoundCell: cn(["h-24 text-center font-normal text-md leading-[14px]"]),
  text: cn(["text-sm leading-[18px]"]),
  paginationContainer: cn([
    "w-full flex items-center justify-end space-x-2 py-4",
  ]),
  paginationButton: cn(["text-foreground font-normal leading-normal"]),
  sortHeader: cn([
    "bg-transparent hover:bg-transparent p-0 w-fit h-fit select-none border-none font-normal",
  ]),
  sortIcon: cn(["ml-2 h-4 w-4"]),
  flexCenter: cn(["w-full flex items-center justify-center"]),
  tooltipTrigger: cn(["flex text-start truncate cursor-default"]),
  tooltipContent: cn([
    "bg-primary-800 text-xs font-light leading-normal text-primary-700 max-w-56",
  ]),
  actionIcon: cn([
    "size-4 text-foreground hover:text-foreground/75 cursor-pointer",
  ]),
};
