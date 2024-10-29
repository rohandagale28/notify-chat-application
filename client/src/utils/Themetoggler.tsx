import { useEffect, useState } from "react"
import { ThemeToggleDark, ThemeToggleLight } from "@/components/svg/Index"

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    typeof window !== "undefined" && localStorage.theme ? localStorage.theme : "light"
  )

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <button onClick={toggleTheme} className="p-2  rounded-lg hover:bg-muted">
      {theme === "dark" ? (
        <div className="h-4 w-4">
          <ThemeToggleLight />
        </div>
      ) : (
        <div className="h-4 w-4">
          <ThemeToggleDark />
        </div>
      )}
    </button>
  )
}

export default ThemeToggle
