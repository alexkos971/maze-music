import React, { useState } from 'react';
import './Sidebar.scss';
import Logo from '../../assets/img/maze_2.png';

const Sidebar = ({ data, onClickItem, current}) => {
    const [check, setCheck] = useState(current);


    const onActiveItem = (id, item) => {
        onClickItem(id, item);
        setCheck(id);
    }

    return (
        <div className="music__sidebar">
            
            <div className="music__sidebar-logo">
                <img src={Logo} alt="Logo"/>
                <h2>MAZE MUSIC</h2>
            </div>
            
            <div className="music__sidebar-library">
                <h4 className="music__sidebar-title">Library</h4>
                    <ul>
                        {data.library.map(item => {
                            return (
                                <li 
                                    key={item.id} 
                                    onClick={() => onActiveItem(item.id, data["library"])} 
                                    className={item.id === check ? "active" : ""}>

                                    <i className={`fas fa-${item.icon}`}></i>
                                    <span>{item.name}</span>
                                </li>);
                        })}   
                    </ul>
            </div>
            

            <div className="music__sidebar-discover">
                <h4 className="music__sidebar-title">Discover</h4>
                    <ul>
                        {data.discover.map(item => {
                            return (
                                <li 
                                    key={item.id} 
                                    onClick={() => onActiveItem(item.id, data["discover"])} 
                                    className={item.id === check ? "active" : ''}>

                                    <i className={`fas fa-${item.icon}`}></i>
                                    <span>{item.name}</span>
                                </li>);
                        })}
                    </ul>
            </div>


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