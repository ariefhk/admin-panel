import { useState, ChangeEvent } from "react";

type UseInputReturn<T> = {
  values: T;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  reset: () => void;
  resetField: (fieldName: keyof T, value: T[keyof T]) => void;
};

const useInput = <T extends Record<string, unknown>>(initialState: T): UseInputReturn<T> => {
  const [values, setValues] = useState<T>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const reset = () => {
    setValues(initialState);
  };

  const resetField = (fieldName: keyof T, value: T[keyof T]) => {
    setValues({
      ...values,
      [fieldName]: value,
    });
  };

  return {
    values,
    handleChange,
    reset,
    resetField,
  };
};

export default useInput;
