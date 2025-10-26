import React, {useState} from 'react';
import "./ComplexitySelector.css";

interface Props {
  currentComplexity: number;
  onConfirm: (complexity: number) => void;
  onCancel: () => void;
}

const ComplexitySelector: React.FC<Props> = ({currentComplexity, onConfirm, onCancel}) => {
  const [selectedComplexity, setSelectedComplexity] = useState(currentComplexity);

  const complexityLabels: { [key: number]: string } = {
    1: "Очень легко",
    2: "Легко",
    3: "Средне",
    4: "Сложно",
    5: "Очень сложно"
  };

  return (
    <div className="connect-four complexity-selector">
      <div className="complexity-content">
        <h2>Выберите сложность бота</h2>

        <div className="complexity-options">
          {[1, 2, 3, 4, 5].map(level => (
            <div
              key={level}
              className={`complexity-option ${selectedComplexity === level ? 'selected' : ''}`}
              onClick={() => setSelectedComplexity(level)}
            >
              <div className="complexity-level">{level}</div>
              <div className="complexity-label">{complexityLabels[level]}</div>
            </div>
          ))}
        </div>

        <div className="complexity-description">
          Уровень {selectedComplexity}: {complexityLabels[selectedComplexity]}
        </div>

        <div className="action-buttons">
          <button
            className="action-button green-button"
            onClick={() => onConfirm(selectedComplexity)}
          >
            Начать игру
          </button>
          <button
            className="action-button red-button"
            onClick={onCancel}
          >
            Назад
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplexitySelector;