import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/TutorialsModes.css'

// Traducciones
import Translate from "react-translate-component";
import counterpart from "counterpart";
import en from "../../language/eng.js";
import es from "../../language/esp.js"

function  TutorialModes () {
    const handleClickVideo = () => {
        window.location.href = ('/tutorial')
    }
    const handleClickImages = () => {
        window.location.href = ('/tutorialImages')
    }
    const handleClickVideoTl = () => {
        window.location.href = ('/tutorialLTVideo')
    }
    const handleClickImagesTl = () => {
        window.location.href = ('/tutorialLTImages')
    }

    const [language, setLanguage] = useState(localStorage.getItem('idioma'));

    const lang = language;

    counterpart.registerTranslations('en', en);
    counterpart.registerTranslations('es', es);
    counterpart.setLocale(lang); /* counterpart.setLocale(lang+''); */

    return (
       <div className='buttonsChooseTutorial'>
            <button className='optionTutorial' type='button' onClick={handleClickVideo}>{<Translate content="tutorialVideo" component="span" />}</button>
            <button className='optionTutorial' type='button' onClick={handleClickImages}>{<Translate content="tutorialImages" component="span" />}</button>
            <button className='optionTutorial' type='button' onClick={handleClickVideoTl}>{<Translate content="tutorialVideoLong" component="span" />}</button>
            <button className='optionTutorial' type='button' onClick={handleClickImagesTl}>{<Translate content="tutorialImagesLong" component="span" />}</button>
       </div>
    )
}

export default TutorialModes