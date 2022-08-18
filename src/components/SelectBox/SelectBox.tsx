/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import {
  TiArrowSortedDown as DownArrowIcon,
  TiArrowSortedUp as UpArrowIcon,
} from "react-icons/ti";
import styles from "./SelectBox.module.css";

interface Props {
  id: string;
  title: string;
  options: string[] | number[];
  selectedOption: string | number | null;
  onSelectOption: (option: string | number) => void;
}

function SelectBox({
  id,
  title,
  options,
  selectedOption,
  onSelectOption,
}: Props) {
  const [isSelectBoxClicked, setSelectBoxClick] = useState(false);

  const onSelectBoxClick: React.MouseEventHandler<HTMLLabelElement> = (
    event
  ) => {
    if (event.target !== event.currentTarget) return;
    setSelectBoxClick((prev) => !prev);
  };

  const onOptionClick: React.MouseEventHandler<HTMLLIElement> = (event) => {
    setSelectBoxClick(false);
    const currentValue = event.currentTarget.innerText;
    if (selectedOption === currentValue) return;
    onSelectOption(currentValue);
  };

  return (
    <>
      <label
        htmlFor={id}
        onClick={onSelectBoxClick}
        id={`${id}-select-box`}
        className={`${styles.selectBox} ${
          isSelectBoxClicked ? styles.activeSelectBox : ""
        }`}
      >
        {selectedOption || title}
        {!isSelectBoxClicked && <DownArrowIcon size={20} />}
        {isSelectBoxClicked && <UpArrowIcon size={20} />}
      </label>
      {isSelectBoxClicked && (
        <ul id={id} className={styles.optionList}>
          {options.map((option) => (
            <li
              onClick={onOptionClick}
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
