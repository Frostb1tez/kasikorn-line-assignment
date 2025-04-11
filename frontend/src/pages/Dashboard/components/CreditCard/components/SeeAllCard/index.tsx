import { Card } from "@mui/material";
import React from "react";
import { GOAL_CARD_COLORS, GOAL_CARD_STYLES } from "../../constants";

const SeeAllCard: React.FC = () => {
  return (
    <Card
      sx={{
        width: GOAL_CARD_STYLES.SEE_ALL.WIDTH,
        height: GOAL_CARD_STYLES.SEE_ALL.HEIGHT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: GOAL_CARD_COLORS.SEE_ALL_TEXT,
        bgcolor: "white",
        border: `1px solid ${GOAL_CARD_COLORS.SEE_ALL_BORDER}`,
        borderRadius: GOAL_CARD_STYLES.REGULAR.BORDER_RADIUS,
        margin: "0",
        padding: GOAL_CARD_STYLES.SEE_ALL.PADDING,
        boxSizing: "border-box",
        fontSize: GOAL_CARD_STYLES.SEE_ALL.FONT_SIZE,
        lineHeight: GOAL_CARD_STYLES.SEE_ALL.LINE_HEIGHT,
        fontWeight: 700,
      }}
    >
      See all
    </Card>
  );
};

export default SeeAllCard;
