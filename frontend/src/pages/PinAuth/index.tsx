import useAuth from "@/hooks/useAuth";
import React, { useState } from "react";
import { LoginOptions } from "./components/LoginOptions";
import { PinDisplay } from "./components/PinDisplay";
import { PinKeypad } from "./components/PinKeypad";
import { PinBottom, PinContainer, PinTop } from "./components/styles";
import { UserProfile } from "./components/UserProfile";

interface PinAuthProps {
  maxLength?: number;
  onComplete?: (pin: string) => void;
}

const PinAuth: React.FC<PinAuthProps> = ({ maxLength = 6 }) => {
  const [pin, setPin] = useState<string>("");
  const { login } = useAuth();
  const handleKeyPress = async (value: string) => {
    if (pin.length < maxLength) {
      const newPin = pin + value;
      setPin(newPin);

      if (newPin.length === maxLength) {
        try {
          await login("000018b0e1a211ef95a30242ac180002");
          window.location.reload();
        } catch (error) {
          console.error(error);
          setPin("");
        }
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <PinContainer maxWidth={false}>
      <PinTop>
        <UserProfile
          avatarUrl="https://dummyimage.com/200x200/999/fff"
          userName="Interview User"
        />
        <PinDisplay pinLength={pin.length} maxLength={maxLength} />
      </PinTop>
      <PinBottom>
        <LoginOptions />
        <PinKeypad onKeyPress={handleKeyPress} onDelete={handleDelete} />
      </PinBottom>
    </PinContainer>
  );
};

export default PinAuth;
