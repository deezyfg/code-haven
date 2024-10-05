import React, { useRef, useEffect, useState } from 'react';
import './Whiteboard.css';

const Whiteboard = ({ socket, roomId }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const handleDrawing = (data) => {
      const { x, y, color, lineWidth, isNewLine } = data;
      context.strokeStyle = color;
      context.lineWidth = lineWidth;

      if (isNewLine) {
        context.beginPath();
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
        context.stroke();
      }
    };

    socket.on('drawing', handleDrawing);

    return () => {
      socket.off('drawing', handleDrawing);
    };
  }, [socket]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e, true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    canvasRef.current.getContext('2d').beginPath();
  };

  const draw = (e, isNewLine = false) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    socket.emit('drawing', { roomId, x, y, color, lineWidth, isNewLine });
  };

  const clearWhiteboard = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit('clear_whiteboard', { roomId });
  };

  return (
    <div className="whiteboard">
      <div className="whiteboard-controls">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type="range"
          min="1"
          max="20"
          value={lineWidth}
          onChange={(e) => setLineWidth(e.target.value)}
        />
        <button onClick={clearWhiteboard}>Clear Whiteboard</button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onMouseMove={draw}
      />
    </div>
  );
};

export default Whiteboard;
