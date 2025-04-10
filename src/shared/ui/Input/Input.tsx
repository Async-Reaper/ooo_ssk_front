import React, {
  type InputHTMLAttributes, type ReactNode, useCallback, useRef, 
} from "react";
import { classNames } from "../../libs/classNames/classNames";
import cls from "./styles.module.scss";

type HTMLInputProps = Omit<
InputHTMLAttributes<HTMLInputElement>,
"value" | "onChange" | "readOnly"
>;

type Props = {
  className?: string;
  value?: string | number;
  label?: ReactNode;
  onChange?: (value: string | any) => void;
  autofocus?: boolean;
  readonly?: boolean;
  variant?: DesignSystemUiColors;
} & HTMLInputProps;

export const Input = React.memo((props: Props) => {
  const {
    className,
    value,
    onChange,
    type = "text",
    placeholder,
    label,
    autofocus,
    readonly,
    variant = "neutral",
    ...otherProps
  } = props;

  const ref = useRef<HTMLInputElement>(null);

  const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  }, [onChange]);

  const classes = [className, cls[`variant--${variant}`]];

  return (
    <div className={classNames(cls.input_wrapper, {}, classes)}>
      {label && <div className={cls.label}>{label}</div>}
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        className={cls.input}
        readOnly={readonly}
        {...otherProps}
      />
    </div>
  );
});
