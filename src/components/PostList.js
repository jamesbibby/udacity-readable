import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { modifyPostVoteScoreAsync, addPostAsync } from '../actions'
import VoteScore from './VoteScore'
import Plus from 'react-icons/lib/fa/plus'
import NewPostForm from './NewPostForm'
import SortList from './SortList'
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
		this.reSort = this.reSort.bind(this)
		this.filteredPosts = this.filteredPosts.bind(this)
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

	filteredPosts() {
		if (this.props.match.params.categoryId) {
			return this.props.posts.filter(
				post => post.category === this.props.match.params.categoryId
			)
		}
		return this.props.posts
	}

	render() {
		const { posts, modifyPostVoteScore, addPost } = this.props
		return (
			<div className="postList">
				<div className="postListToolbar">
					<div className="postListNewPost">
						<Plus className="icon" onClick={this.showNewPost} />Create New Post
						{this.state.showNewPost && (
							<NewPostForm hideNewPost={this.hideNewPost} addPost={addPost} />
						)}
					</div>
				</div>
				<div className="postListMain">
					<SortList sortOrder={this.state.sortOrder} reSort={this.reSort} />
					<div className="mainPostList">
						{posts &&
							this.filteredPosts()
								.sort(
									(a, b) => b[this.state.sortOrder] - a[this.state.sortOrder]
								)
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
