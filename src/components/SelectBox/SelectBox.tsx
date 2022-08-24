/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import {
  TiArrowSortedDown as DownArrowIcon,
  TiArrowSortedUp as UpArrowIcon,
} from "react-icons/ti";
import styles from "./SelectBox.module.css";

interface Props {
  id: string;
  type: React.HTMLInputTypeAttribute;
  options: string[] | number[];
  isError: boolean;
  placeholder: string;
  isSelectBoxClicked: boolean;
  selectedOption: number | string;
  onClick: React.MouseEventHandler;
  onClickOption: React.MouseEventHandler<HTMLLIElement>;
  scrollWithHeight?: string;
}

function SelectBox({
  id,
  type,
  placeholder,
  options,
  isError,
  isSelectBoxClicked,
  selectedOption,
  onClick,
  onClickOption,
  scrollWithHeight,
}: Props) {
  return (
    <>
      <label
        htmlFor={id}
        onClick={onClick}
        className={`${styles.selectBox} ${isError ? styles.invalid : ""} ${
          isSelectBoxClicked ? styles.activeSelectBox : ""
        }`}
      >
        <input
          readOnly
          id={id}
          name={id}
          type={type}
          value={(selectedOption as string) || ""}
          className={styles.input}
          placeholder={placeholder}
        />
        {!isSelectBoxClicked && (
          <DownArrowIcon
            size={30}
            onClick={(event) => event.preventDefault()}
            className={styles.icon}
          />
        )}
        {isSelectBoxClicked && (
          <UpArrowIcon
            size={30}
            onClick={(event) => event.preventDefault()}
            className={styles.icon}
          />
        )}
      </label>
      {isSelectBoxClicked && (
        <ul
          className={`${styles.optionList} ${
            scrollWithHeight ? styles.scrollable : ""
          }`}
          style={{ height: scrollWithHeight }}
        >
          {options.map((option) => (
            <li
              onClick={onClickOption}
              key={option}
              value={option}
              className={styles.optionItem}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default SelectBox;
