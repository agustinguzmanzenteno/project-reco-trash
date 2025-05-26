import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import basuraImg from "../assets/basura.png";
import cartonImg from "../assets/carton.png";
import metalImg from "../assets/metal.png";
import papelImg from "../assets/papel.png";
import plasticoImg from "../assets/plastico.png";
import vidrioImg from "../assets/vidrio.png";
import { History, Trash2 } from "lucide-react";

interface HistoryItem {
  id: string;
  timestamp: Date;
  prediction: string;
  confidence: number;
  imageUrl: string;
}

interface HistorySectionProps {
  history: HistoryItem[];
  onClearHistory: (id: string) => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({
  history,
  onClearHistory,
}) => {
  const getIcon = (prediction: string) => {
    switch (prediction) {
      case "CARTÓN":
        return <img src={cartonImg} alt="Cartón" className="w-5 h-5" />;
      case "VIDRIO":
        return <img src={vidrioImg} alt="Vidrio" className="w-5 h-5" />;
      case "PAPEL":
        return <img src={papelImg} alt="Papel" className="w-5 h-5" />;
      case "METAL":
        return <img src={metalImg} alt="Metal" className="w-5 h-5" />;
      case "PLÁSTICO":
        return <img src={plasticoImg} alt="Plástico" className="w-5 h-5" />;
      default:
        return <img src={basuraImg} alt="Basura" className="w-5 h-5" />;
    }
  };

  const getColorClass = (prediction: string) => {
    switch (prediction) {
      case "CARTÓN":
        return "text-gray-500 bg-gray-100 dark:bg-gray-900/30";
      case "VIDRIO":
        return "text-gray-500 bg-gray-100 dark:bg-gray-900/30";
      case "PAPEL":
        return "text-gray-500 bg-gray-100 dark:bg-gray-900/30";
      case "METAL":
        return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30";
      case "PLÁSTICO":
        return "text-blue-500 bg-blue-100 dark:bg-blue-900/30";
      default:
        return "text-gray-500 bg-gray-100 dark:bg-gray-700";
    }
  };

  if (history.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        id="history"
        className="py-8"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300"
        >
          <div className="p-6 text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <History className="w-8 h-8 mx-auto text-green-500 mb-2" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Historial vacío
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Aún no has clasificado ningún residuo. Cuando lo hagas, los
              resultados aparecerán aquí.
            </p>
          </div>
        </motion.div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="history"
      className="py-8"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <History className="w-6 h-6 text-green-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Historial de Clasificaciones
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {history.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-600"
                  >
                    <img
                      src={item.imageUrl}
                      alt="Imagen clasificada"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  <div className="flex-grow">
                    <div className="flex items-center space-x-2">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`p-1.5 rounded-lg ${getColorClass(
                          item.prediction
                        )}`}
                      >
                        {getIcon(item.prediction)}
                      </motion.div>
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
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onClearHistory(item.id)}
                    className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HistorySection;
