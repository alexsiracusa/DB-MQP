import "../styles/AccountIcon.css"

import {useState} from "react";

function AccountIcon() {
    const [loginPopup, setLoginPopup] = useState(false);

    return (
        <div className="account-icon-container">
            <button
                className="icon"
                onClick={() => {
                    setLoginPopup(!loginPopup)
                }}
            >
                ?
            </button>

            {loginPopup &&
                <>
                    <div className="login-popup">

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