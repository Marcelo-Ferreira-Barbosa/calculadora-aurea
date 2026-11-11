import './Header.css'

function Header() {
  return (
    <header className="header">
      <span className="header__badge" aria-hidden="true">
        67
      </span>
      <h1 className="header__title">Calculadora Áurea</h1>
      <p className="header__slogan">Faça as contas. Encontre o 67. Farme áurea.</p>
    </header>
  )
}

export default Header