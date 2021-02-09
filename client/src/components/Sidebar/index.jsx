import React, { useContext } from 'react';
import { connect } from 'react-redux';

import { changeDir } from '../../redux/actions';

import { Context } from '../../context';
import './Sidebar.scss';
import { NavLink} from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/img/Logo.svg';

const Sidebar = ({ directory, dispatch }) => {
    let { sidebar } = useContext(Context);

    return (
        <div className="music__sidebar">
            
            <div className="music__sidebar-logo">
                <Logo />
                {/* <h2>MAZE MUSIC</h2> */}
                {/* <p>{this.value}</p> */}
            </div>
                {/* <h4 className="music__sidebar-title">Library</h4> */}
                
            <ul>
                {sidebar && sidebar.map(item => {
                    return (
                        <li 
                            key={item.id} 
                            onClick={() => {
                                dispatch(changeDir(item.name))
                            }} 
                            className={item.name === directory ? "active" : ""}>
                            
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

const mapStateToProps = (state) => {
    return {
        directory: state.changeDir.dir
    }
}

export default connect(mapStateToProps)(Sidebar);