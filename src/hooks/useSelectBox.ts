import { MouseEventHandler, useState } from "react";

function useSelectBox(processOption?: (value: string | number) => string) {
  const [isSelectBoxClicked, setSelectBoxClick] = useState(false);
  const [selectedOption, setSelectOption] = useState<null | string | number>(
    null
  );
  const [isFocused, setFocus] = useState(false);

  const isError = isFocused && !isSelectBoxClicked && !selectedOption;

  const hideSelectBox = () => setSelectBoxClick(false);
  const showSelectBox = () => setSelectBoxClick(true);
  const toggleSelectBox = () => {
    if (!isFocused) setFocus(true);
    setSelectBoxClick((prev) => !prev);
  };

  const onSelectOption: MouseEventHandler<HTMLLIElement> = (event) => {
    hideSelectBox();
    const selectedValue = event.currentTarget.innerText;

    if (!processOption) {
      setSelectOption(selectedValue);
      return;
    }
    const processedValue = processOption(selectedValue);
    setSelectOption(processedValue);
  };

  return [
    { isSelectBoxClicked },
    { selectedOption, onSelectOption },
    { isError },
    { hideSelectBox, showSelectBox, toggleSelectBox },
  ];
}

export default useSelectBox;
