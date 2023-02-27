const routes = {
    // COMMON
    auth: "/admin/auth",

    // ADMIN
    home: "/admin",
    postsList: "/admin/posts",
    postDetail: "/admin/posts/:id",
    createPost: "/admin/posts/create",
    accountList: "/admin/accounts",
    accountDetail: "/admin/accounts/:id",
    banner: "/admin/banners",
    themeCategory: "/admin/themes",
    chat: "/admin/chats",
    workerManager: "/admin/worker-manager",
    workerDetail: "/admin/worker-manager/detail",
    notPermission: "/admin/not-permission",
};

export default routes;
