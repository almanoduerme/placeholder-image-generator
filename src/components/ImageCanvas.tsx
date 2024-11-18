import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { useTheme } from 'next-themes';

interface ImageCanvasProps {
  width: number;
  height: number;
}

const ImageCanvas: React.FC<ImageCanvasProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const drawImage = (width: number, height: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Create gradient background based on theme
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    if (theme === 'dark') {
      gradient.addColorStop(0, '#1f2937');
      gradient.addColorStop(1, '#111827');
    } else {
      gradient.addColorStop(0, '#f3f4f6');
      gradient.addColorStop(1, '#e5e7eb');
    }
    
    // Draw background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw grid pattern
    ctx.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 1;
    const gridSize = 20;

    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw dimensions text
    ctx.fillStyle = theme === 'dark' ? '#e5e7eb' : '#374151';
    ctx.font = `${Math.min(width / 10, height / 10, 32)}px Inter, system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Add text shadow for better visibility
    ctx.shadowColor = theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
    ctx.shadowBlur = 4;
    ctx.fillText(`${width} × ${height}`, width / 2, height / 2);

    // Reset shadow
    ctx.shadowBlur = 0;
  };

  useEffect(() => {
    drawImage(width, height);
  }, [width, height, theme]);

  // Calculate container size and scaling
  const containerStyle = {
    width: '100%',
    height: '100%',
    maxWidth: '800px',
    maxHeight: '600px',
    margin: '0 auto',
    position: 'relative' as const,
  };

  const canvasStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain' as const,
    display: 'block',
    margin: '0 auto',
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="w-full p-4">
      <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted p-6">
        <div ref={containerRef} style={containerStyle} className="flex items-center justify-center rounded-lg bg-background/50 backdrop-blur-sm p-4">
          <canvas ref={canvasRef} style={canvasStyle} className="rounded-md shadow-lg transition-shadow duration-200 hover:shadow-xl"  />
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Preview dimensions: {width}px × {height}px
        </div>
      </Card>
    </motion.div>
  );
};

export default ImageCanvas;