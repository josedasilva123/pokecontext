import React, {
  DragEventHandler,
} from "react";

interface iUseDropZoneParams<E = any> {
  draggingElement: E;
  setHoveringElement: React.Dispatch<React.SetStateAction<E>>;
  dropType: string;
  callback: () => void;
}

interface iDropZoneEvents {
  onDragOver: DragEventHandler<any>;
  onDrop: DragEventHandler<any>;
}

interface iUseDropZoneReturn {
  dropZoneEvents: iDropZoneEvents;
}

export type tUseDropZone<E = any> = (
  params: iUseDropZoneParams<E>
) => iUseDropZoneReturn;

export const useDropZone: tUseDropZone = ({
  draggingElement,
  setHoveringElement,
  dropType,
  callback,
}) => {
  const onDragOver: DragEventHandler<any> = (event) => {
    event.preventDefault();
  };

  const onDrop = () => {
    if (draggingElement.dropType === dropType) {
      callback();
      setHoveringElement(null);
    }
  };

  return {
    dropZoneEvents: {
      onDrop,
      onDragOver,
    },
  };
};
