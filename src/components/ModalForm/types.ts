import { Option } from "../ListBox";

export type Data = any;

export type ValidationOutput = { ok: false; message: string } | { ok: true };

export interface BaseEntry {
  /**
   * type of this entry.
   */
  type: string;
  /**
   * default value of this entry
   */
  defaultValue: any;
  /**
   * label of entry
   */
  label?: string;
  /**
   * description of this entry in small text
   */
  description?: string;
  /**
   * whether this entry has a tooltip. shown next to the label.
   */
  tooltip?: string;
  /**
   * whether this entry should be shown
   */
  conditional?: (data: Data) => boolean;
  /**
   * validate the entry data on input. If the result is not ok, the form cannot proceed.
   * You need to pay attention to where do you call this validate.
   *
   * @param data the new data
   */
  validate?: (data: Data) => ValidationOutput;
  /**
   * This function provides the `onChange` callback, `currentValue` and `data` for you.
   * Based on these two props, you need to determine how to render your element.
   * For performance purpose, you may also want to use a memorized element.
   *
   * @param onChange a function you need to call to change the data of the form.
   * This `onChange` function is exactly the function pass to the Custom Component.
   * @param data the currentValue of this entry. Basically `data[sectionId][id]`.
   * @param formData all the data of the modal form.
   */
  node?: (
    onChange: (newValue: any) => void,
    data: any,
    formData: any
  ) => JSX.Element;
}

export interface InputEntry extends BaseEntry {
  type: "input";
  defaultValue: string;
  placeholder?: string;
  emptyValue?: string; // when empty value is given, this value will be return on enter when the actual value is empty
  disabled?: boolean;
}

export interface TextAreaEntry extends BaseEntry {
  type: "textarea";
  defaultValue: string;
  placeholder?: string;
  emptyValue?: string; // when empty value is given, this value will be return on enter when the actual value is empty
  disabled?: boolean;
}

export interface ListBoxEntry extends BaseEntry {
  type: "listbox";
  defaultValue: Option;
  options: Option[];
}

export interface ToggleEntry extends BaseEntry {
  type: "toggle";
  defaultValue: boolean;
}

export interface MarkdownEntry extends BaseEntry {
  type: "markdown";
  defaultValue: string;
}

export interface DateTimeEntry extends BaseEntry {
  type: "datetime";
  /**
   * the `moment` string
   */
  defaultValue: string;
}

export type Entry =
  | BaseEntry
  | InputEntry
  | TextAreaEntry
  | ListBoxEntry
  | ToggleEntry
  | MarkdownEntry
  | DateTimeEntry;

/**
 * a form structure is compose of many sections
 */
export type Section = {
  /**
   * the title of this section
   */
  title?: string;
  /**
   * whether this section should be shown
   */
  conditional?: (data: Data) => boolean;
  /**
   * entries in this section
   */
  entries: { [id: string]: Entry };
};

/**
 * a form is composed of many sections
 */
export type FormStructure = { [id: string]: Section };

export type Props = {
  /**
   * whether this section should be in a disclosure.
   * If it is not in a disclosure, its content will spread out.
   */
  useDisclosure?: boolean;
  /**
   * the open and close state of modal
   */
  isOpen: Boolean;
  /**
   * a setState function which control the open and close of modal
   */
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * click the overlay to close the modal
   */
  clickOutsideToClose?: boolean;
  /**
   * press ese key to close the modal
   */
  escToClose?: boolean;
  /**
   * callback when the modal is open
   */
  onOpen?: () => void;
  /**
   * callback when the modal is close. If the modal close because user submit the form,
   * both onEnter and onClose is called, so you need to handle it by yourself.
   * @param data the data in the form when the modal is closed
   * @param isEnter whether this form close because of enter
   */
  onClose?: (data: Data, isEnter: boolean) => void;
  /**
   * the title of this form
   */
  title: string;
  /**
   * control the width of the form
   */
  size?: "sm" | "md" | "lg";
  /**
   * The skeleton of the form
   */
  formStructure: FormStructure;
  /**
   * a callback when the data of the form is change
   *
   * @param data the new data
   * @param id the id of the data which is changed. id in the form of `sectionId.entryId`
   */
  onChange?: (data: Data, id: string) => void;
  /**
   * a callback when the form is submitted
   */
  onEnter?: (data: Data) => void;
  okBtnText?: string;
  cancelBtnText?: string;
};

/**
 * T is EntryType
 */
export type EntryProps = {
  /**
   * the z index to be used for styling. The upper entry usually has a higher z index than a lower entry
   */
  zIndex: number;
  /**
   * an `Entry` object from the `FromStructure`
   */
  entry: Entry;
  /**
   * the section of this entry
   */
  sectionId: string;
  /**
   * id of this entry in the format
   */
  id: string;
  /**
   * the current data
   */
  data: Data;
  /**
   * @param data new value of this entry
   */
  onChange: (data: any) => void;
};

export type SectionProps = {
  /**
   * the `Section` object from `FromStructure`
   */
  section: Section;
  /**
   * id of this section
   */
  id: string;
  /**
   * the current form data
   */
  data: Data;
  useDisclosure: boolean;
  /**
   * onChange callback
   *
   * @param data the new value of a data
   * @param id the entry id
   */
  onChange: (data: any, id: string) => void;
};
