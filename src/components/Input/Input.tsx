import React, {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
} from "react";
import styles from "./Input.module.css";

interface Props {
  id: string;
  type: HTMLInputTypeAttribute;
  isError: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

function Input({
  id,
  type,
  isError,
  placeholder,
  min,
  max,
  minLength,
  maxLength,
  onChange,
  onBlur,
}: Props) {
  return (
    <label htmlFor={id}>
      <input
        id={id}
        name={id}
        type={type}
        className={`${styles.input} ${isError ? styles.invalid : ""}`}
        placeholder={placeholder || undefined}
        min={min || undefined}
        max={max || undefined}
        minLength={minLength || undefined}
        maxLength={maxLength || undefined}
        onChange={onChange || undefined}
        onBlur={onBlur || undefined}
      />
    </label>
  );
}

export default Input;
