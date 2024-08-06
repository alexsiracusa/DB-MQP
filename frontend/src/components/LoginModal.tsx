import "../styles/LoginModal.css"

import {useState} from "react";

type LoginModalProps = {
    close: () => void;
}


function LoginModal(props: LoginModalProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    async function login() {
        const body = {
            email: email,
            password: password
        };

        await fetch('http://localhost:8000/auth/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            credentials: 'include'
        })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    props.close()
                } else {
                    console.log(response)
                    alert('Incorrect username or password.');
                }
            });
    }

    function canSubmit(): boolean {
        return email != "" && password != ""
    }

    return (
        <div id="login-modal">
            <h4>Login</h4>
            <br/>
            <input
                className="input-box"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <br/>
            <input
                className="input-box"
                value={password}
                // type="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="show-password-checkbox">
                <input
                    type="checkbox"
                    onClick={() => {
                        setShowPassword(!showPassword)
                    }}
                />
                Show Password
            </div>

            <br/>

            <div className="button-container">
                <button
                    type="submit"
                    disabled={!canSubmit()}
                    onClick={login}
                >
                    Sign in
                </button>
            </div>
        </div>
    )
}

export default LoginModal;
