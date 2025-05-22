import React from 'react';
import { Trash2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="flex flex-col items-start mb-4 md:mb-0">
            <div className="flex items-center">
              <Trash2 className="w-6 h-6 text-green-500 mr-2" />
              <span className="text-xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                RecoTrash
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Clasificación inteligente de residuos utilizando inteligencia artificial
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 md:mb-0 text-center">
              © 2025 RecoTrash. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;