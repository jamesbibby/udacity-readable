import React from 'react'
import Plus from 'react-icons/lib/fa/plus'
import Minus from 'react-icons/lib/fa/minus'

const VoteScore = props => {
	const { modifyVoteScore, entityId, voteScore, className } = props
	return (
		<div className={className}>
			<div className="voteIcon">
				<Plus
					className="icon"
					onClick={() => modifyVoteScore(entityId, 'upVote')}
				/>
			</div>
			<div className="voteScore">{voteScore < 0 ? 0 : voteScore}</div>
			<div className="voteIcon">
				<Minus
					className="icon"
					onClick={() => voteScore > 0 && modifyVoteScore(entityId, 'downVote')}
				/>
			</div>
		</div>
	)
}

export default VoteScore
