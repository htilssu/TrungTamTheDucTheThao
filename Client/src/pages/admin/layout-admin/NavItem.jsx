const NavItem = ({ icon: Icon, label, onClick, isSubItem = false }) => (
  <div 
    role="button"
    tabIndex="0"
    className={`hover:bg-gradient-to-r from-blue-600 to-blue-800 hover:text-white hover:shadow-lg rounded-lg px-4 py-3 transition-all duration-300 ease-in-out cursor-pointer flex items-center ${isSubItem ? 'pl-8 bg-gray-900 border-l-4 border-blue-500' : ''}`}
    onClick={onClick}
    onKeyPress={(event) => {
      if (event.key === 'Enter' || event.key === ' ') onClick();
    }}
  >
    <Icon className="mr-4 text-gray-400" />
    <span className={`${isSubItem ? 'font-light text-sm text-gray-300' : 'font-semibold text-lg text-gray-100'}`}>{label}</span>
  </div>
);

export default NavItem;
