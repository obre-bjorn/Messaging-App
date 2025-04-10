import { useState, useEffect } from "react"
import GroupListing from "~/components/GroupListing";
import { getGroupChats } from "~/services/groupService";

import type { GroupDetails, GroupWithMembership } from "~/types"


function Groups() {

    const [loading,setLoading] = useState(false)
    const [groups, setGroups]  = useState<null | GroupWithMembership[]>(null)


    useEffect(() => {
        
        const fetchGroupChats = async () => {
            

            setLoading(true)

            const groupChats = await getGroupChats()

            setLoading(false)

            setGroups(groupChats.groups)
            
        }

        fetchGroupChats()

    }, []);

  return (
    <>
            <div className="m-4 border-b-2">Chats</div>

            {loading && <div className="loading"></div>}

            {groups && <GroupListing groups={groups}/> } 
        </>
  )
}

export default Groups