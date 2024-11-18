import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ImageIcon, Download, RefreshCw } from 'lucide-react';

interface ImageControlsProps {
  width: number;
  height: number;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onSubmit: () => void;
  onDownload: () => void;
}

const ImageControls: React.FC<ImageControlsProps> = ({ width, height, onWidthChange, onHeightChange, onSubmit, onDownload }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(e.target.value));
    onWidthChange(value);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(e.target.value));
    onHeightChange(value);
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md mx-auto">
      <Card className="p-6 space-y-6">
        <div className="flex items-center space-x-2">
          <ImageIcon className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Image Dimensions</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width" className="text-sm font-medium">
              Width (px)
            </Label>
            <Input type="number" id="width" value={width} onChange={handleWidthChange} min={1} className="focus-visible:ring-primary" placeholder="Enter width" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height" className="text-sm font-medium">
              Height (px)
            </Label>
            <Input type="number" id="height" value={height} onChange={handleHeightChange} min={1} className="focus-visible:ring-primary" placeholder="Enter height" />
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={onSubmit} className="flex-1 bg-primary hover:bg-primary/90" size="lg">
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate Image
          </Button>
          <Button onClick={onDownload} variant="outline" className="flex-1" size="lg">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>

        <div>
        <p className="text-xs text-muted-foreground text-center mt-4">
          Minimum dimensions: 1x1 pixels
        </p>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Maximum dimensions: 3000x2000 pixels
        </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default ImageControls;