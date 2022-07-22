import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


function AdminPanel () {
    const navigate = useNavigate();
    const [Data,setData] = React.useState([]);
    const [Books,setBooks] = React.useState([]);
    const [Users,setUsers] = React.useState([]);
    const [loading,setLoading] = React.useState(false);
    const [dataInput,setDataInput] = React.useState({});
    React.useEffect(() => {
        axios({method: 'post',url:'http://127.0.0.1:3030/api/auth',withCredentials: true, headers: {}})
        .then(response => {
            setData(response.data.auth_data)
        })
        axios({method: 'get',url:'http://127.0.0.1:3030/api/get_library_books',withCredentials: true, headers: {}})
        .then(response => {
            setBooks(response.data)
        })
        axios({method: 'get',url:'http://127.0.0.1:3030/api/get_users',withCredentials: true, headers: {}})
        .then(response => {
            setUsers(response.data)
            setLoading(true)
        })
    }, [])
    const checkPermission = () => {
        if (Data) {
            if (Data.role === 3) {
                return <div>
                    <h1 style={{textAlign: 'center',position: 'relative', top: '30px', fontFamily: 'Roboto'}}>Добро пожаловать в админ панель,{Data.username}</h1>
                    <div className="admin_manage_table">
                        <div className="manage_buttons">
                            <div>
                                <img src="https://cdn-icons-png.flaticon.com/512/456/456212.png" width="100px" height="100px" alt="user_icon" onClick={() => alert(dataInput.userValue)}/>
                                <input onChange={(e) => setDataInput({...dataInput,userValue:e.target.value})}></input>
                            </div>
                            <div>
                                <img src="https://cdn-icons-png.flaticon.com/512/709/709489.png" width="100px" height="100px" alt="ban_icon" onClick={() => alert(dataInput.banValue)}/>
                                <input onChange={(e) => setDataInput({...dataInput,banValue:e.target.value})}></input>
                            </div>
                            <div>
                                <img src="https://cdn-icons-png.flaticon.com/512/1933/1933005.png" width="100px" height="100px" alt="send_icon" onClick={() => alert(dataInput.sendValue)}/>
                                <input onChange={(e) => setDataInput({...dataInput,sendValue:e.target.value})}></input>
                            </div>
                            <div>
                                <img src="https://cdn-icons.flaticon.com/png/512/657/premium/657059.png?token=exp=1658448149~hmac=de4079ef2937f8cf864e1110348ed5e8" width="100px" height="100px" alt="delete_icon" onClick={() => alert(dataInput.deleteValue)}/>
                                <input onChange={(e) => setDataInput({...dataInput,deleteValue:e.target.value})}></input>
                            </div>
                        </div>
                    </div>
                </div>
            } else {
                return <div>
                    <img src="https://cdn-icons-png.flaticon.com/512/6540/6540812.png" style={{
                        width:'10%', height:'50%',position: 'relative', top: '90px',
                        display:'block', margin:'auto'
                    }} alt="permissions-icon"/>
                    <h1 style={{textAlign: 'center',position: 'relative', top: '90px', fontFamily: 'Roboto'}}>Ты не являешься администратором, {Data.username}</h1>
                </div>

            }
        }
    }
    return (
        <div>
            {loading ? checkPermission():<div style={{display: 'flex', justifyContent: 'center', position:'relative', top:'60px'}}><CircularProgress disableShrink /></div>}
        </div>
    );
    
}

export default AdminPanel;