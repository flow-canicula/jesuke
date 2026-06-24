export function Honeypot() {
  return (
    <input
      type="text"
      name="_gotcha"
      tabIndex={-1}
      aria-hidden="true"
      autoComplete="off"
      style={{ display: 'none' }}
    />
  );
}
