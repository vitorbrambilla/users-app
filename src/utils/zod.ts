import type { ZodError } from "zod";

export type ToastVariants = "warning" | "success" | "destructive";

type ValidFormProps = {
  success: boolean;
  error?: ZodError | null;
  defaultMessage?: string;
  defaultTitle?: string;
  variant?: ToastVariants;
};

type ValidFormReturn = {
  title: string;
  description: string;
  variant: ToastVariants;
};

/**
 * Utility function used to validate a form and. If the form contains invalid values, it returns a basic toast information.
 *
 * ----
 *
 * @validForm
 * Valid input example:
 *   validForm(loginFormSchema.safeParse(validValues)); // true
 *
 * Invalid input example:
 *    validForm(loginFormSchema.safeParse(invalidValues)); // {
 *       title: "Warning!",
 *       description: "Email field must be a valid email address",
 *       variant: "warning",
 *     }
 *
 * ----
 *
 * @param   {ValidFormProps} required - Can be a form.getValues()
 *
 * @returns {ValidFormReturn} Returns `true` if the form is valid, otherwise returns an object containing toast information.
 */
export const validForm = ({
  success,
  error,
  defaultMessage = "Confirme o preenchimento de todos os campos",
  defaultTitle = "Atenção",
  variant = "warning",
}: ValidFormProps): ValidFormReturn | boolean => {
  if (success) {
    return true;
  }

  if (error) {
    let issue = error?.issues[0];
    // For debugging purposes, log form issues
    // console.log(issue)
    if (issue?.code === "invalid_union") {
      issue =
        error?.issues.find((each) => each.code !== "invalid_union") || issue;
    }

    return {
      title: defaultTitle,
      description: issue?.message || defaultMessage,
      variant,
    };
  }

  return {
    title: defaultTitle,
    description: defaultMessage,
    variant,
  };
};
