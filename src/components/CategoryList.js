import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import './CategoryList.css'

const CategoryList = props => {
	return (
		<div className="tab">
			<button
				className={`tablinks ${!props.match.params.categoryId ? 'active' : ''}`}
				onClick={() => props.history.push('/')}
			>
				All
			</button>
			{props.categories &&
				props.categories.map(category => {
					return (
						<button
							key={category.path}
							className={`tablinks ${props.match.params.categoryId ===
							category.path
								? 'active'
								: ''}`}
							onClick={() => props.history.push(`/categories/${category.path}`)}
						>
							{category.name}
						</button>
					)
				})}
		</div>
	)
}

function mapStateToProps(state) {
	return { categories: state.messageBoard.categories }
}

export default withRouter(connect(mapStateToProps)(CategoryList))
