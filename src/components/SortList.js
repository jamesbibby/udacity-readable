import React from 'react'

const SortList = props => (
	<div className="sortList">
		<div>Order by:</div>
		<div>
			<button
				className={props.sortOrder === 'voteScore' && 'currentSort'}
				onClick={() => props.reSort('voteScore')}
			>
				Votes
			</button>
		</div>
		<div>
			<button
				className={props.sortOrder === 'timestamp' && 'currentSort'}
				onClick={() => props.reSort('timestamp')}
			>
				Recency
			</button>
		</div>
		<div>
			<button
				className={props.sortOrder === 'commentCount' && 'currentSort'}
				onClick={() => props.reSort('commentCount')}
			>
				Comments
			</button>
		</div>
	</div>
)

export default SortList
