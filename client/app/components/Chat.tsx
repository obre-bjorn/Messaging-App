
import type { ChatDetails } from '~/types'
import { formatChatDate } from '~/utils/Dateformatter'

interface Props {
    chat: ChatDetails
}


function Chat ({chat} : Props) {
  return (
    <li className="list-row w-full">
        <div>
            <img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/4@94.webp"/></div>
        <div>
      <div className='capitalize'>{chat.user.username}</div>
      <div className="text-xs font-semibold opacity-60 line-clamp-2">{chat.lastMessage.content}</div>
    </div>
    <div className="text-xs font-extralight">
      {formatChatDate(chat.lastMessage.createdAt)}
    </div>
  </li>
  )
}

export default Chat