import React from 'react';
import { Box, Recycle, Trash2, GlassWater, FileText } from 'lucide-react';

interface ResultCategory {
  id: string;
  name: string;
  confidence: number;
  description: string;
  icon: React.ReactNode;
  color: string;
  disposalTips: string;
}

interface ResultsSectionProps {
  prediction: string | null;
  confidence: number | null;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ prediction, confidence }) => {
  const categories: { [key: string]: ResultCategory } = {
    'CARTÓN': {
      id: 'carton',
      name: 'Cartón',
      confidence: confidence || 0,
      description: 'Material de embalaje reciclable hecho de pulpa de papel.',
      icon: <Box className="w-6 h-6" />,
      color: 'text-amber-700 bg-amber-100 dark:bg-amber-900/30',
      disposalTips: 'Aplana las cajas y deposita en el contenedor azul. Asegúrate de que esté limpio y seco.'
    },
    'VIDRIO': {
      id: 'vidrio',
      name: 'Vidrio',
      confidence: confidence || 0,
      description: 'Material reciclable transparente o de color.',
      icon: <GlassWater className="w-6 h-6" />,
      color: 'text-green-500 bg-green-100 dark:bg-green-900/30',
      disposalTips: 'Deposita en el contenedor verde. Retira tapas y enjuaga antes de reciclar.'
    },
    'METAL': {
      id: 'metal',
      name: 'Metal',
      confidence: confidence || 0,
      description: 'Materiales metálicos como latas y envases de aluminio.',
      icon: <Recycle className="w-6 h-6" />,
      color: 'text-gray-500 bg-gray-100 dark:bg-gray-900/30',
      disposalTips: 'Deposita en el contenedor amarillo. Aplasta las latas para ahorrar espacio.'
    },
    'PAPEL': {
      id: 'papel',
      name: 'Papel',
      confidence: confidence || 0,
      description: 'Material reciclable hecho de fibras de celulosa.',
      icon: <FileText className="w-6 h-6" />,
      color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
      disposalTips: 'Deposita en el contenedor azul. Mantén separado de otros materiales.'
    },
    'PLÁSTICO': {
      id: 'plastico',
      name: 'Plástico',
      confidence: confidence || 0,
      description: 'Material sintético reciclable como botellas y envases.',
      icon: <Recycle className="w-6 h-6" />,
      color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30',
      disposalTips: 'Deposita en el contenedor amarillo. Aplasta los envases para reducir volumen.'
    },
    'BASURA': {
      id: 'basura',
      name: 'Basura',
      confidence: confidence || 0,
      description: 'Residuos que no pueden ser reciclados.',
      icon: <Trash2 className="w-6 h-6" />,
      color: 'text-gray-500 bg-gray-100 dark:bg-gray-700',
      disposalTips: 'Deposita en el contenedor de restos. Intenta minimizar este tipo de residuos.'
    }
  };

  if (!prediction || !confidence) {
    return null;
  }

  const currentCategory = categories[prediction];
  if (!currentCategory) {
    return null;
  }

  return (
    <section id="results" className="py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Resultados del Análisis</h2>

          <div className="mb-8">
            <div className={`rounded-lg p-6 ${currentCategory.color}`}>
              <div className="flex items-center mb-4">
                {currentCategory.icon}
                <h3 className="text-xl font-semibold ml-2">{currentCategory.name}</h3>
                <span className="ml-auto font-bold text-lg">{currentCategory.confidence}%</span>
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-200">{currentCategory.description}</p>
              
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                <h4 className="font-medium mb-2 text-gray-800 dark:text-white">Consejos para desechar:</h4>
                <p className="text-gray-600 dark:text-gray-300">{currentCategory.disposalTips}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;