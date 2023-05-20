import { Variety, Option, Item } from "../interfaces/Interfaces";
import "../styles/VariationSelector.scss";

interface VariationSelectorProps {
  varieties: Variety[];
  selectedItem: Item | null;
  selectedVariations: { [key: string]: Option };
  handleVariationSelect: (varietyCode: string, selectedOption: Option) => void;
}

export function VariationSelector(props: VariationSelectorProps) {
  const { varieties, handleVariationSelect, selectedItem } = props;

  const handleSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    variety: Variety
  ) => {
    const selectedOptionCode = e.target.value;
    const selectedOption = variety.options.find(
      (option) => option.code === selectedOptionCode
    );
    if (selectedOption) {
      handleVariationSelect(variety.code, selectedOption);
    }
  };

  return (
    <div className="variation-selector">
      <h2>Product variation</h2>
      {varieties.map((variety) => (
        <div className="variation-group" key={variety.code}>
          <h3>{variety.description}</h3>
          <select
            key={`${selectedItem?.code || "none"}.${variety.code}`}
            onChange={(e) => handleSelect(e, variety)}
          >
            <option value="">Select...</option>
            {variety.options.map((option) => (
              <option key={option.code} value={option.code}>
                {option.description}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
