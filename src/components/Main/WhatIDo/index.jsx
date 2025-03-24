import { useState } from "react";
import Intro from "./intro";
import Main from "./main";
import Partners from "./partners";
import BackgroundGradient from "../../common/Backgroundwhite";

export default function WhatIDo(){
    const [modal, setModal] = useState({ active: false, index: 0 });

    return (
        <section className="WID">
            <BackgroundGradient />
            <Intro />
            <Main modal={modal} setModal={setModal}/>
            <Partners />
            <div className="WID__rectangleAnim">
                {Array.from({length: 4}).map((_, i) => (
                    <div key={i} className={`WID__rectangleAnim__rectangle${i + 1}`}></div>
                ))}
            </div>
        </section>
    )
}
