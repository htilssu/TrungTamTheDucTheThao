import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { navItems } from './navConfig';
import NavItem from './NavItem';

export default function SideBarAdmin() {
  const navigate = useNavigate();
  const [openSubItems, setOpenSubItems] = useState({}); 

  const toggleSubItems = (label) => {
    setOpenSubItems((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-300 shadow-2xl" aria-label="Admin Sidebar Navigation">
      <div className="p-6 text-4xl font-extrabold text-gray-100 border-b border-gray-700 tracking-wide">
        Admin Panel
      </div>
      <div className="mt-6 space-y-4 px-4">
        {navItems.map((item) => (
          <div key={item.label}>
            {item.subItems ? (
              <>
                <button 
                  aria-expanded={openSubItems[item.label]} 
                  onClick={() => toggleSubItems(item.label)}
                  className="flex justify-between items-center w-full text-left focus:outline-none"
                >
                  <NavItem icon={item.icon} label={item.label} />
                  {openSubItems[item.label] ? (
                    <ExpandLess className="text-gray-400" />
                  ) : (
                    <ExpandMore className="text-gray-400" />
                  )}
                </button>
                {openSubItems[item.label] &&
                  item.subItems.map((subItem) => (
                    <NavItem
                      key={subItem.label} 
                      icon={subItem.icon}
                      label={subItem.label}
                      onClick={() => navigate(subItem.path)}
                      isSubItem
                    />
                  ))}
              </>
            ) : (
              <NavItem
                icon={item.icon}
                label={item.label}
                onClick={() => navigate(item.path)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
