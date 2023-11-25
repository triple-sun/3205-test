import { InputBaseComponentProps } from "@mui/material";
import React from "react";
import { IMaskInput } from "react-imask";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMask = React.forwardRef<
  HTMLInputElement,
  InputBaseComponentProps & CustomProps
>(function TextMaskCustom(props, ref) {
  const { onChange, onReset, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="00-00-00"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value: string) =>
        onChange({ target: { name: props.name, value } })
      }
      overwrite
      onReset={onReset}
    />
  );
});

export default TextMask
