import UserServiceV1 from "./user/UserServiceV1";
import HealthHistoryServiceV1 from "./healthstatus/HealthHistoryServiceV1";

class ServiceFactory {
    private static _userService:UserServiceV1;
    private static _healthHistoryService:HealthHistoryServiceV1;

    public static getUserService():UserServiceV1 {
        if (this._userService === undefined) {
            this._userService = new UserServiceV1();
        }

        return this._userService;
    }

    public static getHealthHistoryService():HealthHistoryServiceV1 {
        if (this._healthHistoryService === undefined) {
            this._healthHistoryService = new HealthHistoryServiceV1();
        }

        return this._healthHistoryService;
    }
}

export default ServiceFactory;