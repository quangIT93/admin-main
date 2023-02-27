import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const acceptedUrlForWorker = [
    "/admin/posts/create",
    "/admin/worker-manager/detail",
];

const usePermission = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const role = sessionStorage.getItem("role");

        if (
            !sessionStorage.getItem("access-token") ||
            !sessionStorage.getItem("refresh-token") ||
            (role !== "1" && role !== "2")
        ) {
            sessionStorage.clear();
            navigate("/admin/auth");
        }

        if (role === "2") {
            if (!acceptedUrlForWorker.includes(window.location.pathname)) {
                navigate("/admin/not-permission");
            }
        }
    }, []);
};

export default usePermission;
