export function Toast({ message, visible, isError }) {
  return (
    <div className={`t-toast${visible ? " show" : ""}${isError ? " error" : ""}`}>
      <div className="t-toast-dot" />
      <span>{message}</span>
    </div>
  );
}