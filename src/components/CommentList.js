import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	modifyCommentVoteScoreAsync,
	getCommentsAsync,
	deleteCommentAsync,
	editComment,
	saveCommentAsync,
	addCommentAsync,
} from '../actions'
import Plus from 'react-icons/lib/fa/plus'
import Comment from './Comment'
import CommentEdit from './CommentEdit'

class CommentList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showCreateComment: false,
		}
		this.showCreateComment = this.showCreateComment.bind(this)
		this.hideCreateComment = this.hideCreateComment.bind(this)
	}

	showCreateComment() {
		this.setState({ showCreateComment: true })
	}

	hideCreateComment() {
		this.setState({ showCreateComment: false })
	}

	componentWillMount() {
		this.props.getComments(this.props.post.id)
	}

	render() {
		const {
			post,
			comments,
			modifyCommentVoteScore,
			editComment,
			saveComment,
			deleteComment,
			addComment,
		} = this.props
		return (
			<div className="postComments">
				<div className="postCommentsHeader">
					<div>
						Comments: (
						<span className="postListComments">
							{post.commentCount} comments
						</span>
						)
					</div>
					<div>
						<Plus className="icon" onClick={this.showCreateComment} />Add a new
						Comment
					</div>
				</div>
				{this.state.showCreateComment && (
					<CommentEdit
						postId={post.id}
						newComment={true}
						addComment={(postId, body, author) => {
							this.hideCreateComment()
							return addComment(postId, body, author)
						}}
						hideCreateComment={this.hideCreateComment}
					/>
				)}
				<div className="postCommentList">
					{comments &&
						comments.map(
							comment =>
								comment.editing ? (
									<CommentEdit
										key={comment.id}
										postId={post.id}
										comment={comment}
										saveComment={saveComment}
										cancelEditing={() =>
											this.props.editComment(post.id, comment.id, false)}
									/>
								) : (
									<Comment
										key={comment.id}
										postId={post.id}
										comment={comment}
										modifyCommentVoteScore={(commentId, body) =>
											modifyCommentVoteScore(post.id, commentId, body)}
										editComment={editComment}
										deleteComment={deleteComment}
									/>
								)
						)}
				</div>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getComments: postId => {
			dispatch(getCommentsAsync(postId))
		},
		deleteComment: (postId, commentId) =>
			dispatch(deleteCommentAsync(postId, commentId)),
		editComment: (postId, commentId, editing) =>
			dispatch(editComment(postId, commentId, editing)),
		saveComment: (postId, commentId, body) =>
			dispatch(saveCommentAsync(postId, commentId, body)),
		addComment: (postId, body, author) =>
			dispatch(addCommentAsync(postId, body, author)),
		modifyCommentVoteScore: (postId, commentId, modification) =>
			dispatch(modifyCommentVoteScoreAsync(postId, commentId, modification)),
	}
}

function mapStateToProps(state, props) {
	return {
		comments: state.messageBoard.comments[props.post.id],
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
