import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface SudokuVisualizerProps {
  board: string[][];
  title?: string;
  showSolution?: boolean;
}

const SudokuVisualizer: React.FC<SudokuVisualizerProps> = ({ 
  board, 
  title = "Sudoku Board",
  showSolution = false 
}) => {
  const { theme } = useTheme();

  const isOriginalCell = (row: number, col: number) => {
    return board[row][col] !== '.';
  };

  const getCellStyle = (row: number, col: number) => {
    const baseStyle = `
      w-10 h-10 flex items-center justify-center text-lg font-semibold
      border border-gray-300 dark:border-gray-600
      transition-all duration-200
    `;
    
    // Thicker borders for 3x3 boxes
    const boxBorderStyle = `
      ${(row + 1) % 3 === 0 ? 'border-b-2 border-gray-400 dark:border-gray-500' : ''}
      ${(col + 1) % 3 === 0 ? 'border-r-2 border-gray-400 dark:border-gray-500' : ''}
      ${row % 3 === 0 ? 'border-t-2 border-gray-400 dark:border-gray-500' : ''}
      ${col % 3 === 0 ? 'border-l-2 border-gray-400 dark:border-gray-500' : ''}
    `;

    // Different styling for original vs filled cells
    const cellStyle = isOriginalCell(row, col)
      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 font-bold'
      : showSolution 
        ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
        : 'bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100';

    return `${baseStyle} ${boxBorderStyle} ${cellStyle}`;
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white'} rounded-xl p-6 border ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} shadow-lg`}>
      <h3 className={`text-lg font-semibold mb-4 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>
      
      <div className="flex justify-center">
        <div className="grid grid-cols-9 gap-0 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg">
          {board.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={getCellStyle(rowIndex, colIndex)}
              >
                {cell === '.' ? '' : cell}
              </div>
            ))
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-50 dark:bg-blue-900/20 border border-gray-300 dark:border-gray-600"></div>
          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Original</span>
        </div>
        {showSolution && (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-50 dark:bg-green-900/20 border border-gray-300 dark:border-gray-600"></div>
            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Solution</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SudokuVisualizer;
