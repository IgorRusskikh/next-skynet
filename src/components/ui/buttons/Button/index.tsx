import { HTMLAttributes } from "react";
import styles from "./Button.module.css";
import RightArrow from "@/svg/right-arrow.svg"

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  theme?: "red" | "black";
}

export default function Button({
  children,
  theme = "black",
  className,
  ...props
}: ButtonProps) {
  return (
    <button {...props} className={`${styles.button} ${theme === "black" ? styles.buttonBlack : styles.buttonRed} ${className}`}>
      <p>{children}</p>
      <RightArrow width={11} height={10} className="w-[11px] h-[10px] 3xl:w-[1vw] 3xl:h-[1vw] object-cover" />
    </button>
  );
}
