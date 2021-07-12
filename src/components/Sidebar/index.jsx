import React, { useContext } from 'react';
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { changeDir } from "../../redux/actions"
 
import { Context } from '../../context';
import './Sidebar.scss';
import { NavLink} from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/img/Logo.svg';
import { ReactComponent as LogoTablet } from '../../assets/img/Logo_tablet.svg';

const Sidebar = ({ dispatch, path }) => {
    let { sidebar } = useContext(Context);
    let directory = useLocation();
 
    return (
        <div className="music__sidebar">
            
            <div className="music__sidebar-logo">
                <Logo className="music__sidebar-logo-main" alt="erte"/>

                <LogoTablet className="music__sidebar-logo-tablet" alt="erte"/>
            </div>
                
            <ul>
                {sidebar && sidebar.map(item => {
                    return (
                        <li 
                            key={item.id}
                            className={'/' + item.name === directory.pathname ? "active" : ""}>
                            
                            <NavLink 
                                to={`/${item.name}`} 
                                onClick={() => {
                                    dispatch(changeDir(item.name))
                                }}>
                                <span className="music__sidebar-item-icon">
                                    <i className={`fas fa-${item.icon}`}></i>
                                </span>
                                <span className="music__sidebar-item-text">{item.name}</span>
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


const mapStateToProps = (state) => {
    return {
        path: state.interface.path
    }
}

export default connect(mapStateToProps)(Sidebar);