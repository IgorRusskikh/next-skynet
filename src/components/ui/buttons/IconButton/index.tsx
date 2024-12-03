import { ElementType, HTMLAttributes } from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: ElementType;
  theme?: "red" | "black";
}

export default function IconButton({
  children,
  theme = "black",
  icon: Icon,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button {...props} className={`${styles.button} ${theme === "black" ? styles.buttonBlack : ""} ${className}`}>
      <Icon width={27} height={27} />
      <p>{children}</p>
    </button>
  );
}
