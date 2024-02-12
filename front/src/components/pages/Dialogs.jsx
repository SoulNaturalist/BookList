import React from "react";
import messagesAlert from "../../assets/messages-alert.svg";
import {
  DialogsFrame,
  MessagesAlert,
  MessagesTitle,
  AvatarWrapper,
  DialogUsername,
  Avatar,
} from "../styles/Dialogs.styles.js";

export default function Dialogs() {
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
      <MessagesAlert src={messagesAlert} />
      <MessagesTitle>Выберите пользователя для переписки</MessagesTitle>
      <AvatarWrapper>{/* {UsersDialog} */}</AvatarWrapper>
    </div>
  );
}
