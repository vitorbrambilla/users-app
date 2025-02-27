import { Icons } from "./icons";

type LoadingProps = {
  label?: string;
  size?: number;
};

export function Loading({
  label = "Carregando...",
  size = 64, //...props
}: LoadingProps): JSX.Element {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center">
          <Icons.spinner
            width={size}
            height={size}
            className="animate-spin py-2 text-primary"
          />
          <p className="text-primary tracking-[0.05rem]">{label}</p>
        </div>
      </div>
    </>
  );
}
