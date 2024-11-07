import styled from '@emotion/styled';

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
export const CompleteButton = styled(Button)<{ completed: boolean }>`
  background-color: ${(props) => (props.completed ? 'green' : 'white')};
  border: 2px solid green;
  color: ${(props) => (props.completed ? 'white' : 'green')};

  &:hover {
    background-color: green;
    color: white;
  }
`;
export const SaveButton = styled(Button)`
  background-color: #28a745;
`;
export const EditButton = styled(Button)`
  background-color: #007bff;
  &:hover {
    background-color: #0056b3;
  }
`;
export const DeleteButton = styled(Button)`
  background-color: #f00;
  &:hover {
    background-color: #d00;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  gap: 16px;
  align-items: stretch;
  line-height: 64px; 
`;
export const InputContainer = styled.div<{ hasError: boolean }>`
  position: relative;
  flex-grow: 1;
  margin-bottom: ${(props) => (props.hasError ? '25px' : '0')};
`;
export const Input = styled.input<{ hasError: boolean }>`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${(props) => (props.hasError ? 'red' : '#ccc')};
  border-radius: 4px;

  &:focus {
    outline: 1px solid green;
    border-color: green;
  }
`;
export const SelectButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;
export const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: #ccc;
  width: 100%;
`;
export const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  position: absolute;
  bottom: -25px;
  left: 0;
`;
export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
  transition: transform 0.3s ease;

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
    border-radius: 15px;
    transition: transform 0.3s ease-in-out, background 0.3s ease-in-out, padding 0.3s ease-in-out;
    padding: 2px;
  }
`;
export const ButtonText = styled.span`
  font-family: "Bw Gradual (woff2)", sans-serif;
  font-weight: 400;
  white-space: pre;
`;
export const CheckIcon = styled.span<{ completed: boolean }>`
  margin-right: ${(props) => (props.completed ? '8px' : '0')};
  color: white;
  width: ${(props) => (props.completed ? '20px' : '0')}; 
  height: 20px;
  background: ${(props) => (props.completed ? 'green' : 'transparent')};  
  border-radius: 50%;
  display: ${(props) => (props.completed ? 'flex' : 'none')};  
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
`;
export const StoryItemContainer = styled.li<{ isEditing: boolean }>`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: ${(props) => (props.isEditing ? 'stretch' : 'flex-start')};
  width: 100%; 
  padding: 15px; 
  margin-bottom: 12px; 
  background-color: #fafafa; 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  gap: ${(props) => (props.isEditing ? '12px' : '8px')}; 

  &:focus,
  &:hover {
    background-color: #f5f5f5;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px; 
  }
`;
export const StoryInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px; 
  width: 100%; 
`;
export const StoryDetailsContent = styled.div<{ completed: boolean }>`
  opacity: ${(props) => (props.completed ? '0.5' : '1')};  
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
  line-height: ${(props) => (props.completed ? 'normal' : '1.5rem')};  
  transition: opacity 0.3s ease-in-out, text-decoration 0.3s ease-in-out, line-height 0.3s ease-in-out; 
  width: 100%;
`;
export const StoryTitle = styled.span<{ completed: boolean }>`
  font-weight: bold;
  color: ${(props) => (props.completed ? 'green' : 'inherit')};  
  cursor: pointer;
  margin-right: 10px;
  display: flex;
  align-items: center;  
  transition: all 0.3s ease-in-out;  
`;
export const StoryMeta = styled.div`
  font-size: 14px;
  color: #555;
  margin-top: 5px;
  p {
    margin: 4px 0; 
  }
`;
export const AddInput = styled.input<{ hasError: boolean }>`
  padding: 12px; 
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;

  &:focus {
    outline: 1px solid green; 
    border-color: green;
`;
export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;
export const ButtonContainer = styled.div<{ isEditing?: boolean }>`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  width: ${(props) => (props.isEditing ? '100%' : '100%')};

  @media (max-width: 600px) {
    justify-content: ${(props) => (props.isEditing ? 'flex-start' : 'stretch')}; 
    width: 100%;
  }

  button {
    transition: background-color 0.3s ease;
    width: 100%;
  }

  button:hover {
    background-color: #e0e0e0;
  }
`;
export const ClientButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #e1ff01;
  color: #000000;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  position: relative;
  gap: 0;
  height: 45px;
  transition: transform 0.2s ease, background 0.2s ease, gap 0.15s ease-in-out;

  &:hover {
    gap: 8px;

    svg {
      width: 25px;
      height: 25px;
      background: black;
      color: white;
      border-radius: 15px;
      padding: 5px;
      transform: rotate(-45deg);
    }
  }
`;
export const ClientButtonText = styled.span`
  font-family: "Bw Gradual (woff2)", sans-serif;
  font-weight: 400;
  white-space: pre;
`;
export const AppContainer = styled.div`
  display: flex; 
  justify-content: space-between;
  padding: 24px;
    
`;
export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
`;
export const SubTitle = styled.h2<{ emph: boolean }>`
  font-size: ${(props) => (props.emph ? '18px' : '16px')}; 
  font-weight: ${(props) => (props.emph ? 'bold' : 'normal')}; 
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  color: #000;

  span{
    font-weight: bold;
  }
`;


export const ItemsContainer = styled.div`

`;
export const StoryListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
export const FilterLabel = styled.label`
  font-size: 16px;
  margin-right: 10px;
  font-weight: bold;
  display: block;
  @media (max-width: 600px) {
    display: none;
  }
`;
export const NoStoriesMessage = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 18px;
  color: #555;
`;
export const ResetButton = styled.button`
  background-color: red;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;

  @media (max-width: 600px) {
    flex-grow: 1;
  }

  &:hover {
    background-color: darkred;
  }
`;

// OVERLAY

export const Overlay = styled.div`
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

export const OverlayContent = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  width: 480px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const OverlayHeading = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
`;

export const OverlayForm = styled.form`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

export const OverlayInput = styled.input`
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

export const OverlayButton = styled.button`
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
