import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import axios from 'axios';

function Header() {
    const [Data,setData] = React.useState("");
    const [Error,setError] = React.useState(false);
    React.useEffect(() => {
        axios({method: 'post',url:'http://127.0.0.1:3030/api/auth',withCredentials: true, headers: {}})
        .then(response => {setData(response.data)})
        .catch(err => {setError(err)})
    }, [])
    const ProfileElement = () => {
        if (Data.auth_data) {
            return <p className="profile"><a href="/profile">Профиль</a></p>
        } else {
            return "";
        }

    }
    return (
        <div className="header">
            <header>
                <nav>
                    <ul>
                        <li>
                            <Router>
                                <img className="logo" src="https://s3-alpha-sig.figma.com/img/b41a/7fa1/8be56d6bfd6ee72f48efbf8a5082b536?Expires=1644192000&Signature=HQaBVKsOs8hpWQHPZ9XN-VVw0C71bktXuWD7m0IfgGD4H-jCDsmhXzqE2i66I0XrtuNq2kKrB8-bCZDdavPV5qHEbdSf0gDA90d6~o1iQpl3azhTxR3R4FKM51YaIKXS1u-HTAyHJhglDtJuuw-ZK9A8cu8Mx5~EF1Fo~eHqsoUVTImnDtNDGcYIY8MgvRVwkmyikqGaWN~Qx5Ayg2MGZ4~37PBs~PH7Nyz9i3m6s2CD4K8ErL~lyM61njbDzijqlLIpCpxx7i~midFAx2AuatPrsnnJTqCFTHcB5d2bg2CWKbmDrZEKp8z73FwHuCrf3vw28XegFWUZpV0ku9cb~Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="logo"/>
                                <h1><a href="/">BookList</a></h1>
                                {ProfileElement()}
                            </Router>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default Header;
