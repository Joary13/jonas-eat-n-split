import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

function App() {
  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList />
        <AddFriendsForm />
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;
  return (
    <>
      <ul>
        {friends.map((friend) => (
          <Friend key={friend.id} friend={friend} />
        ))}
      </ul>
    </>
  );
}

function Friend({ friend }) {
  console.log(friend);
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className='red'>
          you owe {friend.name} {Math.abs(friend.balance)} $
        </p>
      )}
      {friend.balance > 0 && (
        <p className='green'>
          {friend.name} owes you {Math.abs(friend.balance)} ${' '}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button>Select</Button>
    </li>
  );
}

function Button({ children, changeBtnState }) {
  return (
    <button className='button' onClick={changeBtnState}>
      {children}
    </button>
  );
}

function AddFriendsForm() {
  const [isOpen, setIsOpen] = useState(false);

  function handdleToggleBtn() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      {!isOpen && <Button changeBtnState={handdleToggleBtn}>Add friend</Button>}
      {isOpen && (
        <>
          <form className='form-add-friend'>
            <label>🧑‍🤝‍🧑 Friend name</label>
            <input type='text' />
            <label>🖼️ Image URL</label>
            <input type='text' />

            <Button>Add</Button>
          </form>
          <Button changeBtnState={handdleToggleBtn}>close</Button>
        </>
      )}
    </>
  );
}

function InfoInput({ type, children, disabled }) {
  return <></>;
}

function FormSplitBill() {
  return (
    <form className='form-split-bill'>
      <h2>SPLIT A BILL WITH X</h2>
      <label>💰 Bill Value</label>
      <input type='text' />
      <label>🙎‍♂️ Your expense</label>
      <input type='text' />
      <label>🧑‍🤝‍🧑 Clark's expense</label>
      <input type='text' disabled />
      <label>💷 who's paying the bill</label>
      <select>
        <option value='user'>You</option>
        <option value='friend'>Friend</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
export default App;
