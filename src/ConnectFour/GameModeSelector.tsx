import React from 'react';

interface Props {
  onPlayerModeSelect: () => void;
  onBotModeSelect: () => void;
}

export const GameModeSelector = ({onPlayerModeSelect, onBotModeSelect}: Props) => (
  <div className="connect-four mode-selection">
    <div className="action-buttons">
      <button
        className="action-button green-button"
        onClick={onPlayerModeSelect}
      >
        2 человека
      </button>
      <button
        className="action-button red-button"
        onClick={onBotModeSelect}
      >
        против бота
      </button>
    </div>
  </div>
);

export default GameModeSelector;