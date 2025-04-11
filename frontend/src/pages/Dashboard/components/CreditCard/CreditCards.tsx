import { DebitCard } from "@/types/auth";
import { Box, Button } from "@mui/material";
import React, { useRef } from "react";
import CreditCard from "./CreditCard";

interface CreditCardsProps {
  debitCards: DebitCard[];
}

const CreditCards: React.FC<CreditCardsProps> = ({ debitCards }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDown = true;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grabbing";
      startX = e.pageX - scrollContainerRef.current.offsetLeft;
      scrollLeft = scrollContainerRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDown = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseUp = () => {
    isDown = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown) return;
    e.preventDefault();
    if (scrollContainerRef.current) {
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <Box
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      sx={{
        overflowX: "auto",
        overflowY: "hidden",
        WebkitOverflowScrolling: "touch",
        cursor: "grab",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        scrollBehavior: "smooth",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minWidth: "min-content",
        }}
      >
        {debitCards.map((debitCard) => (
          <Box
            key={debitCard.id}
            sx={{
              scrollSnapAlign: "start",
              flexShrink: 0,
            }}
          >
            <CreditCard {...debitCard} />
          </Box>
        ))}
        <Box
          sx={{
            scrollSnapAlign: "start",
            flexShrink: 0,
          }}
        >
          <Button variant="text" sx={{ color: "grey.300" }} size="large">
            See All
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreditCards;
