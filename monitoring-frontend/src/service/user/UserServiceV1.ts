import UserLoginForm from "../../model/UserLoginForm";
import {request} from "../../Config";
import RegisterForm from "../../model/RegisterForm";

class UserServiceV1 {

    async login(userLoginForm:UserLoginForm) {
        let response = await request.post("/api/login", userLoginForm);
        if (response.status === 200) {

            localStorage.setItem("username", userLoginForm.username);

            return userLoginForm
        }

        throw Error("Encountered error while trying to login. Response Status: " + response.status);
    }

    async register(registerForm:RegisterForm) {
        let response = await request.post("/users", registerForm);
        if (response.status !== 201) {
            throw Error("Encountered error while trying to register user. Response Status: " + response.status);
        }

        console.log(response.headers);
        localStorage.setItem("user", response.headers.location);
        return true;
    }

}

export default UserServiceV1;