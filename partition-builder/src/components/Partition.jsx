import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const Partition = ({ partition, handleResize, handleRemove, handleSplit }) => {
  return (
    <ResizableBox
      key={partition.id}
      width={partition.width}
      height={partition.height}
      resizeHandles={["s", "e", "se"]}
      onResizeStop={(e, { size }) => handleResize(partition.id, size)}
      style={{
        position: "absolute",
        top: partition.top,
        left: partition.left,
        backgroundColor: partition.color,
      }}
    >
      <div
        className="box-container"
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        <button style={{backgroundColor:"green"}} onClick={() => handleSplit(partition.id, "V")}>V</button>
        <button style={{backgroundColor:"yellow"}} onClick={() => handleSplit(partition.id, "H")}>H</button>
        {partition.parentId !== null && (
          <button style={{backgroundColor:"red"}} onClick={() => handleRemove(partition.id)}>-</button>
        )}
      </div>
    </ResizableBox>
  );
};

export default Partition;
