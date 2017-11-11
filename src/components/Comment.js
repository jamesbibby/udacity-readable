import React from 'react'
import Trash from 'react-icons/lib/fa/trash'
import Pencil from 'react-icons/lib/fa/pencil'
import VoteScore from './VoteScore'

const Comment = props => (
	<div className="commentBlock">
		<VoteScore
			className="commentVoteScore"
			entityId={props.comment.id}
			voteScore={props.comment.voteScore}
			modifyVoteScore={props.modifyCommentVoteScore}
		/>
		<div className="commentBody">
			{props.comment.body}
			<span className="authorBlock">
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
