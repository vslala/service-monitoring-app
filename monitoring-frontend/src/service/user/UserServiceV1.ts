import UserLoginForm from "../../model/UserLoginForm";
import {request} from "../../Config";
import RegisterForm from "../../model/RegisterForm";
import WebServiceForm from "../../model/WebServiceForm";
import WebService, {WebServices} from "../../model/WebService";
import User from "../../model/User";

/**
 * @author Varun Shrivastava
 */
class UserServiceV1 {

    /**
     * dummy login
     * check if user exists in the database with the given username
     * @param userLoginForm
     */
    async login(userLoginForm: UserLoginForm) {
        let response = await request.get(`/users/search/findByUsername?username=${userLoginForm.username}`);
        if (response.status === 200) {
            let user = response.data as User
            console.log(user);
            localStorage.setItem("user", user._links.self.href);

            return userLoginForm
        }

        throw Error("Encountered error while trying to login. Response Status: " + response.status);
    }

    /**
     * make a post request to save user in the database
     * @param registerForm
     */
    async register(registerForm: RegisterForm) {
        let response = await request.post("/users", registerForm);
        if (response.status !== 201) {
            throw Error("Encountered error while trying to register user. Response Status: " + response.status);
        }

        return true;
    }

    /**
     * user creates a service
     * call the post end point of service to create a new service
     *
     * @param webServiceForm
     */
    async createService(webServiceForm: WebServiceForm): Promise<WebService> {
        let user = await this.getLoggedInUser();
        let response = await request.post(`/services`, {
            name: webServiceForm.name,
            url: webServiceForm.url,
            user: `/users/${user.id}`
        });

        if (response.status === 201) {
            let newServiceLocation = response.headers.location;
            let newService = await request.get(newServiceLocation);

            return newService.data as WebService;
        }

        throw Error("Cannot create new service. Status: " + response.status);
    }

    /**
     * fetches all services for the logged-in user
     */
    async getAllServices():Promise<WebService[]> {
        let user:User = await this.getLoggedInUser();
        let response = await request.get(`${user._links.serviceInfos.href}`);

        if (response.status === 200) {
            let webServices:WebServices = response.data._embedded as WebServices;
            webServices.services.forEach(service => {
                service.healthHistory = [];
            });

            console.log(webServices)
            return webServices.services;
        }
        return [];
    }

    private async getLoggedInUser():Promise<User> {
        let userResponse = await request.get(`${localStorage.getItem("user")}`);
        if (userResponse.status === 200) {
            return userResponse.data as User;
        }

        throw Error("Cannot retrieve logged in user. Status: " + userResponse.status);
    }
}

export default UserServiceV1;