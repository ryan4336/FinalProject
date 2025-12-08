import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/list">All Items</Link>
      <Link to="/create">Create Item</Link>
    </nav>
  );
}
