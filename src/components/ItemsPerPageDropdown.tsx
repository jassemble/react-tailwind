import React from "react";

interface ItemsPerPageDropdownProps {
  itemsPerPage: number;
  onItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ItemsPerPageDropdown: React.FC<ItemsPerPageDropdownProps> = ({
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  return (
    <label className="text-gray-800 font-semibold">
      Items per page:
      <select
        value={itemsPerPage}
        onChange={onItemsPerPageChange}
        className="ml-2 px-2 py-1 border border-gray-300 rounded"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </label>
  );
};

export default ItemsPerPageDropdown;
