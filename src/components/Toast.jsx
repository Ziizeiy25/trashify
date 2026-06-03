export default function Toast({ message, visible, isError }) {
  return (
    <div className={`r-toast${visible ? " r-toast--show" : ""}${isError ? " r-toast--error" : ""}`}>
      <div className="r-toast-dot" />
      <span>{message}</span>
    </div>
  );
}