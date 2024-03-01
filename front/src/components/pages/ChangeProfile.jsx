import UserMenu from "../layouts/UserMenu.jsx";
import ProfileChangeMenu from "../layouts/ProfileChangeMenu.jsx";
import PasswordChange from "./PasswordChange"

function ChangeProfile() {
  return <UserMenu first_title="Основное" second_title="Безопасность" first_content={ProfileChangeMenu()} second_content={PasswordChange()}/>
  
}

export default ChangeProfile;
