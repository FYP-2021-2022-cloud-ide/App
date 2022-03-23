import { Option } from "../ListBox";

/**
 *  the id is a flatten JSON object, each property is named in the format of `sectionId.entryId`
 */
export type Data = { [id: string]: any };

export type ValidationOutput = { ok: false; message: string } | { ok: true };

export type Entry = {
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
   */
  validate?: (data: Data) => ValidationOutput;
} & (
  | {
      type: "input";
      defaultValue: string;
      placeholder?: string;
      emptyValue?: string; // when empty value is given, this value will be return on enter when the actual value is empty
      disabled?: boolean;
    }
  | {
      type: "textarea";
      defaultValue: string;
      placeholder?: string;
      emptyValue?: string; // when empty value is given, this value will be return on enter when the actual value is empty
      disabled?: boolean;
    }
  | { type: "listbox"; defaultValue: Option; options: Option[] }
  | { type: "toggle"; defaultValue: boolean }
  | { type: "markdown"; defaultValue: string }
  | { type: "date"; defaultValue: string }
  | {
      type: "custom";
      defaultValue: any;
      node: (
        onChange: (newValue: any) => void,
        currentValue: any
      ) => React.ReactNode;
    }
);

// the key of a form structure will be the title
export type Section = {
  /**
   * the title of this section
   */
  title?: string;
  /**
   * whether this section should be in a disclosure.
   * If it is not in a disclosure, its content will spread out.
   */
  inDisclosure?: boolean;
  /**
   * whether this section should be shown
   */
  conditional?: (data: Data) => boolean;
  entries: { [id: string]: Entry };
};

/**
 * a form is composed of many sections
 */
export type FormStructure = { [id: string]: Section };

export type Props = {
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
   * callback when the modal is close
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
  /**
   * text for the ok and cancel buttons
   */
  btnsText?: { cancel: string; ok: string };
};

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
  /**
   * onChange callback
   *
   * @param data the new value of a data
   * @param id the entry id
   */
  onChange: (data: any, id: string) => void;
};
