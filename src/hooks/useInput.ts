import { useState } from "react";
import Validator, { LengthOptions, SizeOptions } from "../validator/validator";

const validator = new Validator();

function useInput(options: LengthOptions | SizeOptions) {
  const [value, setValue] = useState<string>("");
  const [isFocused, setFocus] = useState(false);
  let isError = false;

  const onBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    setFocus(true);
  };
  const onChangeValue: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  switch (options.type) {
    case "length":
      isError = isFocused && !validator.validateLength(value, options);
      break;

    case "size":
      isError = isFocused && !validator.validateSize(+value, options);
      break;

    default:
      break;
  }

  return { value, onChangeValue, onBlur, isError };
}

export default useInput;
