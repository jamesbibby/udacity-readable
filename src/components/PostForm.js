import React, { Component } from 'react'
import Close from 'react-icons/lib/fa/close'
import './PostList.css'

class PostForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: props.post ? props.post.title : '',
			author: '',
			body: props.post ? props.post.body : '',
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
		if (this.props.newPost && !this.state.author) {
			errors.push('Please enter author')
		}
		if (!this.state.body) {
			errors.push('Please enter body')
		}
		if (this.props.newPost && !this.state.category) {
			errors.push('Please choose a category')
		}
		this.setState({ errors: errors })
		if (errors.length === 0) {
			this.props.newPost
				? this.props.addPost(
						this.state.title,
						this.state.author,
						this.state.body,
						this.state.category
					)
				: this.props.updatePost(
						this.props.post.id,
						this.state.title,
						this.state.body
					)
			this.props.cancel()
		}
	}

	render() {
		return (
			<div className="postForm">
				<div
					style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
				>
					<div>
						{this.state.errors && (
							<ul style={{ WebkitMarginBefore: '0px', color: 'red' }}>
								{this.state.errors.map((error, ix) => (
									<li key={`error_${ix}`}>{error}</li>
								))}
							</ul>
						)}
					</div>

					<div style={{ width: '95%', margin: '0 auto' }}>
						<ul className="flex-outer">
							<li>
								<label htmlFor="title">Title:</label>
								<input
									type="text"
									name="title"
									onChange={this.handleChange}
									value={this.state.title}
									style={{ align: 'right%' }}
								/>
							</li>
							{this.props.newPost && (
								<li>
									<label htmlFor="author">Author:</label>
									<input
										type="text"
										name="author"
										onChange={this.handleChange}
										value={this.state.author}
									/>
								</li>
							)}
							<li>
								<label htmlFor="body">Body:</label>
								<textarea
									type="text"
									name="body"
									onChange={this.handleChange}
									value={this.state.body}
								/>
							</li>
							{this.props.newPost && (
								<li>
									<label htmlFor="catgeory">Category:</label>
									<select
										name="category"
										onChange={this.handleChange}
										value={this.state.category}
									>
										<option value="">--Select-</option>
										{this.props.categories.map(category => (
											<option key={category.path} value={category.path}>
												{category.name}
											</option>
										))}
									</select>
								</li>
							)}
							<li className="flex-submit">
								<button onClick={this.handleSubmit}>
									{this.props.submitLabel}
								</button>
							</li>
						</ul>
					</div>
				</div>
				<span className="flash-icon-close">
					<Close className="icon" onClick={this.props.cancel} />
				</span>
			</div>
		)
	}
}

export default PostForm
