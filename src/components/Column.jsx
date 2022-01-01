import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './ListAttraction';
import '../style/Column.css';

class TaskList extends React.Component {
	render() {
		const { children, innerRef, provided } = this.props;
		return (
			<div className='column__task-list' {...provided.draggableProps} {...provided.dragHandleProps} ref={innerRef}>
				{children}
			</div>
		);
	}
}

export default class Column extends React.Component {
	render() {
		return (
			<div className='column__container'>
				<h3 className='column__title'>{this.props.column.title}</h3>
				<Droppable droppableId={this.props.column.id}>
					{provided => (
						<TaskList innerRef={provided.innerRef} provided={provided}>
							{this.props.tasks.map((task, index) => (
								<Task key={task.id} task={task} index={index} />
							))}
							{provided.placeholder}
						</TaskList>
					)}
				</Droppable>
			</div>
		);
	}
}
