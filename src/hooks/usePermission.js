import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const acceptedUrlForWorker = [
    "/admin/posts/create",
    "/admin/worker-manager/detail",
];

const usePermission = (callback = null) => {
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
            if (!window.location.pathname.startsWith("/admin/posts") && !acceptedUrlForWorker.includes(window.location.pathname)) {
                console.log("Not permission");
                navigate("/admin/not-permission");
            }
        }

        if (callback) {
            callback();
        }
    }, []);
};

export default usePermission;
