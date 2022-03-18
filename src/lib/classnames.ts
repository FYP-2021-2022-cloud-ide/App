/**
 * this is a function for handling css modules
 * @param style css module
 * @param classes
 * @returns
 */
const classNames = (style: { [key: string]: string }, ...classes: string[]) => {
  return classes.map((c) => style[c]).join(" ");
};

export default classNames;
