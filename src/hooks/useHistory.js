import { useNavigate, useLocation } from "react-router-dom";
import routes from "../routes";

export default function useHistory(){
    const navigate = useNavigate();
    const location = useLocation();

    const session = () => {
        return true;
    };

    return {
        push: navigate,
        go: navigate,
        goBack: () => navigate(-1),
        goForward: () => navigate(1),
        session,
        location,
    };
}