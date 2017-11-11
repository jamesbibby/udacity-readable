import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import VoteScore from './VoteScore'
import CommentList from './CommentList'
import PostForm from './PostForm'
import {
	deletePostAsync,
	modifyPostVoteScoreAsync,
	updatePostAsync,
} from '../actions'
import { withRouter } from 'react-router'
import Pencil from 'react-icons/lib/fa/pencil'
import Trash from 'react-icons/lib/fa/trash'

class Post extends Component {
	constructor(props) {
		super(props)
		this.state = {
			editing: false,
		}
	}
	render() {
		const {
			post,
			categories,
			deletePost,
			modifyPostVoteScore,
			updatePost,
		} = this.props
		if (!post) return <p>Post could not be loaded</p>
		return this.state.editing ? (
			<div className="postDetail">
				<div className="postHeader">
					<div>Edit Post:</div>
				</div>
				<PostForm
					post={post}
					categories={categories}
					cancel={() => this.setState({ editing: false })}
					submitLabel="Save"
					updatePost={updatePost}
				/>
			</div>
		) : (
			<div className="postDetail">
				<div className="postHeader">
					<div>Post:</div>
					<div>
						<Pencil onClick={() => this.setState({ editing: true })} />
						<Trash
							onClick={() => {
								deletePost(post.id)
								this.props.history.push('/')
							}}
						/>
					</div>
				</div>
				<div className="postView">
					<div
						className="postDetailVoteScore"
						style={{ valign: 'middle', padding: '10px' }}
					>
						<VoteScore
							className="voteCol"
							entityId={post.id}
							voteScore={post.voteScore}
							modifyVoteScore={modifyPostVoteScore}
						/>
						<div
							className="mainPost"
							style={{
								display: 'flex',
								flexDirection: 'column',
								flex: '1',
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<div className="postTitle">{post.title}</div>
								<div className="authorBlock ">
									submitted by ({post.author}) at{' '}
									{new Date(post.timestamp).toLocaleString()}
								</div>
							</div>
							<div className="postBody">{post.body}</div>
						</div>
					</div>
				</div>
				<CommentList post={post} />
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		modifyPostVoteScore: (postId, modification) =>
			dispatch(modifyPostVoteScoreAsync(postId, modification)),
		deletePost: postId => dispatch(deletePostAsync(postId)),
		updatePost: (postId, title, body) =>
			dispatch(updatePostAsync(postId, title, body)),
	}
}
function mapStateToProps(state, props) {
	const { postId } = props.match.params
	return {
		post: state.messageBoard.posts.find(post => post.id === postId),
		categories: state.messageBoard.categories,
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))
