import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ImageIcon, ArrowRight, Ruler, Download } from 'lucide-react';

interface InstructionsProps {
  onStart: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ onStart }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0
    }
  };

  const steps = [
    { icon: <Ruler className="w-5 h-5" />, title: "Set Dimensions", description: "Enter your desired width and height for the placeholder image." },
    { icon: <ImageIcon className="w-5 h-5" />, title: "Generate", description: "Click 'Generate' to create your custom placeholder image." },
    { icon: <Download className="w-5 h-5" />, title: "Download", description: "Save your generated image directly to your device." }
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-2xl mx-auto p-4">
      <Card className="overflow-hidden bg-gradient-to-br from-background to-muted">
        <div className="p-6">
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Welcome to Image Placeholder Generator
            </h2>
            <p className="text-muted-foreground">
              Create custom placeholder images for your projects in seconds. Follow these simple steps:
            </p>
          </motion.div>

          <ScrollArea className="h-[280px] mt-6 pr-4">
            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div key={step.title} variants={itemVariants} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          <motion.div variants={itemVariants} className="mt-8 flex justify-end">
            <Button onClick={onStart} size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Instructions;