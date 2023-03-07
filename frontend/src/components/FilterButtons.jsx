import { useTasksContext } from '../context/TasksContext';
import { CATEGORIES } from '../constants/categories.js';
import FilterButtonsItem from './FilterButtonsItem';

const FilterButtons = () => {
  const { activeCategory, setActiveCategory } = useTasksContext();

  return (
    <div>
      {Object.values(CATEGORIES).map(category => (
        <FilterButtonsItem
          key={category}
          id={category}
          activeCategory={activeCategory}
          handleCategory={e => setActiveCategory(e.target.id)}
        >
          {category}
        </FilterButtonsItem>
      ))}
    </div>
  );
};

export default FilterButtons;
