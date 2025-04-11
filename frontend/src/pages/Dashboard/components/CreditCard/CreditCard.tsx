import { DebitCard } from "@/types/auth";
import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { GOAL_CARD_COLORS, GOAL_CARD_STYLES } from "./constants";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CreditCardProps extends DebitCard {}

const CreditCard: React.FC<CreditCardProps> = ({
  name,
  // status,
  color,
  issuer,
  cardNumber,
  borderColor,
}) => {
  const isWhiteCard = color === GOAL_CARD_COLORS.WHITE_CARD;
  const textColor = isWhiteCard ? GOAL_CARD_COLORS.WHITE_CARD_TEXT : "white";
  const providerColor = isWhiteCard
    ? GOAL_CARD_COLORS.WHITE_CARD_PROVIDER
    : textColor;

  return (
    <Card
      sx={{
        width: GOAL_CARD_STYLES.REGULAR.WIDTH,
        height: GOAL_CARD_STYLES.REGULAR.HEIGHT,
        bgcolor: color,
        borderRadius: GOAL_CARD_STYLES.REGULAR.BORDER_RADIUS,
        margin: GOAL_CARD_STYLES.REGULAR.MARGIN,
        position: "relative",
        overflow: "hidden",
        color: textColor,
        border: `1px solid ${borderColor}`,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            left: GOAL_CARD_STYLES.REGULAR.TEXT.TITLE.LEFT,
            right: GOAL_CARD_STYLES.REGULAR.TEXT.TITLE.RIGHT,
            top: GOAL_CARD_STYLES.REGULAR.TEXT.TITLE.TOP,
            fontSize: GOAL_CARD_STYLES.REGULAR.TEXT.TITLE.FONT_SIZE,
            lineHeight: GOAL_CARD_STYLES.REGULAR.TEXT.TITLE.LINE_HEIGHT,
            fontWeight: 700,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "inherit",
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            left: GOAL_CARD_STYLES.REGULAR.TEXT.STATUS.LEFT,
            top: cardNumber
              ? GOAL_CARD_STYLES.REGULAR.TEXT.STATUS.TOP_WITH_ACCOUNT
              : GOAL_CARD_STYLES.REGULAR.TEXT.STATUS.TOP_WITHOUT_ACCOUNT,
            fontSize: GOAL_CARD_STYLES.REGULAR.TEXT.STATUS.FONT_SIZE,
            lineHeight: GOAL_CARD_STYLES.REGULAR.TEXT.STATUS.LINE_HEIGHT,
            color: "inherit",
            opacity: cardNumber ? 0.8 : 1,
          }}
        >
          {cardNumber}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            left: GOAL_CARD_STYLES.REGULAR.TEXT.PROVIDER.LEFT,
            bottom: GOAL_CARD_STYLES.REGULAR.TEXT.PROVIDER.BOTTOM,
            fontSize: GOAL_CARD_STYLES.REGULAR.TEXT.PROVIDER.FONT_SIZE,
            lineHeight: GOAL_CARD_STYLES.REGULAR.TEXT.PROVIDER.LINE_HEIGHT,
            opacity: GOAL_CARD_STYLES.REGULAR.TEXT.PROVIDER.OPACITY,
            color: providerColor,
          }}
        >
          Issued by {issuer}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CreditCard;
