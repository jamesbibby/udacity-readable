import React, { Component } from 'react'
import Check from 'react-icons/lib/fa/check'
import Close from 'react-icons/lib/fa/close'

class CommentForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			author: '',
			body: props.newComment ? '' : props.comment.body,
			errors: [],
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleSubmit(event) {
		const errors = []
		const { saveComment, addComment, postId, comment, newComment } = this.props
		if (newComment && !this.state.author) {
			errors.push('Please enter an author name')
		}
		if (!this.state.body) {
			errors.push('Please enter a body')
		}
		this.setState({ errors: errors })
		if (errors.length === 0) {
			if (newComment) {
				addComment(postId, this.state.body, this.state.author)
			} else {
				saveComment(postId, comment.id, this.state.body)
			}
		}
	}

	render() {
		return (
			<div className={this.props.containerClassName}>
				<div className="commentListForm">
					{this.state.errors && (
						<ul style={{ WebkitMarginBefore: '0px', color: 'red' }}>
							{this.state.errors.map((error, ix) => (
								<li key={`error_${ix}`}>{error}</li>
							))}
						</ul>
					)}
					<div style={{ flexDirection: 'row', display: 'flex', width: '100%' }}>
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
									Body:
								</label>
								<textarea
									name="body"
									value={this.state.body}
									onChange={this.handleChange}
								/>
							</li>
							<li className="flex-submit">
								<button onClick={this.handleSubmit}>
									<Check className="icon" />
									Save
								</button>
							</li>
						</ul>
					</div>
					<span className="flash-icon-close">
						<Close
							className="icon"
							onClick={
								this.props.newComment
									? this.props.hideCreateComment
									: this.props.cancelEditing
							}
						/>
					</span>
				</div>
			</div>
		)
	}
}

export default CommentForm
