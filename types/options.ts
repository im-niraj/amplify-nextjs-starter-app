export type OptionType = {
  value: string;
  label: string;
};
export interface MultiSelectProps {
  options: OptionType[];
  selected: OptionType[];
  onChange?: (val: OptionType[]) => void;
  className?: string;
}
