import React from 'react'
import Up from 'react-icons/lib/fa/caret-up'
import Down from 'react-icons/lib/fa/caret-down'

const VoteScore = props => {
	const { modifyVoteScore, entityId, voteScore, className } = props
	return (
		<div className={className}>
			<div className="voteIcon">
				<Up
					className="icon"
					onClick={() => modifyVoteScore(entityId, 'upVote')}
				/>
			</div>
			<div className="voteScore">{voteScore < 0 ? 0 : voteScore}</div>
			<div className="voteIcon">
				<Down
					className="icon"
					onClick={() => voteScore > 0 && modifyVoteScore(entityId, 'downVote')}
				/>
			</div>
		</div>
	)
}

export default VoteScore
