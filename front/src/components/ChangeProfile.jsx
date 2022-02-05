import React from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

function ChangeProfile () {
    
    return (
        <div>
            {CheckAuth()}
        </div>
  
)}
export default ChangeProfile;
