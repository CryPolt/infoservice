"use client"
import React, { useState } from 'react';
import styles from './leftside.module.css';

export const Left = () => {

    const [openSubMenu, setOpenSubMenu] = useState(null);

    const handleSubMenuClick = (index, event) => {
        event.preventDefault();
        setOpenSubMenu(openSubMenu === index ? null : index);
    };
    return (
        <aside className={styles.sidebar}>
            <div id="leftside-navigation" className={`nano ${styles.leftsideNavigation}`}>
                <ul className="nano-content">
                    <li>
                        <a href="#">
                            <i className="fa fa-dashboard"></i>
                            <span>leftside </span>
                        </a>
                    </li>
                    <li className="sub-menu">
                        <a href="#" onClick={(e) => handleSubMenuClick(0, e)}>
                            <i className="fa fa-cogs"></i>
                            <span>Example</span>
                            <i className="arrow fa fa-angle-right pull-right"></i>
                        </a>
                        <ul style={{ display: openSubMenu === 0 ? 'block' : 'none' }}>
                            <li><a href="#">Example</a></li>
                            <li><a href="#">Example</a></li>
                            <li><a href="#">Example</a></li>
                            <li><a href="#">Example</a></li>
                            <li><a href="#">Example</a></li>
                            <li><a href="#">Example</a></li>
                            <li><a href="#">Example</a></li>
                            <li><a href="#">Example</a></li>
                            <li><a href="#">Example</a></li>
                        </ul>
                    </li>
                    <li className="sub-menu">
                        <a href="#" onClick={(e) => handleSubMenuClick(1, e)}>
                            <i className="fa fa-table"></i>
                            <span>Example</span>
                            <i className="arrow fa fa-angle-right pull-right"></i>
                        </a>
                        <ul style={{ display: openSubMenu === 1 ? 'block' : 'none' }}>
                            <li><a href="#">Example</a></li>
                            <li><a href="#">Example</a></li>
                        </ul>
                    </li>
                    <li className="sub-menu">
                        <a href="#" onClick={(e) => handleSubMenuClick(2, e)}>
                            <i className="fa fa-tasks"></i>
                            <span>Example</span>
                            <i className="arrow fa fa-angle-right pull-right"></i>
                        </a>
                        <ul style={{ display: openSubMenu === 2 ? 'block' : 'none' }}>
                            <li><a href="#">Example</a></li>
                            <li><a href="#">Example</a></li>
                            <li><a href="#">Example</a></li>
                            <li><a href="#">Example</a></li>
                            <li><a href="#">Example</a></li>
                            <li><a href="#">Example</a></li>
                        </ul>
                    </li>
                    <li className="sub-menu active">
                        <a href="#" onClick={(e) => handleSubMenuClick(3, e)}>
                            <i className="fa fa-envelope"></i>
                            <span>Example</span>
                            <i className="arrow fa fa-angle-right pull-right"></i>
                        </a>
                        <ul style={{ display: openSubMenu === 3 ? 'block' : 'none' }}>
                            <li className="active"><a href="#">Example</a></li>
                            <li><a href="#">Example</a></li>
                        </ul>
                    </li>
                    <li className="sub-menu">
                        <a href="#" onClick={(e) => handleSubMenuClick(4, e)}>
                            <i className="fa fa-bar-chart-o"></i>
                            <span>Example</span>
                            <i className="arrow fa fa-angle-right pull-right"></i>
                        </a>
                        <ul style={{ display: openSubMenu === 4 ? 'block' : 'none' }}>
                            <li><a href="#">Example</a></li>
                            <li><a href="#">Example</a></li>
                            <li><a href="#">Example</a></li>
                        </ul>
                    </li>
                    <li className="sub-menu">
                        <a href="#" onClick={(e) => handleSubMenuClick(5, e)}>
                            <i className="fa fa-map-marker"></i>
                            <span>Example</span>
                            <i className="arrow fa fa-angle-right pull-right"></i>
                        </a>
                        <ul style={{ display: openSubMenu === 5 ? 'block' : 'none' }}>
                            <li><a href="#">Example</a></li>
                            <li><a href="#">Example</a></li>
                        </ul>
                    </li>
                    <li className="sub-menu">
                        <a href="#">
                            <i className="fa fa-text-height"></i>
                            <span>Example</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

