/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { MouseEventHandler } from "react";
import {
  TiArrowSortedDown as DownArrowIcon,
  TiArrowSortedUp as UpArrowIcon,
} from "react-icons/ti";
import styles from "./SelectBox.module.css";

interface Props {
  id: string;
  title: string;
  options: string[] | number[];
  isSelectBoxClicked: boolean;
  selectedOption: number | string;
  onSelectOption: MouseEventHandler<HTMLLIElement>;
  toggleSelectBox: () => void;
}

function SelectBox({
  id,
  title,
  options,
  isSelectBoxClicked,
  selectedOption,
  onSelectOption,
  toggleSelectBox,
}: Props) {
  return (
    <>
      <label
        htmlFor={id}
        onClick={toggleSelectBox}
        className={`${styles.selectBox} ${
          isSelectBoxClicked ? styles.activeSelectBox : ""
        }`}
      >
        <input
          readOnly
          id={id}
          type="text"
          placeholder={title}
          className={styles.input}
          value={(selectedOption as string) || ""}
        />
        {!isSelectBoxClicked && <DownArrowIcon size={20} />}
        {isSelectBoxClicked && <UpArrowIcon size={20} />}
      </label>
      {isSelectBoxClicked && (
        <ul className={styles.optionList}>
          {options.map((option) => (
            <li
              onClick={onSelectOption}
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
