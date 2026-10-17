
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <aside className="sidebar">
      <Link to="/" className="navbar-logo">
        <img
          src="/image/Bookish%20Owl%20on%20Colorful%20Book%20Stack.png"
          alt="Book Buddy Owl"
          className="navbar-logo-image"
        />

        <span>
          Book <span className="logo-accent">Buddy</span>
        </span>
      </Link>

      <p className="nav-label">MENU</p>

      <nav className="navbar-links">
        <NavLink to="/" end>
          <span>⌂</span> Home
        </NavLink>

        <NavLink to="/browse-books">
          <span>✦</span> Browse Books
        </NavLink>

        <NavLink to="/my-books">
          <span>♡</span> My Books
        </NavLink>

        <NavLink to="/add-book">
          <span>＋</span> Add Book
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <div className="reading-tip">
          <span>📖</span>
          <h3>A little reading wisdom</h3>
          <p>Every great journey begins with a single page.</p>
        </div>

        <p className="sidebar-footer">
          Your next chapter starts here.
        </p>
      </div>
    </aside>
  );
}

export default Navbar;
