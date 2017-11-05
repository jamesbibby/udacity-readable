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
		<Pencil onClick={() => props.editComment(props.postId, props.comment.id)} />
		<Trash
			onClick={() => props.deleteComment(props.postId, props.comment.id)}
		/>
		<p>{props.comment.author}</p>
		<p>{props.comment.body}</p>
		<p>{new Date(props.comment.timestamp).toLocaleString()}</p>
	</div>
)

export default Comment
