import { PropTypes } from 'prop-types';

const PrioritySelect = ({ selected, select }) => (
  <>
    <h3 className='priority-heading'>Set Priority</h3>
    <ul className='priority-select'>
      {Array.from({ length: 10 }, (_, i) => (
        <li key={`priority-${i + 1}`}>
          <input
            type='radio'
            name='priority'
            id={`num-${i + 1}`}
            value={i + 1}
            checked={selected === i + 1}
            onChange={e => select(+e.currentTarget.value)}
          />
          <label htmlFor={`num-${i + 1}`}>{i + 1}</label>
        </li>
      ))}
    </ul>
  </>
);

PrioritySelect.propTypes = {
  selected: PropTypes.number.isRequired,
  select: PropTypes.func.isRequired,
};

export default PrioritySelect;
