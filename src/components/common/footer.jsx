import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer">
      <Copyright />
    </footer>
  );
}
function Copyright() {
  return (
    <span>
      <Link to="/">© 2023 Books Cart™</Link>. All Rights Reserved.
    </span>
  );
}
