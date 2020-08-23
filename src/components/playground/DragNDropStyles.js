export const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "#ebecf0",
});

export const getItemStyle = (isDragging, draggableStyle) => ({

    background: isDragging ? "red" : "#fff",
    transform: isDragging ? "rotate(45deg)" : "",

    // styles we need to apply on draggables
    ...draggableStyle
});