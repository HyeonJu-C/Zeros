import { ChangeEventHandler, FocusEventHandler, useState } from "react";

function useInput(
  validate: (value: string) => boolean = (value: string) => !!value
) {
  const [value, setValue] = useState<string>("");
  const [isFocused, setFocus] = useState(false);

  const onBlur: FocusEventHandler<HTMLInputElement> = () => setFocus(true);
  const onChangeValue: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };
  const isError = isFocused && !validate(value);

  return [value, onChangeValue, onBlur, isError];
}

export default useInput;
