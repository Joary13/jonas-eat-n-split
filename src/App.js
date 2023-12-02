import { useState } from 'react';

let initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
    select: false,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
    select: false,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
    select: false,
  },
];

//  randomImage = https://i.pravatar.cc/300

function App() {
  const [isNewFriendForm, setNewFriendForm] = useState(false);
  const [friendsList, setFriendsList] = useState(initialFriends);
  const [selectFriend, setSelectFriend] = useState(null);

  function onClick() {
    setNewFriendForm((status) => !status);
  }

  function handdleAddFriend(obj) {
    setFriendsList((friends) => [...friends, obj]);
    setNewFriendForm(false);
  }

  function handdleFriendSelection(obj) {
    selectFriend?.id === obj.id ? setSelectFriend(null) : setSelectFriend(obj);
    setNewFriendForm(false);
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList
          friendsList={friendsList}
          onSelectFriend={handdleFriendSelection}
          selectFriend={selectFriend}
        />
        {isNewFriendForm && (
          <AddFriendsForm onClick={onClick} onAddFriend={handdleAddFriend} />
        )}
        <Button onClick={onClick}>
          {isNewFriendForm ? 'Close' : 'Add friend'}
        </Button>
      </div>
      {selectFriend && <FormSplitBill selectFriend={selectFriend} />}
    </div>
  );
}

// onSelectFriend;
function FriendsList({
  friendsList,
  onSelectFriend,
  selectFriend,
  onCloseAddForm,
}) {
  const friends = [...friendsList];

  return (
    <>
      <ul>
        {friends.map((friend) => (
          <Friend
            key={friend.id}
            friend={friend}
            selectFriend={selectFriend}
            onSelectFriend={onSelectFriend}
          />
        ))}
      </ul>
    </>
  );
}

function Friend({ friend, onSelectFriend, selectFriend }) {
  return (
    <>
      <li className={selectFriend?.id === friend.id ? 'selected' : null}>
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
        <Button onClick={() => onSelectFriend(friend)}>
          {selectFriend?.id === friend.id ? 'close' : 'select'}
        </Button>
      </li>
    </>
  );
}

function Button({ children, onClick }) {
  return (
    <button className='button' onClick={onClick}>
      {children}
    </button>
  );
}

function AddFriendsForm({ onClick, onAddFriend }) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('https://i.pravatar.cc/300');

  function handdleData(e) {
    e.preventDefault();
    if (!name || !url) return;

    onAddFriend({
      id: crypto.randomUUID(),
      name: name,
      image: url,
      balance: 0,
      select: false,
    });
    setName('');
    setUrl('https://i.pravatar.cc/300');
  }

  return (
    <form className='form-add-friend' onSubmit={handdleData}>
      <label>🧑‍🤝‍🧑 Friend name</label>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🖼️ Image URL</label>
      <input type='text' value={url} onChange={(e) => setUrl(e.target.value)} />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectFriend }) {
  return (
    <form className='form-split-bill'>
      <h2>SPLIT A BILL WITH {selectFriend.name}</h2>
      <label>💰 Bill Value</label>
      <input type='text' />
      <label>🙎‍♂️ Your expense</label>
      <input type='text' />
      <label>🧑‍🤝‍🧑 {selectFriend.name}'s expense</label>
      <input type='text' disabled />
      <label>💷 who's paying the bill</label>
      <select>
        <option value='user'>You</option>
        <option value='friend'>{selectFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
export default App;
