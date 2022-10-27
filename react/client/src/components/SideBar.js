import "../App.css";


const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="logo"></div>
      <div className="sidebar-list">
      
      <button type="button">Home</button>
        <button type="button">Account</button>
       <button type="button">Rooms</button>
       <button type="button">Settings</button>
       
      </div>
      <div className="copyright">
        <p>&copy; Copyright 2022.</p>
        <p>All rights reserved.</p>
        <p>IAB330 Project</p>

      </div>
    </div>
  );
};


export default SideBar