import {request} from "../../Config";
import HealthHistory from "../../model/HealthHistory";
import WebService from "../../model/WebService";

/**
 * @author Varun Shrivastava
 */
class HealthHistoryServiceV1 {

    /**
     * fetches the health history for the given service
     * @param size
     * @param page
     * @param sort
     */
    async fetchHealthHistory(service:WebService, size:number = 20, page:number = 1, sort:string = "created,asc"): Promise<HealthHistory> {
        let response = await request.get(`/health-history/search/findByServiceInfo?service=/${service.id}&page=${page}&size=${size}&sort=${sort}`)
        if (response.status === 200) {
            console.log("Health History: ", response.data._embedded);
            return response.data._embedded as HealthHistory;
        }

        return {healthhistory: []}
    }

}

export default HealthHistoryServiceV1;