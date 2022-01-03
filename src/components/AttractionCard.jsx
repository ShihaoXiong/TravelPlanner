import React from 'react';
import '../style/ListAttraction.css';
import { Draggable } from 'react-beautiful-dnd';

class Container extends React.Component {
	render() {
		const { children, innerRef, provided } = this.props;
		return (
			<div className='list__container' {...provided.draggableProps} {...provided.dragHandleProps} ref={innerRef}>
				{children}
			</div>
		);
	}
}

export default class Task extends React.Component {
	render() {
		return (
			<Draggable draggableId={this.props.task.id} index={this.props.index}>
				{(provided, snapshot) => (
					<Container provided={provided} innerRef={provided.innerRef} isDragging={snapshot.isDragging}>
						{this.props.task.content}
					</Container>
				)}
			</Draggable>
		);
	}
}
