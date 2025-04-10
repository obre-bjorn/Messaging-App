import { type RouteConfig, index, route,layout } from "@react-router/dev/routes";

export default [
    layout("./components/auth/ProtectedRoute.tsx",[
        index("./routes/home.tsx"),
        layout("./components/Layout.tsx",[
            route("chats","./routes/Chats.tsx"),
            route("groups","./routes/Groups.tsx"),
            route("profile","./routes/Profile.tsx")
        ])
    ]),

    route("/login", "./routes/login.tsx"),
    route("/register", "./routes/register.tsx"),
] satisfies RouteConfig;
