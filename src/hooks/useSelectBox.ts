import { MouseEventHandler, useState } from "react";

function useSelectBox(processOption?: (value: string | number) => string) {
  const [isSelectBoxClicked, setSelectBoxClick] = useState(false);
  const [isFocused, setFocus] = useState(false);
  const [selectedOption, setSelectOption] = useState<null | string | number>(
    null
  );

  const isError = isFocused && !isSelectBoxClicked && !selectedOption;

  const hideSelectBox = () => setSelectBoxClick(false);
  const showSelectBox = () => setSelectBoxClick(true);
  const toggleSelectBox: MouseEventHandler<HTMLLabelElement> = (event) => {
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
    isSelectBoxClicked,
    selectedOption,
    onSelectOption,
    isError,
    toggleSelectBox,
    { hideSelectBox, showSelectBox },
  ];
}

export default useSelectBox;
