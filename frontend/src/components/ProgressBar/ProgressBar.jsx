import "./ProgressBar.scss";
export default function ProgressBar({ show }) {
  return <progress className={`progressbar ${show ? "visible" : ""}`} />;
}
