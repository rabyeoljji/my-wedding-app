const IS_DEV: boolean = "development" === import.meta.env.MODE;

const KEY = {
  ARROW_DOWN: "ArrowDown",
  ARROW_UP: "ArrowUp",
  ENTER: "Enter",
} as const;

const THEME = {
  DARK: "dark",
  LIGHT: "light",
};

const CONSTANTS = {
  IS_DEV,
  KEY,
  THEME,
};

export default CONSTANTS;
