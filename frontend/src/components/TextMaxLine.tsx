import type { LinkProps, TypographyProps } from "@mui/material";
import type { TypographyVariant } from "@mui/material/styles";
import type { ReactNode } from "react";

import { Link, Typography } from "@mui/material";
import { forwardRef } from "react";

type IProps = TypographyProps & LinkProps;

interface Props extends IProps {
  line?: number;
  asLink?: boolean;
  children: ReactNode;
  variant?: TypographyVariant;
}

const TextMaxLine = forwardRef<HTMLAnchorElement, Props>(
  ({ asLink, variant = "body1", line = 2, children, sx, ...other }, ref) => {
    const style = {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: line,
      WebkitBoxOrient: "vertical",
      ...sx,
    } as const;

    if (asLink) {
      return (
        <Link
          color="inherit"
          ref={ref}
          variant={variant}
          sx={{ ...style }}
          {...other}
        >
          {children}
        </Link>
      );
    }

    return (
      <Typography ref={ref} variant={variant} sx={{ ...style }} {...other}>
        {children}
      </Typography>
    );
  }
);

export default TextMaxLine;
