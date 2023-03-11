/* eslint-disable no-lone-blocks */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { updateComment, createComment } from '../../utils/data/commentData';
import { useAuth } from '../../utils/context/authContext';
import { getVideoGames } from '../../utils/data/videoGameData';
// import { getUsers } from '../../utils/data/userData';

const initialState = {
  id: 0,
  game: '',
  comment_title: '',
  reactions: '',
  comment: '',
  date_created: '',
  user_name: '',
  // userFirebaseKey: '',
};

export default function CommentForm({ commentObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [games, setGame] = useState([]);
  const [gameId, setGameId] = useState([]);
  // const [users, setUsers] = useState([]);
  // const [userUID, setUserUID] = useState();
  const { user } = useAuth();
  const router = useRouter();
  const grabGameId = () => {
    // const commentUsers = commentId.map((comments) => comments.user);
    // setCommentUser(commentUsers);
    const gId = gameId.length > 0 ? gameId.id : null;
    // const g = games.length > 0 ? games.id : null;
    if (gId === games.id) {
      setGameId(gId);
    }
  };
  useEffect(() => {
    grabGameId();
  }, []);

  // const getAndSet = () => {
  //   if (gameObj.id) {
  //     setFormInput(gameObj);
  //   }
  // };

  console.warn(games);

  useEffect(() => {
    // if (gameObj?.id)setFormInput(gameObj);
    if (commentObj?.id) {
      setFormInput({
        id: commentObj.id,
        game: commentObj.game,
        comment_title: commentObj.comment_title,
        reactions: commentObj.reactions,
        comment: commentObj.comment,
        date_created: commentObj.date_created,
        user: commentObj.user,
      });
    }
  }, [commentObj, user]);
  // console.warn(gameObj);

  useEffect(() => {
    getVideoGames().then(setGame);
  }, []);

  // useEffect((id) => {
  //   getUsers(id).then(setUsers);
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentObj?.id) {
      updateComment(formInput).then(() => {
        setFormInput(initialState); router.push('/allGamesFilter');
        // setFormInput(initialState); router.push(`/videoGame/${gameObj.id}`);
      });
    } else {
      // eslint-disable-next-line array-callback-return
      const payload = {
        ...formInput, gameId: gameId.id, userId: user.id, date_created: new Date().toLocaleString({ timeZone: 'UTC' }),
      };
      createComment(payload).then(() => router.push('/allGamesFilter'));
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      {/* <h2 style={{ color: '#84190B', font: 'bold', 'font-size': '5rem' }} className="mt-5">Comment</h2> */}
      <h2
        style={{
          color: '#9C1A7A', font: 'bold', 'font-size': '5rem', 'font-family': 'Rubik Iso',
        }}
        className="mt-5"
      >{commentObj?.id ? 'Update' : 'Create'} Comment
      </h2>
      <FloatingLabel controlId="floatingInput1" label="Comment Title" className="mb-5">
        <Form.Control style={{ padding: '4rem' }} type="text" placeholder="Enter Comment Title" name="comment_title" value={formInput.comment_title} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="comment" className="mb-5">
        <Form.Control style={{ padding: '4rem' }} type="text" placeholder="Enter your comment here" name="comment" value={formInput.comment} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect">
        <Form.Select aria-label="game" type="text" name="game" onChange={handleChange} className="mb-3" value={formInput.game.id} required>
          <option value="">Select a Game</option>
          {games.map((mapGame) => (
            <option key={mapGame.id} value={mapGame.id}>
              {mapGame.game_title}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      {/* <Button type="submit">Submit</Button> */}
      <Button type="submit" style={{ backgroundColor: '#9C1A7A' }}>{commentObj?.id ? 'Update' : 'Create'} Comment</Button>
    </Form>
  );
}

CommentForm.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    // game_genre: PropTypes.number,
    game: PropTypes.shape({
      id: PropTypes.number,
    }),
    comment_title: PropTypes.string,
    reactions: PropTypes.string,
    date_created: PropTypes.string,
    comment: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      about_me: PropTypes.string,
      image_url: PropTypes.string,
      tag_line: PropTypes.string,
      user_name: PropTypes.string,
      bio: PropTypes.string,
      uid: PropTypes.string,
    }),
  }).isRequired,
  // .isRequired,
};

// VideoGameForm.defaultProps = {
//   gameObj: initialState,
// };
