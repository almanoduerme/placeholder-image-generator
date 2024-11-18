import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import Instructions from './Instructions';
import ImageCanvas from './ImageCanvas';
import ImageControls from './ImageControls';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ImageSize {
  width: number;
  height: number;
}

const ImagePlaceholderBuilder: React.FC = () => {
  const [size, setSize] = useState<ImageSize>({ width: 400, height: 300 });
  const [submittedSize, setSubmittedSize] = useState<ImageSize>(size);
  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const handleWidthChange = (width: number) => {
    setSize((prevSize) => ({
      ...prevSize,
      width,
    }));
    setError(null);
  };

  const handleHeightChange = (height: number) => {
    setSize((prevSize) => ({
      ...prevSize,
      height,
    }));
    setError(null);
  };

  const handleSubmit = () => {
    if (size.width < 1 || size.height < 1) {
      setError('Width and height must be at least 1 pixel');
      return;
    }

    if (size.width > 3000 || size.height > 2000) {
      setError('Maximum dimensions are 3000x2000 pixels');
      return;
    }

    setError(null);
    setSubmittedSize(size);
    setShowInstructions(false);
  };

  const handleStart = () => {
    setShowInstructions(false);
  };

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = submittedSize.width;
    canvas.height = submittedSize.height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Create gradient background based on theme
    const gradient = ctx.createLinearGradient(0, 0, submittedSize.width, submittedSize.height);
    if (theme === 'dark') {
      gradient.addColorStop(0, '#1f2937');
      gradient.addColorStop(1, '#111827');
    } else {
      gradient.addColorStop(0, '#f3f4f6');
      gradient.addColorStop(1, '#e5e7eb');
    }
    
    // Draw background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, submittedSize.width, submittedSize.height);

    // Draw grid pattern
    ctx.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 1;
    const gridSize = 20;

    for (let x = 0; x <= submittedSize.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, submittedSize.height);
      ctx.stroke();
    }

    for (let y = 0; y <= submittedSize.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(submittedSize.width, y);
      ctx.stroke();
    }

    // Draw dimensions text
    ctx.fillStyle = theme === 'dark' ? '#e5e7eb' : '#374151';
    ctx.font = `${Math.min(submittedSize.width / 10, submittedSize.height / 10, 32)}px Inter, system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Add text shadow
    ctx.shadowColor = theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
    ctx.shadowBlur = 4;
    ctx.fillText(`${submittedSize.width} × ${submittedSize.height}`,
      submittedSize.width / 2,
      submittedSize.height / 2
    );

    const imageUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `placeholder_${submittedSize.width}x${submittedSize.height}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto space-y-8">
        <motion.h1  className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Placeholder Image Generator
        </motion.h1>
        <AnimatePresence mode="wait">
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-md mx-auto">
              <Alert variant="destructive" className="flex items-center space-x-2">
                <AlertDescription className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {showInstructions ? (
            <Instructions onStart={handleStart} />
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              <ImageControls width={size.width} height={size.height} onWidthChange={handleWidthChange} onHeightChange={handleHeightChange} onSubmit={handleSubmit} onDownload={handleDownload} />
              <ImageCanvas width={submittedSize.width} height={submittedSize.height} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ImagePlaceholderBuilder;