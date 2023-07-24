import { Context, useContext } from "react";
import { AddFormContext, AddFormContextType } from "../../App";

const SearchBar = () => {
  const { setSearchValue, searchValue } = useContext<AddFormContextType>(
    AddFormContext as Context<AddFormContextType>
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e?.target?.value);
  };

  return (
    <div>
      <input
        value={searchValue}
        onChange={handleChange}
        type="text"
        placeholder="Type to search..."
        className="border text-gray-600 py-2 px-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
      />
    </div>
  );
};

export default SearchBar;
