import { useState, useEffect } from "react";
import { generateRandomColor } from "../lib/utils";
import Partition from "./Partition";

const Layout = () => {
  const [partitions, setPartitions] = useState([
    {
      id: 1,
      color: generateRandomColor(),
      parentId: null,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    },
  ]);
const updatePartitionSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    setPartitions((prevPartitions) =>
      prevPartitions.map((partition) =>
        partition.id === 1 
          ? { ...partition, width, height }
          : partition
      )
    );
  };

  useEffect(() => {
    updatePartitionSize();

    window.addEventListener('resize', updatePartitionSize);

    return () => {
      window.removeEventListener('resize', updatePartitionSize);
    };
  }, []);
  const handleSplit = (id, direction) => {
    setPartitions((prevPartitions) => {
      const partition = prevPartitions.find((p) => p.id === id);
      const newId = Math.max(...prevPartitions.map((p) => p.id)) + 1;
      const newPartition = {
        id: newId,
        color: generateRandomColor(),
        parentId: id,
        width: partition.width / (direction === "H" ? 1 : 2),
        height: partition.height / (direction === "V" ? 1 : 2),
        top: partition.top + (direction === "H" ? partition.height / 2 : 0),
        left: partition.left + (direction === "V" ? partition.width / 2 : 0),
      };
      const updatedPartition = {
        ...partition,
        width: partition.width / (direction === "V" ? 2 : 1),
        height: partition.height / (direction === "H" ? 2 : 1),
      };
      return [
        ...prevPartitions.filter((p) => p.id !== id),
        updatedPartition,
        newPartition,
      ];
    });
  };

  const handleRemove = (id) => {
    setPartitions((prevPartitions) =>
      prevPartitions.filter((p) => p.id !== id)
    );
  };

  const handleResize = (id, size) => {
    setPartitions((prevPartitions) =>
      prevPartitions.map((p) => (p.id === id ? { ...p, ...size } : p))
    );
  };

  return (
    <div className="layout-container">
      {partitions.map((partition) => (
        <Partition
          key={partition.id}
          partition={partition}
          handleResize={handleResize}
          handleRemove={handleRemove}
          handleSplit={handleSplit}
        />
      ))}
    </div>
  );
};

export default Layout;
