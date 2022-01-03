import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import AttractionCard from './AttractionCard';
import '../style/Column.css';

export default class Column extends React.Component {
	render() {
		const { title, listData, droppableId, className } = this.props;

		return (
			<div className={`column__container flex ${className ?? ''}`}>
				{title && <h3 className='column__title'>{title}</h3>}
				<Droppable droppableId={droppableId}>
					{provided => (
						<div
							className='column__attractions'
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
						>
							{listData.map((item, index) => (
								<AttractionCard key={item.id} draggableId={item.id} name={item.name} index={index} />
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		);
	}
}
