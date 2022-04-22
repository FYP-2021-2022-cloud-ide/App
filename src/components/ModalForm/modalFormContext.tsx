import flat from "flat";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { fromStructureToData } from "./modalFormHelper";
import { Props } from "./types";

interface ModalFormContextState<T> extends Props<T> {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  /**
   * use this function to change data in entry because this will trigger the onChange function
   *
   * @param data data of this entry
   */
  changeData: (data: any, sectionId: string, entryId: string) => void;
  close: (isEnter?: boolean) => void;
  onClose?: () => void;
}

const ModalFormContext = createContext({} as ModalFormContextState<any>);

export function useModalForm<T = any>(): ModalFormContextState<T> {
  return useContext(ModalFormContext);
}

export function ModalFormProvider<T>({
  children,
  props,
}: {
  children: JSX.Element;
  props: Props<T>;
}) {
  const { formStructure, onChange, onEnter, setOpen, isOpen } = props;
  const [data, setData] = useState(fromStructureToData(formStructure));

  /**
   * this hook clean the form data when the form structure is changed
   */
  useUpdateEffect(() => {
    setData(fromStructureToData(formStructure));
  }, [formStructure]);

  /**
   * This hooks clean the form data when the form is closed
   */
  // useUpdateEffect(() => {
  //   if (!isOpen) setData(fromStructureToData(formStructure));
  // }, [isOpen]);

  const changeData = useCallback(
    (value: any, sectionId: string, entryId: string) => {
      const newData = flat.unflatten({
        ...(flat.flatten(data) as object),
        [`${sectionId}.${entryId}`]: value,
      }) as T;
      setData(newData);
      if (onChange) onChange(newData, `${sectionId}.${entryId}`);
    },
    [onChange, setData, data]
  );

  const close = useCallback(
    (isEnter: boolean = false) => {
      setOpen(false);
      if (isEnter) {
        if (onEnter) onEnter(data);
      }
    },
    [onEnter, setOpen, data]
  );

  const onClose = useCallback(() => {
    if (props.onClose) props.onClose(data);
  }, [props.onClose, data]);

  const onOpen = useCallback(() => {
    setData(fromStructureToData(formStructure));
    if (props.onOpen) props.onOpen();
  }, [props.onOpen, setData, formStructure]);

  if (!data) return <></>;

  return (
    <ModalFormContext.Provider
      value={{ ...props, data, setData, changeData, close, onClose, onOpen }}
    >
      {children}
    </ModalFormContext.Provider>
  );
}
