import { createContext, useContext, useReducer } from "react";

const AuthContext=createContext();

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };
const initialState ={
    user:null,isAuthenticated:false,error:""
}

const reducer=(state,action)=>{
    switch(action.type) 
    {
        case "login": 
            return {...state,user:action.payload,isAuthenticated:true,error:""}
        case "logout":
            return {...state,user:null, isAuthenticated:false}
        // case "login/failed":
        //     return {...state,error:action.payload,isAuthenticated:false}
    }
}


function AuthProvider({children})
{
    const [{user,isAuthenticated,error},dispatch]=useReducer(reducer,initialState)
    function login(username,password)
    {
        if(username==FAKE_USER.email && password==FAKE_USER.password){
            dispatch({type:"login",payload:FAKE_USER})
        }
        else{
            dispatch({type:"login/failed",payload:"User name or password is wrong"})
        }
    }
    function logout()
    {
        dispatch({type:"logout"})
    }

    return <AuthContext.Provider value={{
        user,isAuthenticated,login,logout,error
    }}>
        {children}
    </AuthContext.Provider>
}

function useAuth()
{
    const context=useContext(AuthContext);
    return context;
}

export {useAuth,AuthProvider}