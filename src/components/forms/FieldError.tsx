type FieldErrorProps = {
  id: string;
  message: string | undefined;
};

export function FieldError({ id, message }: FieldErrorProps) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-xs text-seal">
      {message}
    </p>
  );
}
