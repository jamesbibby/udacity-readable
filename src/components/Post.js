import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Plus from 'react-icons/lib/fa/plus'
import Minus from 'react-icons/lib/fa/minus'
import Close from 'react-icons/lib/fa/close'
import Comment from './Comment'
import CommentEdit from './CommentEdit'
import CommentAdd from './CommentAdd'

import {
	modifyPostVoteScoreAsync,
	modifyCommentVoteScoreAsync,
	getCommentsAsync,
	deleteCommentAsync,
	editComment,
	saveCommentAsync,
	addCommentAsync,
} from '../actions'

class Post extends Component {
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
		this.props.getComments(this.props.match.params.postId)
	}

	render() {
		const {
			post,
			comments,
			modifyPostVoteScore,
			modifyCommentVoteScore,
			editComment,
			saveComment,
			deleteComment,
			addComment,
		} = this.props

		return post ? (
			<div className="postDetail">
				<div className="postVoteScore">
					<Plus onClick={() => modifyPostVoteScore(post.id, 'upVote')} />
					{post.voteScore < 0 ? 0 : post.voteScore}
					<Minus
						onClick={() =>
							post.voteScore > 0 && modifyPostVoteScore(post.id, 'downVote')}
					/>
				</div>
				<div className="postTitle">
					<h2>{post.title}</h2>
					<h3>{post.author}</h3>
					<p>{new Date(post.timestamp).toUTCString()}</p>
					<p>{post.body}</p>
				</div>
				<div className="newComment">
					<Plus onClick={this.showCreateComment} />
					{this.state.showCreateComment && (
						<div>
							<CommentAdd
								postId={post.id}
								addComment={(postId, body, author) => {
									this.hideCreateComment()
									return addComment(postId, body, author)
								}}
							/>
							<Close onClick={this.hideCreateComment} />
						</div>
					)}
				</div>
				<div className="postCommentList">
					<ul>
						{comments &&
							comments.map(comment => (
								<li key={comment.id}>
									{comment.editing ? (
										<CommentEdit
											postId={post.id}
											comment={comment}
											modifyCommentVoteScore={modifyCommentVoteScore}
											saveComment={saveComment}
										/>
									) : (
										<Comment
											postId={post.id}
											comment={comment}
											modifyCommentVoteScore={modifyCommentVoteScore}
											editComment={editComment}
											deleteComment={deleteComment}
										/>
									)}
								</li>
							))}
					</ul>
				</div>
			</div>
		) : null
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getComments: postId => {
			dispatch(getCommentsAsync(postId))
		},
		deleteComment: (postId, commentId) =>
			dispatch(deleteCommentAsync(postId, commentId)),
		editComment: (postId, commentId) =>
			dispatch(editComment(postId, commentId)),
		saveComment: (postId, commentId, body) =>
			dispatch(saveCommentAsync(postId, commentId, body)),
		addComment: (postId, body, author) =>
			dispatch(addCommentAsync(postId, body, author)),
		modifyPostVoteScore: (postId, modification) =>
			dispatch(modifyPostVoteScoreAsync(postId, modification)),
		modifyCommentVoteScore: (postId, commentId, modification) =>
			dispatch(modifyCommentVoteScoreAsync(postId, commentId, modification)),
	}
}
function mapStateToProps(state, props) {
	const { postId } = props.match.params
	return {
		post: state.messageBoard.posts.find(post => post.id === postId),
		comments: state.messageBoard.comments[postId],
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
