import {useState} from 'react'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { Button } from './ui/button'

const MessageBox = () => {
   const [message,setMessage] =useState<string>("")
   const [delay,setDelay] =useState<number>(5)
   const [isSending,setIsSending] =useState<boolean>(false)
   const [timerId,setTimerId] = useState<NodeJS.Timeout | null>(null)
   const [sentMessage,setSentMessage] =useState<string>("")
    
   const handleSend=()=>{
    setIsSending(true)

    const id = setTimeout(()=>{
        setSentMessage(message)
        setMessage("")
        setIsSending(false)
    },delay*1000)

    setTimerId(id)

   }
   const handleCancel=()=>{
    if(timerId) clearTimeout(timerId)
    setIsSending(false)
   }
  return (
    <div className='w-90  mx-auto mt-20 p-6 border rounded-lg shadow-lg bg-white space-y-4'>
      <h2 className='ml-15 text-2xl font-bold text-gray-800'>Dm Delay Button</h2>

      <Textarea placeholder="Type your message..." value={message} onChange={(e)=> setMessage(e.target.value)}/>

      <Input type="number" placeholder="Delay in seconds" value={delay} onChange={(e)=> setDelay(Number(e.target.value))} disabled = {isSending}/>

      {!isSending ? (<Button className='w-full' onClick={handleSend}> Send with delay</Button>):(<Button className='w-full' variant="destructive" onClick={handleCancel}> Cancel Sending</Button>)}
      {sentMessage &&(
        <div className="bg-green-100 border rounded p-5 text-green-900">
        <p className="font-semibold">Message sent:</p>
        <p>{sentMessage}</p>
        </div>
      )}
    </div>
  )
}

export default MessageBox
