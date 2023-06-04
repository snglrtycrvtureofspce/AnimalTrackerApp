import React, { Fragment } from 'react';

import classes from './Helps.module.css';
import Photo from '../../Data/personalPhoto.png';
import PersonalData from '../../Data/PersonalData';
import SocialLinks from '../SocialLinks/SocialLinks';
import GetInTouch from '../GetInTouch/GetInTouch';
import { useSelector } from 'react-redux';
const Helps = () => {

    const uiColor=useSelector(state=>state.uiColor);

    return (
        <Fragment>
            <div className={classes.contactMe}>
                <div className={classes.avatar}>
                    <img src={Photo} alt="" style={{borderColor:uiColor}} />
                </div>
                <div className={classes.contactCard}>
                    <h1 style={{color:uiColor}}>Обратная связь</h1>
                    <div>
                        {PersonalData.aboutMe}
                    </div>
                    <div className={classes.contactLinks}>
                        <SocialLinks className={classes.links} />
                    </div>
                </div>
            </div>
            <GetInTouch />
        </Fragment>
    )
};
export default Helps;