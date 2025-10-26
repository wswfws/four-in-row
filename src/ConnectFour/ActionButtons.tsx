import React from 'react';

interface Props {
  onUndo: () => void;
  onRedo: () => void;
  onRestart: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const ActionButtons: React.FC<Props> = ({onUndo, onRedo, onRestart, canUndo, canRedo}) => (
  <div className="action-buttons">
    <button
      className="action-button green-button"
      onClick={onUndo}
      disabled={!canUndo}
    >
      Отменить ход
    </button>
    <button
      className="action-button red-button"
      onClick={onRedo}
      disabled={!canRedo}
    >
      Возобновить ход
    </button>
    <button
      className="action-button restart-button"
      onClick={onRestart}
    >
      Новая игра
    </button>
  </div>
);

export default ActionButtons;