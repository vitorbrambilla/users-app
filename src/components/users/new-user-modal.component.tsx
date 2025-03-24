import { toast } from "@/hooks/use-toast";
import { UsersForm, usersSchema } from "@/schemas/users.schema";
import { newUserModalStyles } from "@/styles/users.styles";
import type { FunctionComponent } from "@/types/react.type";
import { AlertDialog, AlertDialogContent } from "@/ui/alert-dialog";
import { Button } from "@/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Icons } from "@/ui/icons";
import { Input } from "@/ui/input";
import { Switch } from "@/ui/switch";
import { cn } from "@/utils/tailwind";
import { validForm } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  onConfirm: (data: UsersForm) => void;
  selectedUser?: UsersForm;
  setSelectedUser?: Dispatch<SetStateAction<UsersForm>>;
  isActionLoading?: boolean;
}

export default function NewUserModal({
  open,
  setOpen,
  onConfirm,
  selectedUser,
  setSelectedUser,
  isActionLoading,
}: IProps): FunctionComponent {
  const form = useForm<UsersForm>({
    resolver: zodResolver(usersSchema),
    defaultValues: {},
  });

  const onSubmit = (): void => {
    const values = form.getValues();
    const check = validForm(usersSchema.safeParse(values));

    if (typeof check === "boolean") {
      onConfirm(values);
    } else {
      toast({ ...check });
    }
  };

  const handleCleanForm = (): void => {
    form.setValue("name", "");
    form.setValue("email", "");
    form.setValue("phone", "");
    form.setValue("status", false);

    setSelectedUser?.({} as UsersForm);
    setOpen(false);
  };

  useEffect(() => {
    if (selectedUser) {
      form.reset(selectedUser);
    }
  }, [form, selectedUser]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className={newUserModalStyles.content}>
        <span className={newUserModalStyles.title}>Novo Usuário</span>

        <Form {...form}>
          <form className={newUserModalStyles.form}>
            <div className={newUserModalStyles.inputsContainer}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem
                    className={cn([
                      newUserModalStyles.formItem,
                      "w-full md:w-1/2",
                    ])}
                  >
                    <FormLabel className={newUserModalStyles.label}>
                      Nome
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Digite o nome"
                        className={newUserModalStyles.input}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem
                    className={cn([
                      newUserModalStyles.formItem,
                      "w-full md:w-1/2",
                    ])}
                  >
                    <FormLabel className={newUserModalStyles.label}>
                      E-mail
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Digite o e-mail"
                        className={newUserModalStyles.input}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className={newUserModalStyles.inputsContainer}>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem
                    className={cn([
                      newUserModalStyles.formItem,
                      "w-full md:w-1/2",
                    ])}
                  >
                    <FormLabel className={newUserModalStyles.label}>
                      Telefone
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Digite o telefone"
                        className={newUserModalStyles.input}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem
                    className={cn([
                      newUserModalStyles.formItem,
                      "w-full md:w-1/2 justify-center items-center",
                    ])}
                  >
                    <FormLabel className={newUserModalStyles.label}>
                      Status
                    </FormLabel>

                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className={newUserModalStyles.switch}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className={newUserModalStyles.buttonsContainer}>
              <Button
                type="button"
                className={newUserModalStyles.cancelButton}
                onClick={handleCleanForm}
              >
                <Icons.xCircle height={16} /> CANCELAR
              </Button>

              <Button
                type="button"
                className={newUserModalStyles.saveButton}
                onClick={onSubmit}
              >
                {isActionLoading ? (
                  <Icons.loader2Icon
                    className={newUserModalStyles.buttonLoader}
                  />
                ) : (
                  <>
                    <Icons.circleCheck height={16} />
                    SALVAR
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
