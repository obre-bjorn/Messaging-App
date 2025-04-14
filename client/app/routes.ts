import { type RouteConfig, index, route,layout } from "@react-router/dev/routes";

export default [
    layout("./components/auth/ProtectedRoute.tsx",[
        layout("./components/Layout.tsx",[
            
            index("./routes/RedirectToChats.tsx"), 
            
            // Chats
            route("chats", "./routes/Chats.tsx", [
                route(":chatId", "./routes/Conversation.tsx")
            ]),

            // Groups
            route("groups","./routes/Groups.tsx", [
                route(":groupId","./routes/GroupConversation.tsx"),
            ]),
                        
            route("profile","./routes/Profile.tsx")
        ])
    ]),

    route("/login", "./routes/login.tsx"),
    route("/register", "./routes/register.tsx"),
] satisfies RouteConfig;

// 0758735798