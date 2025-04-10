import type { GroupWithMembership } from "~/types"


interface Props{
    group : GroupWithMembership

}
function GroupChat({group}: Props) {


  return (
        <li className="list-row w-full">
            <div>
                <img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/4@94.webp"/></div>
            <div>
            <div className='capitalize'>{group.group.name}</div>
            <div className="text-xs font-semibold opacity-60 line-clamp-2">
                {group.group.messages.length > 0 ? `${group.group.messages[0].sender.username}: ${group.group.messages[0].content}`: "No messages"}
            </div>
            </div>
        {/* <div className="text-xs font-extralight">
            {formatChatDate(chat.lastMessage.createdAt)}
        </div> */}
    </li>
  )
}

export default GroupChat