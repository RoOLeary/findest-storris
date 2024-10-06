// OverlayComponent.tsx
import React, { useState } from "react";
import styled from "@emotion/styled";

// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Ensure the overlay is on top */
`;

const OverlayContent = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  width: 480px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Heading = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  border: none;
  background-color: green;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkgreen;
  }

  &:active {
    background-color: green;
  }
`;

interface OverlayProps {
  onSubmitName: (name: string) => void;
}

const OverlayComponent = ({ onSubmitName }: OverlayProps) => {
  const [name, setName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() !== "") {
      onSubmitName(name);
    }
  };

  return (
    <Overlay>
      <OverlayContent>
        <Heading>Welcome! Please enter your name</Heading>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Button type="submit">Submit</Button>
        </Form>
      </OverlayContent>
    </Overlay>
  );
};

export default OverlayComponent;
