import { useEffect, useState } from 'react';
import { pb } from '../utils/pocketbase';

function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (pb.authStore.isValid && pb.authStore.model) {
      setUser(pb.authStore.model);
    }
  }, []);

  if (!pb.authStore.isValid || !user) {
    return <p className="text-center text-red-500">You are not logged in.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
      <p className="text-lg text-gray-700">Email: {user.email}</p>
      <p className="text-lg text-gray-700">User ID: {user.id}</p>
    </div>
  );
}

export default Home;
