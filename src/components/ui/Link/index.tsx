import { HTMLAttributes } from "react";
import TopArrow from "@/svg/right-top-arrow.svg";
import styles from "./Link.module.css";

interface ILinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  light?: boolean;
}

export default function CustomLink({
  children,
  href,
  className,
  light,
  ...props
}: ILinkProps) {
  return (
    <a
      href={href}
      className={`${styles.link} ${
        light && styles.lightLink
      } ${className} group`}
      {...props}
      suppressHydrationWarning
    >
      {children}
      <TopArrow
        className={`${styles.linkArrow} group-hover:xl:top-[-8px] group-hover:xl:-right-[17px] group-hover:3xl:top-[-0.5vw] group-hover:3xl:-right-[1.5vw]`}
      />
    </a>
  );
}
