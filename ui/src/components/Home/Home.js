import React, { useEffect } from "react";
import Typewriter from 'typewriter-effect/dist/core';
import profileAvatar from "../assets/logo.png";
import PersonalData from "../../Data/PersonalData";
import classes from "./home.module.css";
import { autoTypeData } from "../../Data/PersonalData";

import SocialLinks from "../SocialLinks/SocialLinks";
import { useSelector } from "react-redux";

function Home(props) {

    const uiColor=useSelector(state=>state.uiColor);
    function handleTyper() {
        let textItems = autoTypeData;
        var autoTyper = document.getElementById('typer');
        new Typewriter(autoTyper, {
            strings: textItems,
            autoStart: true,
            pauseFor: 1000,
            loop: true,
        });
    }
    useEffect(
        handleTyper
    ,[]);
    return (
        <main>
            <div className={classes.homeContent}>
                <h2><span id="name" style={{ color: uiColor }}>{PersonalData.firstName}&nbsp;{PersonalData.lastName}</span></h2>
                <div className={classes.autoText}>
                    Сервис для отслеживания &nbsp; <span id="typer" style={{ color: uiColor }}></span>
                </div>
                <p className={classes.connectText}>Будьте <span style={{ color: uiColor }}>рядом</span> с нами.</p>
                <SocialLinks className={classes.links} />
            </div>
            <div className={classes.avatarImage}>
                <img src={profileAvatar} alt="" srcSet="" />
            </div>
        </main>
    )
}
export default Home;