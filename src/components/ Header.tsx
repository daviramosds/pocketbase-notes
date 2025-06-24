// src/components/Header.tsx
import { FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { pb } from '../utils/pocketbase';
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';

interface IHeaderProps {
  avatarUrl: string | null;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

function Header({ avatarUrl, toggleSidebar, isSidebarOpen }: IHeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    pb.authStore.clear();
    navigate('/login');
  };

  return (
    <header className='w-full h-16 flex items-center justify-between px-4 py-12 z-30 absolute top-0'>
      <button
        onClick={toggleSidebar}
        className="cursor-pointer text-gray-700 hover:text-blue-500 bg-white rounded h-16 w-16 flex items-center justify-center"
        title="Abrir/Fechar Navegação"
      >
        {isSidebarOpen ? (
          <FaAngleDoubleLeft className="text-2xl" />
        ) : (
          <FaAngleDoubleRight className="h-16 px-" />
        )}
      </button>

      <div className='flex gap-3 items-center bg-white rounded h-16 px-4'>
        <Link to={'/profile'}>
          <img
            src={avatarUrl || 'https://via.placeholder.com/40/aaa'}
            alt="Profile Avatar"
            className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer object-cover"
          />
        </Link>

        <button
          onClick={handleLogout}
          className="p-2 cursor-pointer text-gray-700 hover:text-blue-600"
          title="Sair"
        >
          <FiLogOut className="text-xl" />
        </button>
      </div>
    </header>
  );
}

export default Header;