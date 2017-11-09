import React, { Component } from 'react'
import Check from 'react-icons/lib/fa/check'
import Close from 'react-icons/lib/fa/close'

class CommentForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			author: '',
			body: props.newComment ? '' : props.comment.body,
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleSubmit(event) {
		const { saveComment, addComment, postId, comment, newComment } = this.props
		if (newComment) {
			addComment(postId, this.state.body, this.state.author)
		} else {
			saveComment(postId, comment.id, this.state.body)
		}
	}

	render() {
		return (
			<div className="commentForm">
				<ul className="flex-outer">
					{this.props.newComment && (
						<li>
							<label htmlFor="author">Author: </label>
							<input
								type="text"
								name="author"
								value={this.state.author}
								onChange={this.handleChange}
							/>
						</li>
					)}
					<li>
						<label htmlFor="body" style={{ valign: 'top' }}>
							Comment:
						</label>
						<textarea
							name="body"
							value={this.state.body}
							onChange={this.handleChange}
						/>
					</li>
					<li className="flex-final">
						<p />
						<p />
						<div>
							<button
								onClick={
									this.props.newComment
										? this.props.hideCreateComment
										: this.props.cancelEditing
								}
							>
								<Close className="icon" />
								Cancel
							</button>
						</div>
						<div>
							<button onClick={this.handleSubmit}>
								<Check className="icon" />
								Save
							</button>
						</div>
					</li>
				</ul>
			</div>
		)
	}
}

export default CommentForm
