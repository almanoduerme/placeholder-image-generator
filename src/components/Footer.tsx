import { Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
        <div className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with ❤️ by{" "}
          <a href="https://www.nahuelgomez.dev/" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4 transition-colors hover:text-primary">
            Nahuel Gómez
          </a>
          . The source code is available on{" "}
          <a href="https://github.com/almanoduerme/" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4 transition-colors hover:text-primary">
            GitHub
          </a>
          .
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/almanoduerme/placeholder-image-generator/" target="_blank" rel="noreferrer" aria-label="Visit GitHub repository">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://twitter.com/almanoduerme/" target="_blank" rel="noreferrer" aria-label="Visit Twitter profile">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
