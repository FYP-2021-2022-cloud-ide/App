import { Environment } from "./cnails";

import { Option } from "../components/ListBox";


const registry = process.env.NEXT_PUBLIC_REGISTRY;
export const rootImage = `${registry}/codeserver:latest`;
export const CPU = 0.5;
export const memory = 1000;
export const envChoices = [
  { id: "", value: "C++/C", imageId: `${registry}/cpp:latest` },
  { id: "", value: "Python3", imageId: `${registry}/python3:latest` },
  { id: "", value: "Java", imageId: `${registry}/java:latest` },
];

/**
 * given the existing name, auto generate a new valid name
 * 
 * @param names existing Name
 * @param prefix `${prefix} ${i}`. `i` is an incremental index. 
 * @param offset by default offset is 1, it means the first new index is `names.length + 1`
 */
export const getValidName = (
  names: string[],
  prefix: string,
  offset: number = 1
): string => {
  for (let i = names.length + offset; ; i++) {
    if (names.every((name) => name != `${prefix} ${i}`))
      return `${prefix} ${i}`;
  }
};

/**
 * given a list of environments, return a list of options 
 * @param environments 
 * @returns 
 */
export function getEnvOptions(environments: Environment[]): Option[] {
  return environments.map(env => ({
    id: env.id,
    value: env.name,
    imageId: env.imageId,
  }));
}





