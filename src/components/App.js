import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategoriesAsync, clearError } from '../actions'
import CategoryList from './CategoryList'
import Close from 'react-icons/lib/fa/close'

class App extends Component {
	componentDidMount() {
		this.props.getCategories()
	}

	render() {
		return (
			<div className="App">
				{this.props.errorMessage && (
					<div className="errorbanner">
						{this.props.errorMessage}
						<span className="flash-icon-close">
							<Close onClick={this.props.clearError} />
						</span>
					</div>
				)}
				<CategoryList categories={this.props.categories} />
			</div>
		)
	}
}

function mapStateToProps(state) {
	return state.messageBoard
}

function mapDispatchToProps(dispatch) {
	return {
		clearError: () => dispatch(clearError()),
		getCategories: () => dispatch(getCategoriesAsync()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
