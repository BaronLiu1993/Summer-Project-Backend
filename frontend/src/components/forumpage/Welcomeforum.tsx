import Patterned from '../assets/Patterned.svg'
import Blue_Airplane_Final from '../assets/Blue_Airplane_Final.svg'
import Purple_Airplane_Final from '../assets/Purple_Airplane_Final_.svg'

const Welcomeforum = () => {
  return (
    <>
        <div className="mt-[3rem] flex flex-col justify-center items-center relative h-[15rem]">
            <img src= {Patterned} alt="Background" className="absolute border-2 border-gray-200 inset-0 w-full h-full object-cover z-0"/>
            <div className="relative z-10 text-center p-4 rounded-md">
                
            </div>
        </div>

        <div className = 'flex items-center mt-[2rem]'>
            <img className = 'h-[10rem] pl-[5rem]' src = {Blue_Airplane_Final}/>
            <div>
                <h1 className="font-lato text-black text-2xl">Forum Community</h1>
                <div className="font-light text-black text-xs h-[10rem] w-[30rem]">
                We’re lucky to have a vibrant, passionate, creative community. Hailing from around the world, our members host events, lead groups, make videos, build and share Notion templates, teach classes, and so much more. Most importantly, Notion’s Community is a resource for all users. If you’re new or looking to learn more, this page will point you to community resources for anything you need. And if you’re looking to get more involved yourself, you’re in the right place! 🙌​
                </div>
            </div>
            <img  className = 'w-[20rem] h-[20rem]' src = {Purple_Airplane_Final}/>
        </div>
    </>
  )
}

export default Welcomeforum
