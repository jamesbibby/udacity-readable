import React from 'react'
import Plus from 'react-icons/lib/fa/plus'
import Minus from 'react-icons/lib/fa/minus'
import Trash from 'react-icons/lib/fa/trash'
import Pencil from 'react-icons/lib/fa/pencil'

const Comment = props => (
	<div className="commentBlock">
		<div className="postVoteScore">
			<Plus
				onClick={() =>
					props.modifyCommentVoteScore(
						props.postId,
						props.comment.id,
						'upVote'
					)}
			/>
			{props.comment.voteScore < 0 ? 0 : props.comment.voteScore}
			<Minus
				onClick={() =>
					props.comment.voteScore > 0 &&
					props.modifyCommentVoteScore(
						props.postId,
						props.comment.id,
						'downVote'
					)}
			/>
			<Pencil
				onClick={() => props.editComment(props.postId, props.comment.id)}
			/>
			<Trash
				onClick={() => props.deleteComment(props.postId, props.comment.id)}
			/>
		</div>
		<p>{props.comment.author}</p>
		<p>{props.comment.body}</p>
		<p>{new Date(props.comment.timestamp).toLocaleString()}</p>
	</div>
)

export default Comment
