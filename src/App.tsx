import PlaceholderImageGenerator from './components/ImagePlaceholderBuilder';
import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from './components/ThemeToggle';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="relative min-h-screen flex flex-col container mx-auto">
        <main className="flex-1 container py-8">
          <ThemeToggle />
          <PlaceholderImageGenerator />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;