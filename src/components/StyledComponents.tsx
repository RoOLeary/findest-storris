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

export const ButtonContainer = styled.div<{ isEditing?: boolean }>`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  width: ${(props) => (props.isEditing ? '100%' : 'auto')};

  @media (max-width: 600px) {
    justify-content: flex-start;
    width: 100%;
  }
`;
