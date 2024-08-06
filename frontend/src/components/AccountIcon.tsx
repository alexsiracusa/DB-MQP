import "../styles/AccountIcon.css"

import LoginModal from "./LoginModal.tsx";
import {useState} from "react";

function AccountIcon() {
    const [loginPopup, setLoginPopup] = useState(false);
    const [letter, setLetter] = useState('A')

    function closeModal() {
        setLoginPopup(false);
    }

    return (
        <div className="account-icon-container">
            <button
                className="icon"
                onClick={() => {
                    setLoginPopup(!loginPopup)
                }}
            >
                {letter}
            </button>

            {loginPopup &&
                <>
                    <div className="login-modal-container">
                        <LoginModal
                            close={closeModal}
                            setIcon={setLetter}
                        />
                    </div>

                    <div
                        id="overlay"
                        onClick={() => {
                            setLoginPopup(!loginPopup)
                        }}
                    ></div>
                </>
            }
        </div>
    );
}

export default AccountIcon;