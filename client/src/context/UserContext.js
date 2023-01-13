import { createContext } from "react";

import useAuth from "../hooks/useAuth";
import PostAuth from "../pages/admin/PostAuth";

const Context = createContext()

function UserProvider({children}){
    const {authenticated, register,logout,login,user} = useAuth()
    const {registerPost,post} = PostAuth()

    return(
        <Context.Provider value={{authenticated, register, logout,login,user,post,registerPost}}>
            {children}
        </Context.Provider>
    )
}

export {Context, UserProvider}