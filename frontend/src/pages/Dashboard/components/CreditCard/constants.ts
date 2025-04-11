export const GOAL_CARD_STYLES = {
  REGULAR: {
    WIDTH: "240px",
    HEIGHT: "150px",
    MARGIN: "0 5px",
    BORDER_RADIUS: "10px",
    TEXT: {
      TITLE: {
        LEFT: "22px",
        RIGHT: "22px",
        TOP: "16px",
        FONT_SIZE: "1.5rem",
        LINE_HEIGHT: "2.5rem",
      },
      STATUS: {
        LEFT: "22px",
        TOP_WITH_ACCOUNT: "43px",
        TOP_WITHOUT_ACCOUNT: "42px",
        FONT_SIZE: "1.3rem",
        LINE_HEIGHT: "1.5rem",
      },
      PROVIDER: {
        LEFT: "22px",
        BOTTOM: "80px",
        FONT_SIZE: "1rem",
        LINE_HEIGHT: "1.2rem",
        OPACITY: 0.6,
      },
    },
  },
  SEE_ALL: {
    WIDTH: "94px",
    HEIGHT: "150px",
    PADDING: "51px 0 51px 7px",
    FONT_SIZE: "1.4rem",
    LINE_HEIGHT: "1.6rem",
  },
};

export const GOAL_CARD_COLORS = {
  WHITE_CARD: "#ffffff",
  WHITE_CARD_TEXT: "#97999e",
  WHITE_CARD_PROVIDER: "#d3d3d2",
  SEE_ALL_TEXT: "#c0c1c4",
  SEE_ALL_BORDER: "#f2f3f7",
} as const;
