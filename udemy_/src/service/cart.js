import axios from "axios";

export default {
  getcartitem(userid) {
    return axios.get("/cart/" + userid);
  },
  deletecartitem(userid, catid) {
    return axios.delete("/cart/" + userid + "/" + catid);
  },
  postcartitem(data) {
    return axios.post("/cart", data);
  }
};
