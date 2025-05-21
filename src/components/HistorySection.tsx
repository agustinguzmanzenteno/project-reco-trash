import React from 'react';
import { History, Trash2, Box, GlassWater, FileText, Recycle } from 'lucide-react';

interface HistoryItem {
  id: string;
  timestamp: Date;
  prediction: string;
  confidence: number;
  imageUrl: string;
}

interface HistorySectionProps {
  history: HistoryItem[];
  onClearHistory: () => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({ history, onClearHistory }) => {
  const getIcon = (prediction: string) => {
    switch (prediction) {
      case 'CARTÓN':
        return <Box className="w-5 h-5" />;
      case 'VIDRIO':
        return <GlassWater className="w-5 h-5" />;
      case 'PAPEL':
        return <FileText className="w-5 h-5" />;
      case 'METAL':
      case 'PLÁSTICO':
        return <Recycle className="w-5 h-5" />;
      default:
        return <Trash2 className="w-5 h-5" />;
    }
  };

  const getColorClass = (prediction: string) => {
    switch (prediction) {
      case 'CARTÓN':
        return 'text-amber-700 bg-amber-100 dark:bg-amber-900/30';
      case 'VIDRIO':
        return 'text-green-500 bg-green-100 dark:bg-green-900/30';
      case 'PAPEL':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
      case 'METAL':
        return 'text-gray-500 bg-gray-100 dark:bg-gray-900/30';
      case 'PLÁSTICO':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30';
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-700';
    }
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <section id="history" className="py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <History className="w-6 h-6 text-green-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Historial de Clasificaciones</h2>
            </div>
            <button
              onClick={onClearHistory}
              className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors duration-300"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-600">
                  <img
                    src={item.imageUrl}
                    alt="Imagen clasificada"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1.5 rounded-lg ${getColorClass(item.prediction)}`}>
                      {getIcon(item.prediction)}
                    </div>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {item.prediction}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({item.confidence}% confianza)
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;