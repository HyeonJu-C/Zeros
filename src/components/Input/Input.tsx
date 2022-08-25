/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import styles from "./Input.module.css";

interface Props {
  id: string;
  type: React.HTMLInputTypeAttribute;
  isError: boolean;
  value: string | number;
  placeholder?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  children?: React.ReactNode;
  readOnly?: boolean;
  style?: {
    [key: string]: string | number | boolean;
  };
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler;
}

function Input({
  id,
  type,
  isError,
  value,
  placeholder,
  min,
  max,
  minLength,
  maxLength,
  children,
  readOnly,
  style,
  onChange,
  onBlur,
  onClick,
}: Props) {
  return (
    <label
      className={styles.label}
      htmlFor={id}
      onClick={onClick}
      style={{ ...style }}
    >
      <input
        readOnly={readOnly || false}
        id={id}
        name={id}
        type={type}
        value={value || ""}
        className={`${styles.input} ${isError ? styles.invalid : ""}`}
        placeholder={placeholder || undefined}
        min={min || undefined}
        max={max || undefined}
        minLength={minLength || undefined}
        maxLength={maxLength || undefined}
        onChange={onChange || undefined}
        onBlur={onBlur || undefined}
      />
      {children}
    </label>
  );
}

export default Input;
