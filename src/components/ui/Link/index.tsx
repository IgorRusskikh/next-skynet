import TopArrow from "@/svg/right-top-arrow.svg";
import styles from "./Link.module.css";
import { HTMLAttributes } from "react";

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
      className={`${styles.link} ${light && styles.lightLink} ${className}`}
      suppressHydrationWarning
    >
      {children}
      <TopArrow width={6.67} height={6} className={`${styles.linkArrow}`} />
    </a>
  );
}
