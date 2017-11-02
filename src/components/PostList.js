import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const PostList = props => {
	return (
		<ul>
			{props.posts &&
				props.posts.map(post => {
					return (
						<li key={post.id}>
							<Link to={`/posts/${post.id}`}>{post.title}</Link>
						</li>
					)
				})}
		</ul>
	)
}

function mapStateToProps(state) {
	return {
		posts: state.messageBoard.posts,
	}
}

export default connect(mapStateToProps)(PostList)
