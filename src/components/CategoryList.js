import React from 'react'

const CategoryList = props => {
	return (
		<ul>
			{props.categories.map(category => {
				return <li key={category.path}>{category.name}</li>
			})}
		</ul>
	)
}

export default CategoryList
