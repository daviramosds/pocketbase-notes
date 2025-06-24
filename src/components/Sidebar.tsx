// components/Sidebar.jsx
const Sidebar = () => {
  return (
    <div className='h-full w-full z-40 flex items-center px-4'>
      <div className="h-[80vh] w-full bg-white z-40 rounded">
      <ul>
        <li className="p-4 text-gray-700 cursor-pointer">Link 1</li>
        <li className="p-4 text-gray-700 cursor-pointer">Link 2</li>
        <li className="p-4 text-gray-700 cursor-pointer">Link 3</li>
      </ul>
      </div>
    </div>
  );
};

export default Sidebar;