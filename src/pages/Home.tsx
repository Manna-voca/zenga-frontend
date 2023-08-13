import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Popup1 from "../components/Popup1";
import Popup2 from "../components/Popup2";
import PopupComplaint from "../components/PopupComplaint";

const Home = () => {

    const [popupState, setPopupState] = useState<number>(0);

    const handlePopup1Click = () => {
        setPopupState(1);
    };

    const handlePopup2Click = () => {
        setPopupState(2);
    };

    const handlePopupComplaintClick = () => {
        setPopupState(3);
    };

    return(
        <>
            <Header type='common' isChannelAdmin={true}></Header>
            <div style={{ height: '20px' }}></div>
            <div
                onClick={handlePopup1Click}
                style={{ height: '535px', margin: '0 20px 0 20px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #2A99FF 0%, #ABD7FF 100%)'
            }}></div>
            <div style={{ height: '40px' }}></div>
            <div
                onClick={handlePopup2Click}
                style={{ height: '535px', margin: '0 20px 0 20px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #2A99FF 0%, #ABD7FF 100%)'
            }}></div>
            <div style={{ height: '40px' }}></div>
            <div
                onClick={handlePopupComplaintClick}
                style={{ height: '535px', margin: '0 20px 0 20px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #2A99FF 0%, #ABD7FF 100%)'
            }}></div>
            <div style={{ height: '40px' }}></div>
            <div style={{ height: '535px', margin: '0 20px 0 20px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #2A99FF 0%, #ABD7FF 100%)'
            }}></div>
            <Navbar></Navbar>

            {popupState === 1 && (
                <Popup1 func={setPopupState}></Popup1>
            )}

            {popupState === 2 && (
                <Popup2 func={setPopupState}></Popup2>
            )}

            {popupState === 3 && (
                <PopupComplaint func={setPopupState}></PopupComplaint>
            )}

        </>
    );
}

export default Home;