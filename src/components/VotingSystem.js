import React, { useState, useEffect } from 'react';
import './VotingSystem.css';

const VotingSystem = ({ socket, roomId }) => {
  const [votes, setVotes] = useState({ apply: 0, reject: 0 });
  const [hasVoted, setHasVoted] = useState(false);
  const [votingActive, setVotingActive] = useState(false);

  useEffect(() => {
    socket.on('vote_update', (updatedVotes) => {
      setVotes(updatedVotes);
    });

    socket.on('voting_status', (status) => {
      setVotingActive(status);
      if (!status) {
        setHasVoted(false);
      }
    });

    return () => {
      socket.off('vote_update');
      socket.off('voting_status');
    };
  }, [socket]);

  const handleVote = (option) => {
    if (!hasVoted && votingActive) {
      socket.emit('submit_vote', { roomId, vote: option });
      setHasVoted(true);
    }
  };

  const startVoting = () => {
    socket.emit('start_voting', { roomId });
  };

  const endVoting = () => {
    socket.emit('end_voting', { roomId });
  };

  return (
    <div className="voting-system">
      <h3>Voting System</h3>
      {votingActive ? (
        <div className="voting-options">
          <button onClick={() => handleVote('apply')} disabled={hasVoted}>
            Apply Changes ({votes.apply})
          </button>
          <button onClick={() => handleVote('reject')} disabled={hasVoted}>
            Reject Changes ({votes.reject})
          </button>
          <button onClick={endVoting}>End Voting</button>
        </div>
      ) : (
        <button onClick={startVoting}>Start Voting</button>
      )}
      {hasVoted && <p>You have already voted.</p>}
    </div>
  );
};

export default VotingSystem;
