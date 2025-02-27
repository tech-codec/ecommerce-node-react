import { useState } from 'react';
import RadioButton from '../RadioBotton';
import RangeSlider from '../RangeSlider';
import { FaChevronDown, FaChevronUp, FaSlidersH } from 'react-icons/fa';

function FilterPanelMobil({ filters, setFilters, listMotCle = [] }) {
  const [isOpenParPrix, setIsOpenParPrix] = useState(false);
  const [isOpenPrix, setIsOpenPrix] = useState(false);
  const [isOpenMotCle, setIsOpenMotCle] = useState(false);

  const toggleBoxParPrix = () => {
    setIsOpenParPrix(!isOpenParPrix);
  };

  const toggleBoxPrix = () => {
    setIsOpenPrix(!isOpenPrix);
  };

  const toggleBoxMotCle = () => {
    setIsOpenMotCle(!isOpenMotCle);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="w-full block visible_filter:hidden">
      <div className="pb-4 text-xl flex items-center relative">
        <span className="font-bold absolute top-1 left-0">
          <FaSlidersH />
        </span>
        <span className="ml-6">Filtres</span>
      </div>

      <div className="rounded-lg shadow-lg pt-4 px-4 pb-2 bg-white mb-2">
        <div
          className="text-gray-700 mb-2 cursor-pointer w-full font-medium rounded-lg text-sm flex justify-between items-center"
          onClick={toggleBoxParPrix}
        >
          <span className="text-base">Trier par prix</span>
          <div className={`transform transition-transform duration-500 ${isOpenParPrix ? 'rotate-3' : ''}`}>
            {isOpenParPrix ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
        {isOpenParPrix && (
          <div className="w-full">
            <RadioButton
              id="sortAsc"
              name="sortBy"
              value="asc"
              label="Prix croissant"
              checked={filters.sortBy === 'asc'}
              onChange={handleChange}
            />
            <RadioButton
              id="sortDesc"
              name="sortBy"
              value="desc"
              label="Prix décroissant"
              checked={filters.sortBy === 'desc'}
              onChange={handleChange}
            />
          </div>
        )}
      </div>

      <div className="rounded-lg shadow-lg pt-4 px-4 pb-2 bg-white mb-2">
        <div
          className="text-gray-700 mb-2 cursor-pointer w-full font-medium rounded-lg text-sm flex justify-between items-center"
          onClick={toggleBoxPrix}
        >
          <span className="text-base">Prix</span>
          <div className={`transform transition-transform duration-500 ${isOpenPrix ? 'rotate-3' : ''}`}>
            {isOpenPrix ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
        {isOpenPrix && (
          <div className="w-full">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Prix Min</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <RangeSlider
                min={0}
                max={10000}
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                label="Prix minimum"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Prix Max</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <RangeSlider
                min={0}
                max={10000}
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                label="Prix maximum"
              />
            </div>
          </div>
        )}
      </div>

      <div className="rounded-lg shadow-lg pt-4 px-4 pb-2 bg-white mb-2">
        <div
          className="text-gray-700 mb-2 cursor-pointer w-full font-medium rounded-lg text-sm flex justify-between items-center"
          onClick={toggleBoxMotCle}
        >
          <span className="text-base">Trier par mot clé</span>
          <div className={`transform transition-transform duration-500 ${isOpenMotCle ? 'rotate-3' : ''}`}>
            {isOpenMotCle ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
        {isOpenMotCle && (
          <div className="w-full">
            {listMotCle.length > 0 &&
              listMotCle.map((keyword) => (
                <RadioButton
                  key={keyword}
                  id={keyword}
                  name="selectedKeyword"
                  value={keyword}
                  label={keyword}
                  checked={filters.selectedKeyword === keyword}
                  onChange={handleChange}
                />
              ))}
            <RadioButton
              id="keyword"
              name="selectedKeyword"
              value=""
              label="tous les produits"
              checked={filters.selectedKeyword === ''}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterPanelMobil;