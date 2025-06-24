import { useEffect, useState } from 'react';
import Header from '../components/ Header';
import Sidebar from '../components/Sidebar';
import type { UsersResponse } from '../pb_types';
import { pb } from '../utils/pocketbase';

function Home() {
  const [user, setUser] = useState<UsersResponse | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarWidth = 300;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
    <div className="flex flex-col justify-center min-h-screen bg-gray-100">
      <Header toggleSidebar={toggleSidebar} avatarUrl={avatarUrl} isSidebarOpen={isSidebarOpen} />
      <div className='flex items-center'>
        <div
          className={`h-screen fixed top-0 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ width: `${sidebarWidth}px` }}
        >
          <Sidebar />
        </div>

        <main className='flex items-center justify-center flex-col w-full'>
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
        </main>


      </div>



    </div >
  );
}

export default Home;
