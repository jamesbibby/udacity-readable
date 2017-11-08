import React, { Component } from 'react'
import Close from 'react-icons/lib/fa/close'
import './PostList.css'

class NewPostForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			author: '',
			body: '',
			category: '',
			errors: [],
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleSubmit() {
		const errors = []

		if (!this.state.title) {
			errors.push('Please enter title')
		}
		if (!this.state.author) {
			errors.push('Please enter author')
		}
		if (!this.state.body) {
			errors.push('Please enter body')
		}
		if (!this.state.category) {
			errors.push('Please choose a category')
		}
		this.setState({ errors: errors })
		if (errors.length === 0) {
			this.props.addPost(
				this.state.title,
				this.state.author,
				this.state.body,
				this.state.category
			)
			this.props.hideNewPost()
		}
	}

	render() {
		const hideNewPost = this.props.hideNewPost
		return (
			<div className="newPostForm">
				<div>
					<div style={{ display: 'block' }}>
						<div>
							<label>
								Title:{' '}
								<input
									type="text"
									name="title"
									onChange={this.handleChange}
									value={this.state.title}
									style={{ align: 'right%' }}
								/>
							</label>
						</div>
					</div>
					<div>
						<label>
							Author:{' '}
							<input
								type="text"
								name="author"
								onChange={this.handleChange}
								value={this.state.author}
							/>
						</label>
					</div>
					<div>
						<label>
							Body:{' '}
							<input
								type="text"
								name="body"
								onChange={this.handleChange}
								value={this.state.body}
							/>
						</label>
					</div>
					<div>
						<label>
							Categories:{' '}
							<select
								name="category"
								onChange={this.handleChange}
								value={this.state.category}
							>
								<option value="">--Select-</option>
								<option value="Mine">My Category</option>
								<option value="Theirs">Their Category</option>
							</select>
						</label>
					</div>
					<button onClick={this.handleSubmit}>Show Me</button>
				</div>
				<div style={{ valign: 'top' }}>
					{this.state.errors && (
						<div className="errors" style={{ color: 'red' }}>
							<ul style={{ WebkitMarginBefore: '0px' }}>
								{this.state.errors.map((error, ix) => (
									<li key={`error_${ix}`}>{error}</li>
								))}
							</ul>
						</div>
					)}
				</div>
				<span className="flash-icon-close">
					<Close className="icon" onClick={hideNewPost} />
				</span>
			</div>
		)
	}
}

export default NewPostForm
