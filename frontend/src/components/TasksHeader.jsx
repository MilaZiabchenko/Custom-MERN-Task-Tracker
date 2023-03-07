import PropTypes from 'prop-types';
import FilterButtons from './FilterButtons';
import AddButton from './AddButton';

const TasksHeader = ({ title = 'My tasks' }) => (
  <header>
    <h2>{title}</h2>
    <div className='tasks-header-buttons'>
      <FilterButtons />
      <AddButton />
    </div>
  </header>
);

TasksHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default TasksHeader;
