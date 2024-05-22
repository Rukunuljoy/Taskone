import { useState } from 'react';
import PropTypes from 'prop-types';
import './Partition.css';

const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

const Partition = ({ id, onRemove }) => {
  const [partitions, setPartitions] = useState([]);
  const [color] = useState(generateRandomColor());
  const [isVertical, setIsVertical] = useState(true);

  const handleSplit = (vertical) => {
    setPartitions([
      ...partitions,
      { id: `${id}-${partitions.length}`, color: generateRandomColor(), vertical },
    ]);
    setIsVertical(vertical);
  };

  const handleRemove = (idToRemove) => {
    setPartitions(partitions.filter(partition => partition.id !== idToRemove));
    if (partitions.length === 0) onRemove(id);
  };

  return (
    <div className="partition" style={{ backgroundColor: color, flexDirection: isVertical ? 'row' : 'column' }}>
      <div className="partition-controls">
        <button onClick={() => handleSplit(true)}>V</button>
        <button onClick={() => handleSplit(false)}>H</button>
        <button onClick={() => onRemove(id)}>-</button>
      </div>
      {partitions.map(partition => (
        <Partition key={partition.id} id={partition.id} onRemove={handleRemove} />
      ))}
    </div>
  );
};

Partition.propTypes = {
  id: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Partition;
