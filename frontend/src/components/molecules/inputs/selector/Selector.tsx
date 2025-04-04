import Button from "@/components/atoms/button/Button";
import "./selector.scss";

export default function Selector({
  options,
  onSelect,
  selected
}: {
  options: { placeholder: string; value: string }[];
  onSelect: (value: string) => void;
  selected: string
}) {
  return (
    <div className="select">
      {options.map(
        (option: { placeholder: string; value: string }, index: number) => (
          <Button
            onClick={() => onSelect(option.value)}
            key={`selectoropt-${index}`}
            variant={selected === option.value ? "primary":"secondary"}
            color="green"
          >
            {option.placeholder}
          </Button>
        )
      )}
    </div>
  );
}
