import React, { useContext } from 'react';
import {Link, NavLink} from "react-router-dom";
import { MyButton } from "../button/MyButton";
import { AuthContext } from '../../../context';
import cl from './navbar.module.css';


export const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    }

    return (
        <div className={cl.navbar}>
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <div className={cl.navbar__links}>
                <NavLink 
                    className={({ isActive }) => 
                        isActive ? 
                        cl.navbar__link_active : 
                        cl.navbar__link} 
                    to="/about">
                        О сайте
                </NavLink>
                <NavLink 
                    className={({ isActive }) => 
                        isActive ? 
                        cl.navbar__link_active : 
                        cl.navbar__link} 
                    to="/posts">
                        Посты
                </NavLink>
            </div>
        </div>
    );
};