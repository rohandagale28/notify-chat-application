import React, { useContext, useEffect } from "react";
import "../../sass/ui.scss";
import { Login } from "../LoginView/Login";
import { AccountContext } from "../../context/AccountProvider";
import { UI } from "../UI";
import { addUser } from "../../services/Api";
import { TypeAccountContext } from "../../context/AccountContext";

export const Messanger: React.FC = () => {
    const { account, setAccount } = useContext(AccountContext) as TypeAccountContext;

    useEffect(() => {
        const checkUserInLocalStorage = async () => {
            const user = window.localStorage.getItem("user");
            if (user) {
                try {
                    const existingUser = JSON.parse(user);
                    const response = await addUser(existingUser);
                    setAccount(response);
                } catch (error) {
                    console.error("Error while adding user:", error);
                }
            }
        };
        checkUserInLocalStorage();
    }, [setAccount]);

    return <React.Fragment>{account ? <UI /> : <Login />}</React.Fragment>;
};
