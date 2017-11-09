import React from 'react'
import Trash from 'react-icons/lib/fa/trash'
import Pencil from 'react-icons/lib/fa/pencil'
import VoteScore from './VoteScore'

const Comment = props => (
	<div
		className="commentBlock"
		style={{
			display: 'flex',
			justifyContent: 'space-between',
			alignContent: 'stretch',
			flex: '1 100%',
			borderBottom: '1px solid',
			paddingBottom: '10px',
		}}
	>
		<VoteScore
			className="commentVoteScore"
			entityId={props.comment.id}
			voteScore={props.comment.voteScore}
			modifyVoteScore={props.modifyCommentVoteScore}
		/>
		<div
			className="commentBody"
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				flex: '4 0px',
			}}
		>
			{props.comment.body}
			<span style={{ color: 'grey', fontSize: 'small', paddingRight: '10px' }}>
				{props.comment.author} at ({new Date(
					props.comment.timestamp
				).toLocaleString()})
			</span>
		</div>
		<Pencil
			className="icon"
			onClick={() => props.editComment(props.postId, props.comment.id, true)}
		/>
		<Trash
			className="icon"
			onClick={() => props.deleteComment(props.postId, props.comment.id)}
		/>
	</div>
)

export default Comment
