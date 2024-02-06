import React, { useContext, useEffect } from "react";
import "../../sass/ui.scss";
import { Login } from "../LoginView/Login";
import { AccountContext } from "../../context/AccountProvider";
import { UI } from "../UI";
import { addUser, getUser } from "../../services/Api";
import { TypeAccountContext } from "../../context/AccountContext";
import { Toaster, toast } from 'sonner'
import jwtDecode from "jwt-decode";


export const Messanger: React.FC = () => {
    const { account, setAccount }: TypeAccountContext = useContext(AccountContext);

    useEffect(() => {
        (async function () {
            const user = window.localStorage.getItem("user");
            try {
                if (user) {
                    const decoded = JSON.parse(user)
                    const response = await getUser(decoded._id as string);
                    setAccount(response.data);
                    console.log(response.status)

                    toast.success("Login in successfull")
                }
            } catch (error) {
                console.error("Error while adding user:", error);
            }
        })()
    }, [setAccount]);

    return (
        <React.Fragment>
            {account ?
                <>
                    <Toaster />
                    <UI />
                </>
                :
                <Login />
            }
        </React.Fragment>
    )
};
