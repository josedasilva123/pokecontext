/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useCallback,
  DragEventHandler,
  useEffect,
} from "react";

interface iUseDragElementParams<E = any> {
  currentElement: E;
  draggingElement: E;
  setDraggingElement: React.Dispatch<React.SetStateAction<E>>;
  hoveringElement: E;
  setHoveringElement: React.Dispatch<React.SetStateAction<E>>;
  dropType: string;
}

interface iDragElementEvents {
  onDragStart: DragEventHandler<any>;
  onDragEnd: DragEventHandler<any>;
  onDragOver: DragEventHandler<any>;
  onDragLeave: DragEventHandler<any>;
}

interface iUseDragElementReturn {
  dragging: boolean;
  hover: boolean;
  dragElementEvents: iDragElementEvents;
}

export type tUseDragElement<E = any> = (
  params: iUseDragElementParams<E>
) => iUseDragElementReturn;

export const useDragElement: tUseDragElement = ({
  currentElement,
  draggingElement,
  setDraggingElement,
  hoveringElement,
  setHoveringElement,
  dropType,
}) => {
  const [dragging, setDragging] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (
      hoveringElement?.id === currentElement?.id &&
      hoveringElement?.id !== draggingElement?.id
    ) {
      setHover(true);
    } else {
      setHover(false);
    }
  }, [hoveringElement, draggingElement]);

  const onDragStart = useCallback(() => {
    setDraggingElement(currentElement);
    setDragging(true);
  }, [currentElement, setDraggingElement]);

  const onDragEnd = useCallback(() => {
    setDraggingElement(null);
    setHoveringElement(null);
    setDragging(false);
  }, [setDraggingElement]);

  const onDragOver: DragEventHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (
        draggingElement.dropType === dropType &&
        hoveringElement !== currentElement
      ) {
        setHoveringElement(currentElement);
      }
    },
    [draggingElement, hoveringElement, currentElement, setHoveringElement]
  );

  const onDragLeave: DragEventHandler = useCallback(() => {
    setHoveringElement(null);
  }, [setHoveringElement]);

  /*
    const onDragOver: DragEventHandler<any> = (event) => {
      if (draggingElement.dropType === dropType) {
        const target = event.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        const offset = event.clientY - rect.top - rect.height / 2;
  
        if (offset < 0) {
          setHoveringElement(currentElement);
        } else {
          setHoveringElement(null);
        }
      }
    };
    */

  return {
    hover,
    dragging,
    dragElementEvents: {
      onDragStart,
      onDragEnd,
      onDragOver,
      onDragLeave,
    },
  };
};
