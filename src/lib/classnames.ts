const classNames = (style: { [key: string]: string }, ...classes: string[]) => {
  return classes.map((c) => style[c]).join(" ");
};

export default classNames;
