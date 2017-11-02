import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const CategoryList = props => {
	return (
		<ul>
			<li>
				<Link to="/">{props.allCategoryName}</Link>
			</li>
			{props.categories &&
				props.categories.map(category => {
					return (
						<li key={category.path}>
							<Link to={`/categories/${category.name}`}>{category.name}</Link>
						</li>
					)
				})}
		</ul>
	)
}

function mapStateToProps(state) {
	return { categories: state.messageBoard.categories }
}

export default connect(mapStateToProps)(CategoryList)
