import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { fadeIn, fadeInLeft, fadeInUp, hoverScale, rotateAnimation, longTransition, delays } from '../utils/animations';

const Footer: React.FC = () => {
  return (
    <motion.footer
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={longTransition}
      className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <motion.div
            variants={fadeInLeft}
            initial="initial"
            animate="animate"
            transition={{ delay: delays.short }}
            className="flex flex-col items-start mb-4 md:mb-0"
          >
            
            <motion.p
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: delays.long }}
              className="text-gray-600 dark:text-gray-300 mt-2"
            >
              Clasificación inteligente de residuos utilizando inteligencia artificial
            </motion.p>
          </motion.div>
        </div>
        
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ delay: delays.long }}
          className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6"
        >
          <div className="flex flex-col gap-7 md:flex-row justify-center items-center">
            <motion.div
              variants={hoverScale}
              whileHover="hover"
              className="flex items-center"
            >
              <motion.div variants={rotateAnimation}>
                <Trash2 className="w-6 h-6 text-green-500 mr-2" />
              </motion.div>
              <motion.span
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ delay: delays.medium }}
                className="text-xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent"
              >
                RecoTrash
              </motion.span>
            </motion.div>

            <motion.p
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: delays.long }}
              className="text-sm text-gray-500 dark:text-gray-400 mb-2 md:mb-0 text-center"
            >
              © 2025 RecoTrash. Todos los derechos reservados.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;