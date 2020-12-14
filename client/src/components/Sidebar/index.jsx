import React, { useContext } from 'react';
import { Context } from '../../context';
import './Sidebar.scss';
import { NavLink} from 'react-router-dom';
import Logo from '../../assets/img/maze_2.png';

const Sidebar = ({ setTitle, dir, setHeader }) => {
    let {sidebar} = useContext(Context);

    return (
        <div className="music__sidebar">
            
            <div className="music__sidebar-logo">
                <img src={Logo} alt="Logo"/>
                <h2>MAZE MUSIC</h2>
            </div>
                {/* <h4 className="music__sidebar-title">Library</h4> */}
                
            <ul>
                {sidebar && sidebar.map(item => {
                    return (
                        <li 
                            key={item.id} 
                            onClick={() => {
                                setTitle(item.name)
                                setHeader(false);
                            }} 
                            className={item.name === dir ? "active" : ""}>
                            
                            <NavLink to={item.name}>
                                <i className={`fas fa-${item.icon}`}></i>
                                <span>{item.name}</span>
                            </NavLink>
                        </li>);
                })}   
            </ul>
            

      
            {/* {data.footer.map(item => {
                return (
                    <div className="music__sidebar-footer" key={item}>
                        <h5>Current version {item.v}</h5>
                        <span>Update {item.update}</span>
                    </div>
                );
            })}   */}
        </div>
    );
}

export default Sidebar;