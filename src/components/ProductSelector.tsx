import { Item } from "../interfaces/Interfaces";
import "../styles/ProductSelector.scss";

interface ProductSelectorProps {
  items: Item[];
  handleProductSelect: (selectedItem: Item | null) => void;
}

export function ProductSelector(props: ProductSelectorProps) {
  const { items, handleProductSelect } = props;

  return (
    <div className="product-selector">
      <h2>Product selection</h2>
      <div className="product-group">
        <select
          onChange={(e) =>
            e.target.value
              ? handleProductSelect(
                  items.find((item) => item.code === e.target.value)!
                )
              : handleProductSelect(null)
          }
        >
          <option value="">Select product</option>
          {items.map((item) => (
            <option key={item.code} value={item.code}>
              {item.description}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
