import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import UserCard from '../../components/cards/UserCard';
import { getUsers } from '../../utils/data/userData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [playerOneUsers, setplayerOneUsers] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    getUsers(user.uid).then((setplayerOneUsers));
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          router.push('/users');
        }}
      >
        Users
      </Button>
      <article className="users">
        <h1>Users</h1>
        {playerOneUsers.map((playerOneUser) => (
          <section key={`user--${playerOneUser.id}`} className="user">
            <UserCard
              id={playerOneUser.id}
              firstName={playerOneUser.first_name}
              lastName={playerOneUser.last_name}
              imageUrl={playerOneUser.image_url}
              onUpdate={getUsers}
            />
          </section>
        ))}
      </article>
    </>
  );
}

export default Home;
