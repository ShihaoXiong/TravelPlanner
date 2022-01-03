import React from 'react';
import '../style/AttractionCard.css';
import { Draggable } from 'react-beautiful-dnd';

export default class AttractionCard extends React.Component {
	render() {
		const { draggableId, index, name } = this.props;

		return (
			<Draggable draggableId={draggableId} index={index}>
				{(provided, snapshot) => (
					<div
						className={`attraction-card__container ${snapshot.isDragging ? 'is-dragging' : ''}`}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						data-index={index + 1}
						ref={provided.innerRef}
					>
						{name}
					</div>
				)}
			</Draggable>
		);
	}
}
