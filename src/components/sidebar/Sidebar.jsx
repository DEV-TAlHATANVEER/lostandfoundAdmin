import { Link } from "react-router-dom";
import { Icons } from "../../assets/icons";
import { SidebarWrap } from "./Sidebar.styles";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarClose } from "../../redux/slices/sidebarSlice";
import { logout } from "../../redux/actions/authActions";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('authenticated'); // Clear authentication status
    navigate('/login'); // Redirect to the login page
  };



  return (
    <SidebarWrap className={`${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <span className="brand-logo">
            <img src={Icons.LogoWhite} alt="site brand logo" />
          </span>
          <span className="brand-text">Item'sync </span>
        </div>
        <button
          className="sidebar-close-btn"
          onClick={() => dispatch(setSidebarClose())}
        >
          <MdOutlineClose size={9} />
          
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className="menu-link active">
                <span className="menu-link-icon">
                  <img src={Icons.Chart} alt="" />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
        

           
            <li className="menu-item">
        <span className="menu-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <span className="menu-link-icon">
            <img src={Icons.SignOut} alt="" />
          </span>
          <span className="menu-link-text">Sign Out</span>
        </span>
      </li>
          </ul>
        </div>
      </div>
    </SidebarWrap>
  );
};

export default Sidebar;
