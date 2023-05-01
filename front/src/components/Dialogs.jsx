import React from 'react'
import styled from 'styled-components';
import messagesAlert from "../assets/messages-alert.svg";


export default function Dialogs() {
    const DialogsFrame = styled.div`
    position: absolute;
    width: 390px;
    height: 959px;
    left: 0px;
    top: 50px;
    background: #FFC671;
    `
    const MessagesAlert = styled.img`
    position:relative;
    width: 300px;
    height: 300px;
    display:block;
    margin: 0 auto;
    top: 350px;
    `
    const MessagesTitle = styled.p`
    position:relative;
    text-align: center;
    top: 401px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 35px;
    color: #000000;
    `
    const AvatarWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    margin:5px;
    `
    const Avatar = styled.img`
    position:relative;
    width:60px;
    height:60px;
    left: 49px;
    top:-320px;
    border-radius:100px;
    `
    const DialogUsername = styled.p`
    position:relative;
    margin-left:135px;
    top:-365px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size:25px;
    color: #000000;
    `
    // const UsersDialog = [{"username":"SPD", "avatar":"https://cdn2.scratch.mit.edu/get_image/user/61770542_60x60.png"}, 
    // {"username":"SPD2", "avatar":"https://cdn2.scratch.mit.edu/get_image/user/61770542_60x60.png"},
    // {"username":"SPD3", "avatar":"https://cdn2.scratch.mit.edu/get_image/user/61770542_60x60.png"},
    // {"username":"SPD4", "avatar":"https://cdn2.scratch.mit.edu/get_image/user/61770542_60x60.png"},
    // {"username":"SPD5", "avatar":"https://cdn2.scratch.mit.edu/get_image/user/61770542_60x60.png"},
    // {"username":"SPD6", "avatar":"https://cdn2.scratch.mit.edu/get_image/user/61770542_60x60.png"},
    // {"username":"SPD7", "avatar":"https://cdn2.scratch.mit.edu/get_image/user/61770542_60x60.png"},
    // {"username":"SPD8", "avatar":"https://cdn2.scratch.mit.edu/get_image/user/61770542_60x60.png"},
    // {"username":"SPD9", "avatar":"https://cdn2.scratch.mit.edu/get_image/user/61770542_60x60.png"},
    // {"username":"SPD10", "avatar":"https://cdn2.scratch.mit.edu/get_image/user/61770542_60x60.png"},
    // ].map((user, index) =><div>
    //     <Avatar src={user.avatar}/>
    //     <DialogUsername>{user.username}</DialogUsername>
    // </div>)
  return (
    <div>
        <DialogsFrame></DialogsFrame>
        <MessagesAlert src={messagesAlert}/>
        <MessagesTitle>Выберите пользователя для переписки</MessagesTitle>
        <AvatarWrapper>
            
        </AvatarWrapper>
    </div>
  )
}
