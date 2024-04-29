import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import documentData from "./documentData.json";
import "./styles.css";

const DocumentCards = () => {
  const [documents, setDocuments] = useState(documentData);
  const [overlayImage, setOverlayImage] = useState(null);

  const handleCardClick = (imageSrc) => {
    setOverlayImage(imageSrc);
  };

  const handleCloseOverlay = () => {
    setOverlayImage(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleCloseOverlay();
    }
  };

  const onDragEnd = (result) => {
    // Reorder documents if needed
    if (!result.destination) return; // dropped outside the list
    const items = Array.from(documents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDocuments(items); // Updating state using setDocuments
  };

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="documents">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="document-cards-container"
            >
              {documents.map((document, index) => (
                <Draggable
                  key={document.type}
                  draggableId={document.type}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="document-card"
                      onClick={() => handleCardClick(document.thumbnail)}
                    >
                      <img
                        src={document.thumbnail}
                        alt={document.title}
                        height="200px"
                        width="200px"
                      />
                      <span className="title-style">{document.title}</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {overlayImage && (
        <div
          className="overlay"
          onClick={handleCloseOverlay}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <img src={overlayImage} alt="Overlay" height="300px" width="300px" />
        </div>
      )}
    </React.Fragment>
  );
};

export default DocumentCards;
