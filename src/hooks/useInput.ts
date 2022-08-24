import { useState } from "react";

function useInput(
  validate: (value: string) => boolean = (value: string) => !!value
) {
  const [value, setValue] = useState<string>("");
  const [isFocused, setFocus] = useState(false);

  const onBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    setFocus(true);
  };
  const onChangeValue: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };
  const isError = isFocused && !validate(value);

  return [value, onChangeValue, onBlur, isError];
}

export default useInput;
