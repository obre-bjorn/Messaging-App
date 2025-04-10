import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import { useAuth } from "~/contexts/AuthContext";
import { getChats } from "~/services/messageService";
import { type ChatDetails } from "../types/index"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {fas} from "@fortawesome/free-solid-svg-icons"
import { library, type IconProp } from "@fortawesome/fontawesome-svg-core";
import Layout from "~/components/Layout";

library.add(fas)


export function meta({}: Route.MetaArgs) {
  return [
    { title: "👥ChatApp" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  
  const {user} = useAuth()


  return ( <>
          
          <Layout/>
          {/* <h1>
            Welcome : {user && user.username}
          </h1>
          {loading && <div className="loading"></div>}
          
          {chats && chats.map((chat)=> {
            
            return (<div key ={chat.user.id}>
              <h1>{chat.user.username}</h1>
              <h3>{chat.lastMessage.content}</h3>
            </div>)
          })} */}

  </>)
}
