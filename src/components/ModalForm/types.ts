import { Option } from "../ListBox";

export type ValidationOutput = { ok: false; message: string } | { ok: true };

export interface BaseEntry<T = any> {
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
  conditional?: (data: T) => boolean;
  /**
   * validate the entry data on input. If the result is not ok, the form cannot proceed.
   * You need to pay attention to where do you call this validate.
   *
   * @param data the new data
   */
  validate?: (data: T) => ValidationOutput;
}

export interface InputEntry<T = any> extends BaseEntry<T> {
  type: "input";
  defaultValue: string;
  placeholder?: string;
  emptyValue?: string; // when empty value is given, this value will be return on enter when the actual value is empty
  disabled?: boolean;
}

export interface TextAreaEntry<T = any> extends BaseEntry<T> {
  type: "textarea";
  defaultValue: string;
  placeholder?: string;
  emptyValue?: string; // when empty value is given, this value will be return on enter when the actual value is empty
  disabled?: boolean;
}

export interface ListBoxEntry<T = any> extends BaseEntry<T> {
  type: "listbox";
  defaultValue: Option;
  options: Option[];
}

export interface ToggleEntry<T = any> extends BaseEntry<T> {
  type: "toggle";
  defaultValue: boolean;
}

export interface MarkdownEntry<T = any> extends BaseEntry<T> {
  type: "markdown";
  defaultValue: string;
}

export interface DateTimeEntry<T = any> extends BaseEntry<T> {
  type: "datetime";
  /**
   * the `moment` string
   */
  defaultValue: string;
}

export type Entry<T = any> =
  | BaseEntry<T>
  | InputEntry<T>
  | TextAreaEntry<T>
  | ListBoxEntry<T>
  | ToggleEntry<T>
  | MarkdownEntry<T>
  | DateTimeEntry<T>;

/**
 * a form structure is compose of many sections
 */
export type Section<T = any> = {
  /**
   * the title of this section
   */
  title?: string;
  /**
   * whether this section should be shown
   */
  conditional?: (data: T) => boolean;
  /**
   * entries in this section
   */
  entries: { [id: string]: Entry<T> };
};

/**
 * a form is composed of many sections
 */
export type FormStructure<T = any> = { [id: string]: Section<T> };
/**
 * another name of `FormStructure<T>`
 */
export type Sections<T = any> = FormStructure<T>;

export type Props<T = any> = {
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
   * both `onEnter` and `onClose` is called, so you need to handle it by yourself. `onClose` cannot distinguish
   * whether the form is closed because of enter.
   * @param data the data in the form when the modal is closed
   */
  onClose?: (data: T) => void;
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
  formStructure: FormStructure<T>;
  /**
   * a callback when the data of the form is change
   *
   * @param data the new data
   * @param id the id of the data which is changed. id in the form of `sectionId.entryId`
   */
  onChange?: (data: T, id: string) => void;
  /**
   * a callback when the form is submitted
   */
  onEnter?: (data: T) => void;
  okBtnText?: string;
  cancelBtnText?: string;
};

/**
 * T is EntryType
 */
export type EntryProps = {
  /**
   * the section of this entry
   */
  sectionId: string;
  /**
   * id of this entry in the format
   */
  id: string;
};

export type SectionProps = {
  id: string;
};
