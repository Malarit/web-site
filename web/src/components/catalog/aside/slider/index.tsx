import React from "react";

import style from "./index.module.scss";

const Slider: React.FC<{
  minValue: number;
  maxValue: number;
  getValue: (e: { left: number; right: number }) => void;
  setValue?: { left: number; right: number };
}> = ({ minValue, maxValue, getValue, setValue }) => {
  const minGap = maxValue * 0.1;
  const percent = 0.8;
  const initalvalLeft = Math.round(maxValue * (1 - percent));
  const initalvalRight = Math.round(maxValue * percent);

  const [rangeLeft, setRangeLeft] = React.useState(initalvalLeft);
  const [rangeRight, setRangeRight] = React.useState(initalvalRight);
  const [inputLeft, setInputLeft] = React.useState(initalvalLeft + "");
  const [inputRight, setInputRight] = React.useState(initalvalRight + "");

  React.useEffect(() => {
    getValue({ left: rangeLeft, right: rangeRight });
  }, [rangeLeft, rangeRight]);

  React.useEffect(() => {
    if (setValue) {
      setRangeLeft(+setValue.left);
      setRangeRight(+setValue.right);
      setInputLeft(setValue.left + "");
      setInputRight(setValue.right + "");
    }
  }, [setValue]);

  const onRangeLeft = (e: React.ChangeEvent<any>) => {
    let value = parseInt(e.target.value);

    if (value < minValue) value = minValue;
    if (Number.isNaN(value)) value = maxValue;

    setRangeLeft(value);
    if (rangeRight - value <= minGap) {
      value = rangeRight - minGap;
      setRangeLeft(rangeRight - minGap);
    }
    setInputLeft(value + "");
  };

  const onRangeRight = (e: React.ChangeEvent<any>) => {
    let value = parseInt(e.target.value);

    if (value > maxValue) value = maxValue;
    if (Number.isNaN(value)) value = minValue;
    console.log( rangeLeft )

    setRangeRight(value);
    if (value - rangeLeft <= minGap) {
      value = rangeLeft + minGap;
      setRangeRight(value);
    }
    setInputRight(value + "");
  };

  return (
    <div className={style.root}>
      <div className={style.values}>
        <input
          type="text"
          value={inputLeft}
          onChange={(e) => setInputLeft(e.target.value)}
          onBlur={(e) => {
            onRangeLeft(e);
          }}
        />
        <div></div>
        <input
          type="text"
          value={inputRight}
          onChange={(e) => setInputRight(e.target.value)}
          onBlur={(e) => {
            onRangeRight(e);
          }}
        />
      </div>
      <div className={style.sliderRange}>
        <div className={style.slider}></div>
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={rangeLeft}
          onChange={(e) => onRangeLeft(e)}
        />
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={rangeRight}
          onChange={(e) => onRangeRight(e)}
        />
      </div>
    </div>
  );
};

export default Slider;
