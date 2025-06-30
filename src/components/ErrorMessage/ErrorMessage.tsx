import s from "./ErrorMessage.module.css";

type ErrorMessageProps = {
  error?: string,
};

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) return null;

  return (
    <div className={s.ErrorMessage}>Sorry, something went wrong: {error}</div>
  );
};

export default ErrorMessage;
