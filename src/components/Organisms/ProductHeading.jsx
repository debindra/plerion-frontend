import React from "react";
import AddButton from "../Molecules/AddButton";

function ProductHeading({ onClickddNewbeerBtn }) {
  const handleOnClickButton = () => {
    onClickddNewbeerBtn();
  };

  return (
    <>
      <div className="relative overflow-hidden bg-gray-200 shadow-md  sm:rounded-lg">
        <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
          <div>
            <h5 className="mr-3 font-semibold text-blue-600 dark:text-white uppercase">
              products
            </h5>
          </div>

          <AddButton
            label={`Add new item`}
            onClickButton={handleOnClickButton}
          />
        </div>
      </div>
    </>
  );
}

export default ProductHeading;
