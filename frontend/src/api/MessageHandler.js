import Axios from "axios"

export const GetMessage = (p) => {
    return Axios.get(`http://localhost:8080/hello-world/${p}`);
};
