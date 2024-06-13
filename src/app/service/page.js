"use client";
import style from './service.module.css'
import {Header} from '../(components)/header/header'
import { useState } from 'react';
export default function Service() {


        const [modalOpen, setModalOpen] = useState(false);

        const openModal = () => {
                setModalOpen(true);
        };

        const closeModal = () => {
                setModalOpen(false);
        };

        return (
            <>
                    <Header />
            <div className={style.portfolio}>
                    <ul>
                            <li onClick={openModal}>
                                    <div className={style.caption}>
                                            <i className="fa fa-pencil fa-lg"></i>
                                            <h1>Portfolio Item</h1>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet dui non tortor feugiat</p>
                                    </div>
                            </li>
                            <li>
                                    <div className={style.caption}>
                                            <i className="fa fa-pencil fa-lg"></i>
                                            <h1>Portfolio Item</h1>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet dui non tortor feugiat</p>
                                    </div>
                            </li>
                            <li>
                                    <div className={style.caption}>
                                            <i className="fa fa-pencil fa-lg"></i>
                                            <h1>Portfolio Item</h1>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet dui non tortor feugiat</p>
                                    </div>
                            </li>
                            <li>
                                    <div className={style.caption}>
                                            <i className="fa fa-pencil fa-lg"></i>
                                            <h1>Portfolio Item</h1>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet dui non tortor feugiat</p>
                                    </div>
                            </li>
                            <li>
                                    <div className={style.caption}>
                                            <i className="fa fa-pencil fa-lg"></i>
                                            <h1>Portfolio Item</h1>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet dui non tortor feugiat</p>
                                    </div>
                            </li>
                            <li>
                                    <div className={style.caption}>
                                            <i className="fa fa-pencil fa-lg"></i>
                                            <h1>Portfolio Item</h1>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet dui non tortor feugiat</p>
                                    </div>
                            </li>
                            <li>
                                    <div className={style.caption}>
                                            <i className="fa fa-pencil fa-lg"></i>
                                            <h1>Portfolio Item</h1>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet dui non tortor feugiat</p>
                                    </div>
                            </li>
                            <li>
                                    <div className={style.caption}>
                                            <i className="fa fa-pencil fa-lg"></i>
                                            <h1>Portfolio Item</h1>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet dui non tortor feugiat</p>
                                    </div>
                            </li>
                    </ul>
            </div>



                    {modalOpen && (
                        <div className={style.modal}>
                                <div className={style.modalContent}>
                                        <span className={style.close} onClick={closeModal}>&times;</span>
                                        <h2>Modal Title</h2>
                                        <p>Modal Content</p>
                                </div>
                        </div>
                    )}

            </>
        );
}