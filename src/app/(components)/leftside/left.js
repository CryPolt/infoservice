"use client"
import React, { useState } from 'react';
import styles from './leftside.module.css'; // Import your module CSS

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
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li className="sub-menu">
                        <a href="#" onClick={(e) => handleSubMenuClick(0, e)}>
                            <i className="fa fa-cogs"></i>
                            <span>UI Elements</span>
                            <i className="arrow fa fa-angle-right pull-right"></i>
                        </a>
                        <ul style={{ display: openSubMenu === 0 ? 'block' : 'none' }}>
                            <li><a href="#">Alerts &amp; Notifications</a></li>
                            <li><a href="#">Panels</a></li>
                            <li><a href="#">Buttons</a></li>
                            <li><a href="#">Sliders &amp; Progress</a></li>
                            <li><a href="#">Modals &amp; Popups</a></li>
                            <li><a href="#">Icons</a></li>
                            <li><a href="#">Grid</a></li>
                            <li><a href="#">Tabs &amp; Accordions</a></li>
                            <li><a href="#">Nestable Lists</a></li>
                        </ul>
                    </li>
                    <li className="sub-menu">
                        <a href="#" onClick={(e) => handleSubMenuClick(1, e)}>
                            <i className="fa fa-table"></i>
                            <span>Tables</span>
                            <i className="arrow fa fa-angle-right pull-right"></i>
                        </a>
                        <ul style={{ display: openSubMenu === 1 ? 'block' : 'none' }}>
                            <li><a href="#">Basic Tables</a></li>
                            <li><a href="#">Data Tables</a></li>
                        </ul>
                    </li>
                    <li className="sub-menu">
                        <a href="#" onClick={(e) => handleSubMenuClick(2, e)}>
                            <i className="fa fa-tasks"></i>
                            <span>Forms</span>
                            <i className="arrow fa fa-angle-right pull-right"></i>
                        </a>
                        <ul style={{ display: openSubMenu === 2 ? 'block' : 'none' }}>
                            <li><a href="#">Components</a></li>
                            <li><a href="#">Validation</a></li>
                            <li><a href="#">Mask</a></li>
                            <li><a href="#">Wizard</a></li>
                            <li><a href="#">Multiple File Upload</a></li>
                            <li><a href="#">WYSIWYG Editor</a></li>
                        </ul>
                    </li>
                    <li className="sub-menu active">
                        <a href="#" onClick={(e) => handleSubMenuClick(3, e)}>
                            <i className="fa fa-envelope"></i>
                            <span>Mail</span>
                            <i className="arrow fa fa-angle-right pull-right"></i>
                        </a>
                        <ul style={{ display: openSubMenu === 3 ? 'block' : 'none' }}>
                            <li className="active"><a href="#">Inbox</a></li>
                            <li><a href="#">Compose Mail</a></li>
                        </ul>
                    </li>
                    <li className="sub-menu">
                        <a href="#" onClick={(e) => handleSubMenuClick(4, e)}>
                            <i className="fa fa-bar-chart-o"></i>
                            <span>Charts</span>
                            <i className="arrow fa fa-angle-right pull-right"></i>
                        </a>
                        <ul style={{ display: openSubMenu === 4 ? 'block' : 'none' }}>
                            <li><a href="#">Chartjs</a></li>
                            <li><a href="#">Morris</a></li>
                            <li><a href="#">C3 Charts</a></li>
                        </ul>
                    </li>
                    <li className="sub-menu">
                        <a href="#" onClick={(e) => handleSubMenuClick(5, e)}>
                            <i className="fa fa-map-marker"></i>
                            <span>Maps</span>
                            <i className="arrow fa fa-angle-right pull-right"></i>
                        </a>
                        <ul style={{ display: openSubMenu === 5 ? 'block' : 'none' }}>
                            <li><a href="#">Google Map</a></li>
                            <li><a href="#">Vector Map</a></li>
                        </ul>
                    </li>
                    <li className="sub-menu">
                        <a href="#">
                            <i className="fa fa-text-height"></i>
                            <span>Typography</span>
                        </a>
                    </li>
                    <li className="sub-menu">
                        <a href="#" onClick={(e) => handleSubMenuClick(6, e)}>
                            <i className="fa fa-file"></i>
                            <span>Pages</span>
                            <i className="arrow fa fa-angle-right pull-right"></i>
                        </a>
                        <ul style={{ display: openSubMenu === 6 ? 'block' : 'none' }}>
                            <li><a href="#">Blank Page</a></li>
                            <li><a href="#">Login</a></li>
                            <li><a href="#">Sign Up</a></li>
                            <li><a href="#">Calendar</a></li>
                            <li><a href="#">Timeline</a></li>
                            <li><a href="#">404</a></li>
                            <li><a href="#">500</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

