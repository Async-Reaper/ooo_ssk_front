import "./styles.scss";
import { classNames } from "../../../../shared/libs/classNames/classNames";

interface Props {
  className?: string;
}

export const Loader = ({ className }: Props) => (
  <div className={classNames("lds-ellipsis", {}, [className])}>
    <div />
    <div />
    <div />
    <div />
  </div>
);
