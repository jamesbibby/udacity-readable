import React, { Component } from 'react'
import Check from 'react-icons/lib/fa/check'

class Comment extends Component {
	constructor(props) {
		super(props)
		this.state = {
			body: '',
			author: '',
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleSubmit(event) {
		const { addComment, postId, comment } = this.props
		addComment(postId, this.state.body, this.state.author)
	}

	render() {
		return (
			<div className="commentBlock">
				<label>
					Author:
					<input
						type="text"
						name="author"
						value={this.state.author}
						onChange={this.handleChange}
					/>
				</label>
				<label>
					Body:
					<input
						type="text"
						name="body"
						value={this.state.body}
						onChange={this.handleChange}
					/>
				</label>
				<Check onClick={() => this.handleSubmit()} />
			</div>
		)
	}
}

export default Comment
