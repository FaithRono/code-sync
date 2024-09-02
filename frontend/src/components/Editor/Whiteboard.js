import React, { useRef, useState, useEffect } from 'react';
import { fabric } from 'fabric';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [drawingMode, setDrawingMode] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);

  useEffect(() => {
    if (!canvasRef.current) return; // Ensure canvasRef is not null

    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.isDrawingMode = drawingMode;
    canvas.freeDrawingBrush.color = color;
    canvas.freeDrawingBrush.width = lineWidth;

    // Update brush properties on drawing mode change
    canvas.on('path:created', () => {
      canvas.freeDrawingBrush.color = color;
      canvas.freeDrawingBrush.width = lineWidth;
    });

    // Clean up on component unmount
    return () => canvas.dispose();
  }, [drawingMode, color, lineWidth]);

  const toggleDrawingMode = () => {
    setDrawingMode(prevMode => !prevMode);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleLineWidthChange = (event) => {
    setLineWidth(parseInt(event.target.value, 10));
  };

  const handleClear = () => {
    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.clear();
  };

  const handleSave = () => {
    const canvas = new fabric.Canvas(canvasRef.current);
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'whiteboard.png';
    link.click();
  };

  return (
    <div style={{ height: '100%', width: '100%', backgroundColor: '#f0f0f0', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '10px', backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
        <button onClick={toggleDrawingMode}>
          {drawingMode ? 'Disable Drawing' : 'Enable Drawing'}
        </button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleSave}>Save</button>
        <input type="color" value={color} onChange={handleColorChange} />
        <input type="number" value={lineWidth} onChange={handleLineWidthChange} min="1" max="20" />
        {/* Additional tools can be added here */}
      </div>
      <canvas
        ref={canvasRef}
        style={{ border: '1px solid #ccc', height: 'calc(100% - 40px)', width: '100%' }}
      />
    </div>
  );
};

export default Whiteboard;
