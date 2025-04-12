import React from "react";

const Filter = ({ data, onChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm sticky top-24">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Categorias</h3>
      <div className="mb-6">
        <div className="space-y-2">
          {data.map((item, index) => (
            <div className="flex items-center" key={index}>
              <input
                id="default-checkbox"
                type="checkbox"
                value={item.value}
                className="w-4 h-4"
                onChange={onChange}
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-medium"
              >
                {item.text}
              </label>
            </div>
          ))}

          {/* {categories.map((category) => (
            <div key={category} className="flex items-center">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <label
                htmlFor={`category-${category}`}
                className="ml-2 text-sm font-medium text-gray-600 cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Filter;
