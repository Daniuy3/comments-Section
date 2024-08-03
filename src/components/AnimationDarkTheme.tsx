import { useCommentsStore } from "../store/store";


function AnimationDarkTheme() {
    const darkTheme = useCommentsStore((state) => state.darkTheme);
    const setDarkTheme = useCommentsStore((state) => state.setDarkTheme);

    function handleThemeChange() {
        darkTheme? setDarkTheme(false) : setDarkTheme(true);
      } 

  return (
    <div className=" animation"
        onClick={handleThemeChange}
    >
                <img src="/sun.svg" alt="" className={`sun ${darkTheme? "secondary" : "main"}`} />
                <img src="/moon.svg" alt="" className={`moon ${darkTheme? "main" : "secondary"}`} />
    </div>
  )
}

export default AnimationDarkTheme