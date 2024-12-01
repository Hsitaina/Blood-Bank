import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";


export const handleLogin = (e,email,password,role) => {
    e.preventDefault();
    try {
        if(!role||!email||!password){
            return alert('Please Provide all fields');
        }
        store.dispatch(userLogin({role,email,password}));
    } catch (error) {
        console.log(error);
    }
};

export const handleRegister = (e,email,password,role,name,organisationName,hospitalName,website,address,phone) => {
    e.preventDefault();
    try {
        store.dispatch(userRegister({email,password,role,name,organisationName,hospitalName,website,address,phone}));
    } catch (error) {
        console.log(error);
    }
};