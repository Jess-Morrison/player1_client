/* eslint-disable camelcase */
import React, { useState } from 'react';
// import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
// import { getReactions } from '../../utils/data/reactionData';
// import { getReactionById } from '../../utils/data/reactionData';

function ReactionCard({ reaction_name, image_url }) {
  const [count, setCount] = useState(0);
  // useEffect(() => {
  //   const storedCount = parseInt(localStorage.getItem('count'), 10) || 0;
  //   setCount(storedCount);
  // }, []);
  // const [reactions, setReactions] = useState([]);
  // const [singleReaction, setsingleReaction] = useState([]);

  // console.warn(singleReaction);

  // useEffect(() => {
  //   getReactions(id).then(setReactions);
  // }, [id]);
  // useEffect(() => {
  //   getReactionById(id).then(setReactions);
  // }, [id]);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  // const handleIncrement = () => {
  //   const newCount = count + 1;
  //   setCount(newCount);
  //   localStorage.setItem('count', newCount);
  // };

  // const handleDecrement = () => {
  //   const newCount = count - 1;
  //   setCount(newCount);
  //   localStorage.setItem('count', newCount);
  // };

  // const getSingleReaction = () => {
  //   const single = [];
  //   // eslint-disable-next-line array-callback-return
  //   reactions.map((reaction) => {
  //     const sr = setsingleReaction(reaction);
  //     single.push(sr);
  //   });
  //   return single;
  // };

  // console.warn(singleReaction);
  // useEffect(() => {
  //   getSingleReaction(id);
  // }, [id]);

  // eslint-disable-next-line arrow-parens
  // const reaction = reactions.find(r => r.id === id);

  return (
    <Button variant="primary" onClick={handleIncrement}>
      {/* {reactions.map((reaction) => ( */}
      <Card.Img variant="top" src={image_url} alt={reaction_name} />
      {/* ))} */}
      <Badge bg="secondary">{count}</Badge>
      {/* </>
      ))} */}
      <span className="visually-hidden">reaction emojis</span>
    </Button>
  );
}

ReactionCard.propTypes = {
  // id: PropTypes.number.isRequired,
  // comment_id: PropTypes.number.isRequired,
  reaction_name: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  // onUpdate: PropTypes.func.isRequired,
};

export default ReactionCard;

// import React, { useState } from 'react';

// const ExampleComponent = () => {
//   const [count, setCount] = useState(0);

//   const handleIncrement = () => {
//     setCount(count + 1);
//   };

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={handleIncrement}>Increment</button>
//     </div>
//   );
// };

// export default ExampleComponent;

// ReactionCard.propTypes = {
//   // reactionObj: PropTypes.shape({
//   id: PropTypes.number.isRequired,
//   // reaction_name: PropTypes.string,
//   // image_url: PropTypes.string,
//   // }).isRequired,
//   // onUpdate: PropTypes.func.isRequired,
// };
