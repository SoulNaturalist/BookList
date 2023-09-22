import useSWR from 'swr';
import React from 'react';
import logo from '../../assets/logo.png';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { BrowserView, MobileView} from 'react-device-detect';
import {HeaderComponent, TitleHeader, ImgHeader, ParagraphLogin, Link, BottomNav, ContainerBottom} from "../styles/Header.styles";

function Header() {

    const [iconBottom, setIcon] = React.useState();
    const [scrollY, setScrollY] = React.useState(true);

    function scrollHandler() {
        setScrollY(document.body.scrollY);
        console.log(window.scrollY)
    }
    React.useEffect(() => {
        window.addEventListener("scroll", scrollHandler);
        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    });
    const { data } = useSWR('http://127.0.0.1:3030/api/auth', (apiURL) => fetch(apiURL,{
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => res.json()));
    const loginComponent = () => {
        const subLink = window.location.href.split("/")[3];
        if (data && data.auth_data && subLink !== "logout") {
            return <ParagraphLogin><Link href={`/user/${data.auth_data.username}`}>Профиль</Link></ParagraphLogin>
        } else {
            return <ParagraphLogin><Link href="/login">Войти</Link></ParagraphLogin>
        }
    }
    return (
        <div> 
            <BrowserView>
                <HeaderComponent>
                    <Link href="/">
                        <ImgHeader src={logo}/>
                        <TitleHeader>BookList</TitleHeader>
                    </Link>
                    {loginComponent()}
                </HeaderComponent>
            </BrowserView>
            <MobileView>
                {Boolean(scrollY) ? <BottomNav>
                    <ContainerBottom>
                        <BottomNavigation showLabels value={iconBottom} sx={{ width: 400 }} onChange={(e, icon) => setIcon(icon)}>
                            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
                        </BottomNavigation>
                    </ContainerBottom>
                </BottomNav>:<div></div>}
            </MobileView>
        </div>
    );
};

export default Header;