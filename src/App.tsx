import "./styles/App.scss";
import { ProductSelector } from "./components/ProductSelector";
import { VariationSelector } from "./components/VariationSelector";
import { Item, Variety, Option } from "./interfaces/Interfaces";
import { useEffect, useState } from "react";
import data from "./sample.json";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [varieties, setVarieties] = useState<Variety[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedVariations, setSelectedVariations] = useState<{
    [key: string]: Option;
  }>({});
  const [productCode, setProductCode] = useState<string>("");

  useEffect(() => {
    setItems(data.items);
    setVarieties(data.varieties);
  }, []);

  const handleProductSelect = (item: Item | null) => {
    setSelectedItem(item);
    setSelectedVariations({});
    setProductCode(item ? item.code : "");
  };

  const handleVariationSelect = (
    varietyCode: string,
    selectedOption: Option
  ) => {
    setSelectedVariations((prevVariations) => ({
      ...prevVariations,
      [varietyCode]: selectedOption,
    }));
  };

  useEffect(() => {
    if (selectedItem) {
      let productCode = selectedItem.code;

      const sortedVarietyCodes = Object.keys(selectedVariations).sort(
        (a, b) =>
          selectedItem.varieties.indexOf(a) - selectedItem.varieties.indexOf(b)
      );

      for (const varietyCode of sortedVarietyCodes) {
        const selectedOption = selectedVariations[varietyCode];
        productCode = `${productCode}.${selectedOption.code}`;
      }

      setProductCode(productCode);
    }
  }, [selectedItem, selectedVariations]);

  return (
    <div className="App">
      <h1>Product Code Generator</h1>
      <ProductSelector
        items={items}
        handleProductSelect={handleProductSelect}
      />
      {selectedItem && selectedItem.varieties.length > 0 && (
        <VariationSelector
          varieties={varieties.filter((variety) =>
            selectedItem?.varieties.includes(variety.code)
          )}
          selectedItem={selectedItem}
          selectedVariations={selectedVariations}
          handleVariationSelect={handleVariationSelect}
        />
      )}
      <h2>Product code: {productCode}</h2>
    </div>
  );
}

export default App;
