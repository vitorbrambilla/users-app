import { notFoundStyles } from "@/styles/not-found.styles";
import { Button } from "@/ui/button";
import { ROUTES } from "@/utils/constants";
import { useNavigate } from "@tanstack/react-router";

export const NotFound = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={notFoundStyles.main}>
      <div className={notFoundStyles.title}>
        <div>404</div>
        <h1 className={notFoundStyles.subtitle}>Página não encontrada!</h1>
        <p className={notFoundStyles.description}>
          Parece que você está perdido...
        </p>
        <div className={notFoundStyles.button}>
          <Button
            onClick={() => {
              void navigate({ to: ROUTES.HOME });
            }}
          >
            Retomar ao início
          </Button>
        </div>
      </div>
    </div>
  );
};
