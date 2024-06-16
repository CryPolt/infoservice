"use client"
import React, { useState } from 'react';
import styles from './leftside.module.css'; // Import your module CSS

const Left = () => {
    const [activeMenu, setActiveMenu] = useState(null); // State for tracking active menu

    const toggleSubMenu = (index) => {
        setActiveMenu(activeMenu === index ? null : index); // Toggle active menu
    };

    return (
        <div className={`${styles.layout} ${styles['has-sidebar']} ${styles['fixed-sidebar']} ${styles['fixed-header']}`}>
            {/* Sidebar */}
            <aside id="sidebar" className={`${styles.sidebar} ${styles['break-point-sm']} ${styles['has-bg-image']}`}>
                <a id="btn-collapse" className={styles['sidebar-collapser']}><i className="ri-arrow-left-s-line"></i></a>
                <div className={styles['image-wrapper']}></div>
                <div className={styles['sidebar-layout']}>
                    <div className={styles['sidebar-header']}>
                        <div className={styles['pro-sidebar-logo']}>
                            <div>P</div>
                            <h5>Pro Sidebar</h5>
                        </div>
                    </div>
                    <div className={styles['sidebar-content']}>
                        <nav className={`${styles.menu} ${styles['open-current-submenu']}`}>
                            <ul>
                                {/* General */}
                                <li className={styles['menu-header']}><span>GENERAL</span></li>
                                <li className={`${styles['menu-item']} ${styles['sub-menu']}`}>
                                    <a href="#" onClick={() => toggleSubMenu(1)}>
                                        <span className={styles['menu-icon']}><i className="ri-vip-diamond-fill"></i></span>
                                        <span className={styles['menu-title']}>Components</span>
                                        <span className={styles['menu-suffix']}><span className={`${styles.badge} ${styles.primary}`}>Hot</span></span>
                                    </a>
                                    <div className={activeMenu === 1 ? styles['sub-menu-list'] : `${styles['sub-menu-list']} ${styles.collapsed}`}>
                                        <ul>
                                            <li className={styles['menu-item']}>
                                                <a href="#"><span className={styles['menu-title']}>Grid</span></a>
                                            </li>
                                            <li className={styles['menu-item']}>
                                                <a href="#"><span className={styles['menu-title']}>Layout</span></a>
                                            </li>
                                            <li className={`${styles['menu-item']} ${styles['sub-menu']}`}>
                                                <a href="#" onClick={() => toggleSubMenu(2)}>
                                                    <span className={styles['menu-title']}>Forms</span>
                                                </a>
                                                <div className={activeMenu === 2 ? styles['sub-menu-list'] : `${styles['sub-menu-list']} ${styles.collapsed}`}>
                                                    <ul>
                                                        <li className={styles['menu-item']}>
                                                            <a href="#"><span className={styles['menu-title']}>Input</span></a>
                                                        </li>
                                                        <li className={styles['menu-item']}>
                                                            <a href="#"><span className={styles['menu-title']}>Select</span></a>
                                                        </li>
                                                        <li className={`${styles['menu-item']} ${styles['sub-menu']}`}>
                                                            <a href="#" onClick={() => toggleSubMenu(3)}>
                                                                <span className={styles['menu-title']}>More</span>
                                                            </a>
                                                            <div className={activeMenu === 3 ? styles['sub-menu-list'] : `${styles['sub-menu-list']} ${styles.collapsed}`}>
                                                                <ul>
                                                                    <li className={styles['menu-item']}>
                                                                        <a href="#">
                                                                            <span className={styles['menu-prefix']}>&#127881;</span>
                                                                            <span className={styles['menu-title']}>You made it</span>
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                {/* Charts */}
                                <li className={`${styles['menu-item']} ${styles['sub-menu']}`}>
                                    <a href="#" onClick={() => toggleSubMenu(4)}>
                                        <span className={styles['menu-icon']}><i className="ri-bar-chart-2-fill"></i></span>
                                        <span className={styles['menu-title']}>Charts</span>
                                    </a>
                                    <div className={activeMenu === 4 ? styles['sub-menu-list'] : `${styles['sub-menu-list']} ${styles.collapsed}`}>
                                        <ul>
                                            <li className={styles['menu-item']}>
                                                <a href="#"><span className={styles['menu-title']}>Pie chart</span></a>
                                            </li>
                                            <li className={styles['menu-item']}>
                                                <a href="#"><span className={styles['menu-title']}>Line chart</span></a>
                                            </li>
                                            <li className={styles['menu-item']}>
                                                <a href="#"><span className={styles['menu-title']}>Bar chart</span></a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                {/* E-commerce */}
                                <li className={`${styles['menu-item']} ${styles['sub-menu']}`}>
                                    <a href="#" onClick={() => toggleSubMenu(5)}>
                                        <span className={styles['menu-icon']}><i className="ri-shopping-cart-fill"></i></span>
                                        <span className={styles['menu-title']}>E-commerce</span>
                                    </a>
                                    <div className={activeMenu === 5 ? styles['sub-menu-list'] : `${styles['sub-menu-list']} ${styles.collapsed}`}>
                                        <ul>
                                            <li className={styles['menu-item']}>
                                                <a href="#"><span className={styles['menu-title']}>Products</span></a>
                                            </li>
                                            <li className={styles['menu-item']}>
                                                <a href="#"><span className={styles['menu-title']}>Orders</span></a>
                                            </li>
                                            <li className={styles['menu-item']}>
                                                <a href="#"><span className={styles['menu-title']}>Credit card</span></a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                {/* Maps */}
                                <li className={`${styles['menu-item']} ${styles['sub-menu']}`}>
                                    <a href="#" onClick={() => toggleSubMenu(6)}>
                                        <span className={styles['menu-icon']}><i className="ri-global-fill"></i></span>
                                        <span className={styles['menu-title']}>Maps</span>
                                    </a>
                                    <div className={activeMenu === 6 ? styles['sub-menu-list'] : `${styles['sub-menu-list']} ${styles.collapsed}`}>
                                        <ul>
                                            <li className={styles['menu-item']}>
                                                <a href="#"><span className={styles['menu-title']}>Google maps</span></a>
                                            </li>
                                            <li className={styles['menu-item']}>
                                                <a href="#"><span className={styles['menu-title']}>Open street map</span></a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                {/* Theme */}
                                <li className={`${styles['menu-item']} ${styles['sub-menu']}`}>
                                    <a href="#" onClick={() => toggleSubMenu(7)}>
                                        <span className={styles['menu-icon']}><i className="ri-paint-brush-fill"></i></span>
                                        <span className={styles['menu-title']}>Theme</span>
                                    </a>
                                    <div className={activeMenu === 7 ? styles['sub-menu-list'] : `${styles['sub-menu-list']} ${styles.collapsed}`}>
                                        <ul>
                                            <li className={styles['menu-item']}>
                                                <a href="#"><span className={styles['menu-title']}>Dark</span></a>
                                            </li>
                                            <li className={styles['menu-item']}>
                                                <a href="#"><span className={styles['menu-title']}>Light</span></a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                {/* Extra */}
                                <li className={styles['menu-header']} style={{ paddingTop: '20px' }}><span>EXTRA</span></li>
                                <li className={styles['menu-item']}>
                                    <a href="#">
                                        <span className={styles['menu-icon']}><i className="ri-book-2-fill"></i></span>
                                        <span className={styles['menu-title']}>Documentation</span>
                                        <span className={styles['menu-suffix']}><span className={`${styles.badge} ${styles.secondary}`}>Beta</span></span>
                                    </a>
                                </li>
                                <li className={styles['menu-item']}>
                                    <a href="#">
                                        <span className={styles['menu-icon']}><i className="ri-calendar-fill"></i></span>
                                        <span className={styles['menu-title']}>Calendar</span>
                                    </a>
                                </li>
                                <li className={styles['menu-item']}>
                                    <a href="#">
                                        <span className={styles['menu-icon']}><i className="ri-service-fill"></i></span>
                                        <span className={styles['menu-title']}>Examples</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className={styles['sidebar-footer']}>
                        <div className={styles['footer-box']}>
                            <div></div>
                            <div style={{ padding: '0 10px' }}>
                                <span style={{ display: 'block', marginBottom: '10px' }}>
                                    Pro sidebar is also available as a react package
                                </span>
                                <div style={{ marginBottom: '15px' }}></div>
                                <div>
                                    <a href="https://github.com/azouaoui-med/react-pro-sidebar" target="_blank">
                                        Check it out!
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <div id="overlay" className={styles.overlay}></div>
            {/* Main Content */}
            <div className={styles.layout}>
                <main className={styles.content}>
                    {/* Content Sections */}
                    <div>
                        <a id="btn-toggle" href="#" className={styles['sidebar-toggler']}><i className="ri-menu-line ri-xl"></i></a>
                        <h1 style={{ marginBottom: '0' }}>Pro Sidebar</h1>
                        <span style={{ display: 'inline-block' }}>Responsive layout with advanced sidebar menu built with SCSS and vanilla Javascript</span>
                        <br />
                        <span>Full Code and documentation available on <a href="https://github.com/azouaoui-med/pro-sidebar-template" target="_blank">Github</a></span>
                        <div style={{ marginTop: '10px' }}>
                            <a href="https://github.com/azouaoui-med/pro-sidebar-template" target="_blank"></a>
                            <a href="https://github.com/azouaoui-med/pro-sidebar-template" target="_blank"></a>
                        </div>
                    </div>
                    {/* Features */}
                    <div>
                        <h2>Features</h2>
                        <ul>
                            <li>Fully responsive</li>
                            <li>Collapsible sidebar</li>
                            <li>Multi-level menu</li>
                            <li>RTL support</li>
                            <li>Customizable</li>
                        </ul>
                    </div>
                    {/* Resources */}
                    <div>
                        <h2>Resources</h2>
                        <ul>
                            <li><a target="_blank" href="https://github.com/azouaoui-med/css-pro-layout">CSS Pro Layout</a></li>
                            <li><a target="_blank" href="https://github.com/popperjs/popper-core">Popper Core</a></li>
                            <li><a target="_blank" href="https://remixicon.com/">Remix Icons</a></li>
                        </ul>
                    </div>
                    {/* Footer */}
                    <footer className={styles.footer}>
                        <small style={{ marginBottom: '20px', display: 'inline-block' }}>
                            © 2023 made with <span style={{ color: 'red', fontSize: '18px' }}>&#10084;</span> by -
                            <a target="_blank" href="https://azouaoui.netlify.com"> Mohamed Azouaoui </a>
                        </small>
                        <br />
                        <div className={styles['social-links']}>
                            <a href="https://github.com/azouaoui-med" target="_blank"><i className="ri-github-fill ri-xl"></i></a>
                            <a href="https://twitter.com/azouaoui_med" target="_blank"><i className="ri-twitter-fill ri-xl"></i></a>
                            <a href="https://codepen.io/azouaoui-med" target="_blank"><i className="ri-codepen-fill ri-xl"></i></a>
                            <a href="https://www.linkedin.com/in/mohamed-azouaoui/" target="_blank"><i className="ri-linkedin-box-fill ri-xl"></i></a>
                        </div>
                    </footer>
                </main>
                <div className={styles.overlay}></div>
            </div>
        </div>
    );
};

export default Left;
