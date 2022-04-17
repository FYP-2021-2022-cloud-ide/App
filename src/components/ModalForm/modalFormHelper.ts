import flat from "flat";
import _ from "lodash";
import { FormStructure, Sections } from "./types";

/**
 * this function will convert the form structure to the initial data of the form.
 * @param sections
 * @returns
 */
export function fromStructureToData<T>(sections: Sections<T>): T {
  let data = {} as T;
  if (!sections) return data;
  Object.keys(sections).forEach((sectionId) => {
    Object.keys(sections[sectionId].entries).forEach((entryId) => {
      const type = sections[sectionId].entries[entryId].type;
      //@ts-ignore
      const emptyValue = sections[sectionId].entries[entryId].emptyValue;
      // if the default value is empty and emptyValue exists, data will be the empty value else it will be the defaultValue
      const id = `${sectionId}.${entryId}`;
      if (
        (type === "input" || type === "textarea" || type === "markdown") &&
        sections[sectionId].entries[entryId].defaultValue == "" &&
        emptyValue
      ) {
        // add the value
        data[id] = emptyValue;
      } else data[id] = sections[sectionId].entries[entryId].defaultValue;
    });
  });
  return flat.unflatten(data);
}

export function canProceed<T>(sections: Sections<T>, data: T): boolean {
  if (_.isEmpty(data)) return false;
  return Object.keys(sections).every((sectionId) =>
    Object.keys(sections[sectionId].entries).every((entryId) => {
      if (sections[sectionId].entries[entryId].validate) {
        return sections[sectionId].entries[entryId].validate(data).ok;
      } else return true;
    })
  );
}
