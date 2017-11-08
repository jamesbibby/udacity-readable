import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import VoteScore from './VoteScore'
import CommentList from './CommentList'
import { modifyPostVoteScoreAsync } from '../actions'

class Post extends Component {
	render() {
		const { post, modifyPostVoteScore } = this.props

		return post ? (
			<div className="postDetail">
				<div>Post:</div>
				<div className="postDetailVoteScore" style={{ valign: 'middle' }}>
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
							<div className="postListTitle">{post.title}</div>
							<div
								className="postListAuthor"
								style={{ color: 'grey', fontSize: 'small' }}
							>
								submitted by ({post.author}) at
								{new Date(post.timestamp).toLocaleString()}
							</div>
						</div>
						<div className="postListBody">{post.body}</div>
					</div>
				</div>
				<CommentList post={post} />
			</div>
		) : null
	}
}

function mapDispatchToProps(dispatch) {
	return {
		modifyPostVoteScore: (postId, modification) =>
			dispatch(modifyPostVoteScoreAsync(postId, modification)),
	}
}
function mapStateToProps(state, props) {
	const { postId } = props.match.params
	return {
		post: state.messageBoard.posts.find(post => post.id === postId),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
