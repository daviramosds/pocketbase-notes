import { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import type { UsersResponse } from '../pb_types';
import { pb } from '../utils/pocketbase';

function Header() {
  const [user, setUser] = useState<UsersResponse | null>(null);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    pb.authStore.clear()
    navigate('/login')
  }

  return (

    <header className='bg-white w-full h-16 absolute top-0 flex items-center justify-between p-4'>

      <div>item</div>

      <div className='flex gap-2'>

        <Link to={'/profile'}>
          <img
            src={avatarUrl || 'https://via.placeholder.com/40/aaa'} // Added a simple placeholder color
            alt="Profile Avatar"
            className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer object-cover"
          />

        </Link>

        <button
          onClick={handleLogout}
          className="p-2 cursor-pointer"
          title="Sair"
        >
          <FiLogOut className="text-xl hover:text-blue-600" />
        </button>
      </div>


    </header>

  );
}

export default Header;
