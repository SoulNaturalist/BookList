import UserMenu from "../layouts/UserMenu.jsx";
import ProfileChangeMenu from "../layouts/ProfileChangeMenu.jsx";

function ChangeProfile() {
  return <UserMenu first_title="Основное" second_title="Безопасность" first_content={ProfileChangeMenu()} second_content={<h1>2</h1>}/>
  
}

export default ChangeProfile;
