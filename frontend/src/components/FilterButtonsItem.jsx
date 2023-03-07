import PropTypes from 'prop-types';

const FilterButtonsItem = ({
  id,
  activeCategory,
  handleCategory,
  children
}) => (
  <button
    id={id}
    className={
      activeCategory === id ? 'btn btn-filter active' : 'btn btn-filter'
    }
    onClick={handleCategory}
  >
    {children}
  </button>
);

FilterButtonsItem.propTypes = {
  id: PropTypes.string,
  activeCategory: PropTypes.string,
  setActiveCategory: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default FilterButtonsItem;
