import React from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function Profile () {
    const [Data,setData] = React.useState("");
    const [Error,setError] = React.useState(false);
    const navigate = useNavigate("/");
    React.useEffect(() => {
        axios({method: 'post',url:'http://127.0.0.1:3030/api/auth',withCredentials: true, headers: {}})
        .then(response => {setData(response.data)})
        .catch(err => {setError(err)})
    }, [])
    const CheckAuth = () => {
        if (Data.auth_data && !Error) {
            return <div>
                <img src={Data.auth_data.avatar} className="user_avatar"/>
                <div className="text-block">
                    <br/>
                    <p className="username">{Data.auth_data.username}</p>
                    <p className="description">{Data.auth_data.status}</p>
                    <ul className="books_menu">
                        <li>прочитано</li>
                        <li>брошено</li>
                        <li>запланировано</li>
                        <li>отзывы</li>
                    </ul>
                    <img className="readed" src="https://s3-alpha-sig.figma.com/img/ef51/e408/57ee12563a50f0672d3dd85fddaa75ac?Expires=1644192000&Signature=GINfr~uxgc44JR093rTZV3TeWMy~ZiZF5d4YYRBk3KqikcMRjY576EAN2F49Gn~NHw2Llbi8RDNtDLB89zN9XYrlRJUxw5X6zvYM~yHc0Dn5P4m35YtaOLoZo2r1XkxoZI-MAEqR0wBc1wb2XUaWrJWjZeZAs7zHpYYAl2TqQQ473KUiJzxC6sXVq0h3tzuRKf5mSBj75ZkMZgUVE5F1Uz6HNA49UQvHSuVNZBjrz9nqi8kwzSIsCqb6AAph-tZahh4kRgWG-ygqbtI1TvuXUWh~QERzVODF04oUkum-1AGj2huHoQV3Oas8TAJWgVN1D-qYFxFt9zCb6JFdpuNZIg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"/>
                    <img className="drop" src="https://s3-alpha-sig.figma.com/img/f612/d316/a8a82ba166e5ca8b4bc28857a77750f7?Expires=1644192000&Signature=d9ir9pJIm~yeD2-AOWftA0Sh6A9CfgPd5NN-HCbuj6qMpxlVPGcJ4hESgTIIiB-u8uvk8ZXbCtT1vNTq0oDQQh30gKZtqYnzb0SGdjToUC4HED4lbU3xMKoRvRiEfV-nkEtWo3BBOAU9kH02VEQYhi3QuQ2VFl2IcI4GymSMEOiC0PrBTG89U3hf~eUIdPLueIYEuOj9jJG3qhElc3hXi68NjgHZZJtVXWdbYjPyA0TZ8z0ng8Q-2J~uDuKMsvFgP0Jhr2ZHm70mtTs45foa4pK3iT7cYez30iRZ6z74kDwu6CcVtuTj6~FKVpxPERCtoi-EEl0CYLOZYT1kosbb4A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"/>
                    <img className="planned" src="https://s3-alpha-sig.figma.com/img/280a/2b4b/4438c67f9415f76d4c5cb2ab3e3df81b?Expires=1644192000&Signature=KR37nOrPzsjx8JjZi0fB1OcgfKQDkMjICNabub9sbAswRa1tw1TLiZBixN2gCehwzMjEVBDE7pwI0Hnmqct1RphL10YDCfIr0mgdUtd-vK6-Wg2Jg10bCbjARk1Wm98w2K4x8h3Qf~6ZQxI5qS2757udOT~laeICFGIa3rFtLBvIFG81Oe4O0gxrNAHLRABPEaEvxYF8Y2bzN-F~AJjnMliL5Yqa6TvuiL-B4GLsYRjdLX-7CR~flX9rK591GNntbFqOnYYmQdZ2eUtlBjkcfHZ1Snm5K~hGUrExw-RQnLais90gb2RBEODoqnR4mdV7G9F6FUskdF3lqabGe2MB4A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"/>
                    <img className="reviews" src="https://s3-alpha-sig.figma.com/img/8396/a5ab/684fe0f44a16a6a845d797c98d267f87?Expires=1644192000&Signature=QtVKLMnd5wtXKSc9Cxe4DUYU54KV8ryBm3gif7y2~k-jROwuPpnuUYi9hShLoSbT47XylGxoh2eJZjWBhFM2O4AVeFjbPEkIZfBy4P6gwZtySAsavshtNk1Ejj1cUV0MAhTKbFXkYQY1YUbb~1lq7xHUTmEgptDHHumq8Z5bvgjLzKBFwWo-NGW~hEsmal8On42mXNV6sbdHtojqPUEbtJL-vlZL8zhVmtRiyslYaDuok9W5A1y0ivIjV57-Y2Gu5aZSeJP3Wd0DTgv-MDXEpVdt41jTAhYqXJOokP5zD6Hy7EYKt0A7BvpGbCPiSk6EILMSiwbclaWdH~aHZFo6Ng__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"/>
                    <div className="count_block">
                        <p className="readed_count">10</p>
                        <p className="drop_count">10</p>
                        <p className="planned_count">10</p>
                        <p className="reviews_count">10</p>
                    </div>
                </div>
            </div>
        } else {
            navigate("/");
        }
    }
    return (
        <div>
            {CheckAuth()}
        </div>
  
)}
export default Profile;
