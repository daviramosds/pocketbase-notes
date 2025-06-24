import { useEffect, useState } from 'react';
import Header from '../components/ Header';
import type { UsersResponse } from '../pb_types';
import { pb } from '../utils/pocketbase';

function Home() {
  const [user, setUser] = useState<UsersResponse | null>(null);

  useEffect(() => {
    if (pb.authStore.isValid && pb.authStore.record) {
      setUser(pb.authStore.record as UsersResponse);
      console.log(pb.authStore.record);
    }
  }, []);

  if (!pb.authStore.isValid || !user) {
    return (<></>)
  }

  const avatarUrl = user.avatar ? pb.files.getURL(user, user.avatar) : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">

      <Header />

      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
      {
        avatarUrl && (
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border mb-4 object-cover"
          />
        )
      }
      <p className="text-lg text-gray-700">Email: {user.email}</p>
      <p className="text-lg text-gray-700">User ID: {user.id}</p>
    </div >
  );
}

export default Home;
