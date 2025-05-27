import { useState } from "react";
import Header from "./components/Header";
import UploadSection from "./components/UploadSection";
import ResultsSection from "./components/ResultsSection";
import HistorySection from "./components/HistorySection";
import InfoSection from "./components/InfoSection";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

interface HistoryItem {
  id: string;
  timestamp: Date;
  prediction: string;
  confidence: number;
  imageUrl: string;
}

function App() {
  const [currentPrediction, setCurrentPrediction] = useState<string | null>(
    null
  );
  const [currentConfidence, setCurrentConfidence] = useState<number | null>(
    null
  );
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleClassificationComplete = (
    prediction: string,
    confidence: number,
    imageUrl: string
  ) => {
    setCurrentPrediction(prediction);
    setCurrentConfidence(confidence);

    const newHistoryItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: new Date(),
      prediction,
      confidence,
      imageUrl,
    };

    setHistory((prev) => [newHistoryItem, ...prev]);
  };

  const handleClearHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleImageRemove = () => {
    setCurrentPrediction(null);
    setCurrentConfidence(null);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 dark:text-white transition-colors duration-300">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <UploadSection
              onClassificationComplete={handleClassificationComplete}
              onImageRemove={handleImageRemove}
            />
            <ResultsSection
              prediction={currentPrediction}
              confidence={currentConfidence}
            />
            <HistorySection
              history={history}
              onClearHistory={(id) => handleClearHistory(id)}
            />
            <InfoSection />
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
