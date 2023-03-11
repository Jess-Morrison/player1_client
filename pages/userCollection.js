import React from 'react';
import UserBtnFilter from '../components/filters/userBtnFilter';
// import CollectionBar from '../components/collectionBar';

export default function UserCollection() {
  return (
    // eslint-disable-next-line react/jsx-no-duplicate-props
    <div className="text-center my-4">
      <h1 className="collection" style={{ fontSize: '5rem' }}> My Collection </h1>
      {/* <div style={{ margin: '5rem' }}>
        <CollectionBar />
      </div> */}

      {/* Filter and rendering for user  */}
      <UserBtnFilter />

    </div>
  );
}
