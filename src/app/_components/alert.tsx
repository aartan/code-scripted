import Container from "@/app/_components/container";
import cn from "classnames";

type AlertType = "maintenance" | "newsletter";

type Props = {
  type: AlertType;
};

const Alert = ({ type }: Props) => {
  let message;

  switch (type) {
    case "maintenance":
      message = (
        <>
          Scheduled maintenance on Aug 28th from 2:00 AM to 4:00 AM UTC. The
          site may be temporarily unavailable during this time.
        </>
      );
      break;
    case "newsletter":
      message = (
        <>
          Want to stay updated?{" "}
          <a
            href="/newsletter-signup"
            className="underline hover:text-blue-600 duration-200 transition-colors"
          >
            Sign up for our newsletter
          </a>{" "}
          to receive the latest posts and exclusive content.
        </>
      );
      break;
    default:
      message = null;
      break;
  }

  return (
    <div
      className={cn("border-b dark:bg-slate-800", {
        "bg-neutral-50 border-neutral-200": true,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">{message}</div>
      </Container>
    </div>
  );
};

export default Alert;
