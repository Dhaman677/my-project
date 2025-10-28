document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('drawingCanvas');
  const ctx = canvas.getContext('2d');

  let isDrawing = false;
  let startX = 0, startY = 0;

  // Mouse down: start drawing
  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
  });

  // Mouse move: draw preview line
  canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    // Clear and redraw each time for "preview"
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Optional: keep previous lines if you want (remove clearRect logic)

    // Draw line
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  });

  // Mouse up: finalize the line
  canvas.addEventListener('mouseup', () => {
    isDrawing = false;
  });

  // Mouse leave: cancel drawing
  canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
  });
});
