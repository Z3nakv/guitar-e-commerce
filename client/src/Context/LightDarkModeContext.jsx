import useLocalStorage from '../Hooks/useLightDarkMode';


export const LightDarkMode = () => {

    const [theme, setTheme] = useLocalStorage('theme', 'light');

    const handleToggleTheme = () => {
        setTheme( theme === 'dark' ? 'light' : 'dark')
    }

  return {
    theme,
    handleToggleTheme
  }
}
