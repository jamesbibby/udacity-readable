import React, { Component } from 'react'
import Check from 'react-icons/lib/fa/check'

class Comment extends Component {
	constructor(props) {
		super(props)
		this.state = {
			body: props.comment.body,
		}
		this.handleBodyChange = this.handleBodyChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleBodyChange(event) {
		this.setState({ body: event.target.value })
	}

	handleSubmit(event) {
		const { saveComment, postId, comment } = this.props
		saveComment(postId, comment.id, this.state.body)
	}

	render() {
		return (
			<div className="commentBlock">
				<label>
					Body:
					<input
						type="text"
						value={this.state.body}
						onChange={this.handleBodyChange}
					/>
				</label>
				<Check onClick={() => this.handleSubmit()} />
			</div>
		)
	}
}

export default Comment
