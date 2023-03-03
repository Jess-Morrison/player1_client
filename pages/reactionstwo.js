import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import ReactionCard from '../components/cards/ReactionCard';
import ReactionCardOne from '../components/cards/ReactionCard';
import { getReactions } from '../utils/data/reactionData';

export default function ReactionViewsTwo() {
  const [reactions, setReactions] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  // console.warn(reactions);

  useEffect(() => {
    getReactions(id).then(setReactions);
  }, [id]);

  return (
    // {reactions.map((reaction) => (
    <div className="create-form" style={{ height: '45rem', padding: '10%' }}>
      {reactions.map((reaction) => (
        <ReactionCardOne key={reaction.id} image_url={reaction.image_url} reactionObj={reactions} />
      ))}
    </div>
    // ))}
  );
}
// ReactionViews.propTypes = {
//   comment: PropTypes.number,
// };

// ReactionViews.defaultProps = {
//   comment: 0,
// };
