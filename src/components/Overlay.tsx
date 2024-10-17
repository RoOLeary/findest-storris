// OverlayComponent.tsx
import { useState } from "react";
import { Overlay, OverlayContent, OverlayHeading, OverlayForm, OverlayInput, OverlayButton} from './StyledComponents';

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
        <OverlayHeading>Welcome! Please enter your name</OverlayHeading>
        <OverlayForm onSubmit={handleSubmit}>
          <OverlayInput
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <OverlayButton type="submit">Submit</OverlayButton>
        </OverlayForm>
      </OverlayContent>
    </Overlay>
  );
};

export default OverlayComponent;
