function Header() {
  return (
    <header className="header">
      <div className="logo">
        SHOP FASHION
      </div>

      <nav className="nav">
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/men">Men</a>
        <a href="/women">Women</a>
        <a href="/contact">Contact</a>
      </nav>

      <div className="cart">
        🛒 Cart (0)
      </div>
    </header>
  );
}

export default Header;