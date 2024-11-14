import ThemeToggle from './utils/Themetoggler'

const NavBar = () => {
  return (
    <nav className=" w-full absolute top-0 left-0 h-12 z-50">
      <div className=" h-20 flex flex-row items-center justify-between px-16">
        <div className="flex flex-row gap-2 items-center justify-between"></div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export default NavBar
