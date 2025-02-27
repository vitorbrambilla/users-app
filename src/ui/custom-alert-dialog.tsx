import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { Button } from "./button";
import { Icons } from "./icons";

interface CustomAlertDialogProps {
  title: string | undefined;
  description: string | undefined;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAction?: () => void;
  isActionLoading?: boolean;
}

export function CustomAlertDialog({
  title,
  description,
  open,
  onOpenChange,
  onAction,
  isActionLoading,
}: CustomAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-primary-50 w-[95%] rounded-[20px] border-none">
        <AlertDialogHeader className="space-y-2">
          <AlertDialogTitle className="text-foreground">
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription className="text-foreground">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-8 gap-4 flex-row justify-center items-center">
          <Button
            className="mt-0 border border-foreground bg-transparent rounded-lg text-sm w-32 text-foreground hover:text-foreground transition-shadow duration-300 ease-in-out hover:shadow-md"
            onClick={() => {
              onOpenChange(!open);
            }}
          >
            Cancelar
          </Button>

          {onAction && (
            <Button
              variant="default"
              className="w-32 text-primary-50 bg-foreground hover:bg-foreground/75 transition-shadow duration-300 ease-in-out hover:shadow-md"
              type="button"
              onClick={onAction}
              disabled={isActionLoading}
            >
              {isActionLoading ? (
                <Icons.loader2Icon className="size-4 animate-spin" />
              ) : (
                "Confirmar"
              )}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
