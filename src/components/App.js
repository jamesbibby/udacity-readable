import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategoriesAsync, getPostsAsync, clearError } from '../actions'
import CategoryList from './CategoryList'
import FilteredPostList from './FilteredPostList'
import Close from 'react-icons/lib/fa/close'
import Book from 'react-icons/lib/fa/book'
import PostList from './PostList'
import Post from './Post'
import Promise from 'bluebird'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends Component {
	componentDidMount() {
		Promise.join(
			[this.props.getCategories(), this.props.getPosts()],
			(categories, posts) => {}
		)
	}

	render() {
		const { clearAllErrors, errors } = this.props
		return (
			<Router>
				<div className="App">
					{errors &&
						errors.length > 0 && (
							<div
								className="errorbanner"
								style={{
									display: 'flex',
									'justify-content': 'space-between',
								}}
							>
								<div />
								<div style={{ display: 'block' }}>
									{errors.map((e, ix) => {
										console.log(e)
										return <div>{e.message}</div>
									})}
								</div>
								<span className="flash-icon-close">
									<Close onClick={clearAllErrors} />
								</span>
							</div>
						)}
					<div className="header">
						<div className="logo">
							<Link to="/">
								<Book style={{ float: 'left' }} />
								<h1>Readable</h1>
							</Link>
						</div>
						<div className="categoryMenu">
							<Route exact path="/" component={CategoryList} />
							<Route path="/categories/:categoryId" component={CategoryList} />
						</div>
					</div>
					<div>
						<Route exact path="/" component={PostList} />
						<Route
							path="/categories/:categoryId"
							component={FilteredPostList}
						/>
						<Route path="/posts/:postId" component={Post} />
					</div>
				</div>
			</Router>
		)
	}
}

function mapStateToProps(state) {
	return { ...state.messageBoard, ...state.errors }
}

function mapDispatchToProps(dispatch) {
	return {
		clearError: () => dispatch(clearError()),
		getCategories: () => dispatch(getCategoriesAsync()),
		getPosts: () => dispatch(getPostsAsync()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
