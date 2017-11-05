import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { modifyPostVoteScoreAsync, addPostAsync } from '../actions'
import VoteScore from './VoteScore'
import Plus from 'react-icons/lib/fa/plus'
import NewPostForm from './NewPostForm'
import './PostList.css'

class PostList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sortOrder: 'voteScore',
			showNewPost: false,
		}
		this.showNewPost = this.showNewPost.bind(this)
		this.hideNewPost = this.hideNewPost.bind(this)
	}

	reSort(sortField) {
		this.setState({ sortOrder: sortField })
	}

	showNewPost() {
		this.setState({ showNewPost: true })
	}

	hideNewPost() {
		this.setState({ showNewPost: false })
	}

	render() {
		const { posts, modifyPostVoteScore, addPost } = this.props
		return (
			<div className="postList">
				<div className="postListToolbar">
					<div className="postListNewPost">
						<Plus onClick={this.showNewPost} />Create New Post
						{this.state.showNewPost && (
							<NewPostForm hideNewPost={this.hideNewPost} addPost={addPost} />
						)}
					</div>
				</div>
				<div className="postListMain">
					<div className="sortList">
						<div>Order by:</div>
						<div>
							<button
								className={
									this.state.sortOrder === 'voteScore' && 'currentSort'
								}
								onClick={() => this.reSort('voteScore')}
							>
								Votes
							</button>
						</div>
						<div>
							<button
								className={
									this.state.sortOrder === 'timestamp' && 'currentSort'
								}
								onClick={() => this.reSort('timestamp')}
							>
								Recency
							</button>
						</div>
						<div>
							<button
								className={
									this.state.sortOrder === 'commentCount' && 'currentSort'
								}
								onClick={() => this.reSort('commentCount')}
							>
								Comments
							</button>
						</div>
					</div>
					{posts &&
						posts
							.sort((a, b) => b[this.state.sortOrder] - a[this.state.sortOrder])
							.map((post, ix) => {
								return (
									<div key={post.id} className="postListEntry">
										<span className="rank">{ix + 1}</span>
										<VoteScore
											className="voteCol"
											entityId={post.id}
											voteScore={post.voteScore}
											modifyVoteScore={modifyPostVoteScore}
										/>
										<div className="mainPost">
											<div className="postListTitle">
												<Link to={`/posts/${post.id}`}>{post.title}</Link>
											</div>
											<div className="postListBody">{post.body}</div>
											<div className="postListAuthor">
												submitted by ({post.author}) at{' '}
												{new Date(post.timestamp).toLocaleString()}
											</div>
											<div className="postListComments">
												{post.commentCount} comments
											</div>
										</div>
									</div>
								)
							})}
				</div>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		modifyPostVoteScore: (postId, modification) =>
			dispatch(modifyPostVoteScoreAsync(postId, modification)),
		addPost: (title, author, body, category) =>
			dispatch(addPostAsync(title, author, body, category)),
	}
}

function mapStateToProps(state) {
	return {
		posts: state.messageBoard.posts,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
