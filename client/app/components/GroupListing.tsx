import type { group } from "console"
import type { GroupDetails, GroupWithMembership } from "~/types"
import GroupChat from "./GroupChat"


interface Props{

    groups : GroupWithMembership[]
}

function GroupListing({groups} : Props) {


    return (
        <ul className="list bg-base-100 rounded-box shadow-md">

            {groups && groups.map(group => <GroupChat key={group.groupId} group={group}/>)

        }
  
    </ul>
  )
}

export default GroupListing