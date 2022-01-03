import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import '../style/Attractions.css';

const { TabPane } = Tabs;

export default class Attractions extends React.Component {
	static propTypes = {
		plan: PropTypes.object.isRequired,
		attractions: PropTypes.array
	};

	onDragEnd = result => {
		const { destination, source } = result;
		if (!destination) return;
		if (destination.droppableId === source.droppableId && destination.index === source.index) return;

		const {
			plan: { visit }
		} = this.props;
		let sourceList;
		let destinationList;
		if (source.droppableId === 'attractions') {
			sourceList = this.props.attractions;
		} else {
			sourceList = visit[source.droppableId].attractions;
		}

		if (destination.droppableId === 'attractions') {
			destinationList = this.props.attractions;
		} else {
			destinationList = visit[destination.droppableId].attractions;
		}

		const target = sourceList[source.index];
		sourceList.splice(source.index, 1);
		destinationList.splice(destination.index, 0, target);
	};

	render() {
		const { plan } = this.props;

		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<div className='attractions-box flex'>
					<Tabs className='tabs' defaultActiveKey={1}>
						{plan.visit.map((item, index) => (
							<TabPane key={index} tab={item.date}>
								<Column listData={item.attractions} droppableId={`${index}`} />
							</TabPane>
						))}
					</Tabs>
					<Column
						className='column-attractions'
						title='Attractions'
						listData={this.props.attractions}
						droppableId='attractions'
					/>
				</div>
			</DragDropContext>
		);
	}
}
