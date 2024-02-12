import useSWR from "swr";
import React from "react";
import logo from "../../assets/logo.png";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BrowserView, MobileView } from "react-device-detect";
import {
  HeaderComponent,
  TitleHeader,
  ImgHeader,
  ParagraphLogin,
  Link,
  BottomNav,
  ContainerBottom,
} from "../styles/Header.styles";
import { createSvgIcon } from "@mui/material/utils";
import { useNavigate } from "react-router-dom";

function Header() {
  const [iconBottom, setIcon] = React.useState();
  const [scrollY, setScrollY] = React.useState(true);
  const navigate = useNavigate();

  function scrollHandler() {
    setScrollY(document.body.scrollY);
  }
  React.useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  });
  const { data } = useSWR("http://127.0.0.1:3030/api/auth", (apiURL) =>
    fetch(apiURL, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => res.json()),
  );
  const loginComponent = () => {
    const subLink = window.location.href.split("/")[3];
    if (data && data.auth_data && subLink !== "logout") {
      return (
        <ParagraphLogin>
          <Link href={`/user/${data.auth_data.username}`}>Профиль</Link>
        </ParagraphLogin>
      );
    } else {
      return (
        <ParagraphLogin>
          <Link href="/login">Войти</Link>
        </ParagraphLogin>
      );
    }
  };
  const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
    "Home",
  );
  const ProfileIcon = createSvgIcon(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>,
    "Profile",
  );
  return (
    <div>
      <BrowserView>
        <HeaderComponent>
          <Link href="/">
            <ImgHeader src={logo} />
            <TitleHeader>BookList</TitleHeader>
          </Link>
          {loginComponent()}
        </HeaderComponent>
      </BrowserView>
      <MobileView>
        {Boolean(scrollY) && data ? (
          <BottomNav>
            <ContainerBottom>
              <BottomNavigation
                showLabels
                value={iconBottom}
                sx={{ width: 400 }}
                onChange={(e, icon) => setIcon(icon)}
              >
                <BottomNavigationAction
                  label="Главная"
                  icon={<HomeIcon />}
                  onClick={() => navigate("/")}
                />
                <BottomNavigationAction
                  label="Книги"
                  icon={<FavoriteIcon />}
                  onClick={() => navigate("/catalog")}
                />
                <BottomNavigationAction
                  label="Профиль"
                  icon={<ProfileIcon />}
                  onClick={() =>
                    navigate(
                      data.auth_data
                        ? `/user/${data.auth_data.username}`
                        : "/login",
                    )
                  }
                />
              </BottomNavigation>
            </ContainerBottom>
          </BottomNav>
        ) : (
          <div></div>
        )}
      </MobileView>
    </div>
  );
}

export default Header;
