export interface TInputProps extends React.ComponentPropsWithoutRef<"input"> {
  classes?: string;
  label?: string;
  error?: string;
}

export interface TTextareaProps
  extends React.ComponentPropsWithoutRef<"textarea"> {
  classes?: string;
  label?: string;
}

export interface TInputState {
  isFocus: boolean;
  isEmpty: boolean;
  error?: string;
}

export interface TEventHandlerProps {
  handleSetOpen?: () => void;
} 