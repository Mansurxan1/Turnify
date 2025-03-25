import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const Search = () => {
    const theme = useSelector((state: RootState) => state.telegram.theme)
  return (
    <div className={`${theme === "dark" ? "bg-[#242F3D] text-white" : "bg-[#F1F1F1] text-black"} h-screen`}>
        <form action="" className='px-5 py-4 w-full shadow-[0px_0.33px_0.33px_0px_rgb(118,140,158,0.25)]'>
            <input type="text" className='w-full bg-white py-2 px-2 outline-none rounded-full font-inter text-sm font-normal tracking-[0.2px] leading-5 text-[#768C9E]' placeholder='Challenge va foydalanuvchilarni izlash'/>
        </form>
        <div className='mx-5 my-2 bg-white rounded-xl h-auto'>
            <div className='p-5 flex flex-col gap-5'>
                <div className='flex justify-between gap-3'>
                    <div className='rounded-md'>
                        <img src="" className='w-[50px] h-[50px] rounded-md' alt="" />
                    </div>
                    <div className='flex flex-col gap-2 items-center'>
                        <div>
                            <p className='font-inter font-bold'>Yo’ldagilar loyihasi</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <img src="" className='rounded-full w-[16px] h-[16px]' alt="" />
                            <p className='font-inter font-medium text-[12px]'>Muhammad Said</p>
                            <span className='text-[12px] font-medium text-[#768C9E]'>(Ega)</span>
                        </div>
                    </div>
                    <div>
                        <button>...</button>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div>
                        <span className='font-inter font-bold text-sm'>3</span>
                    </div>
                    <div>
                        <span className='font-inter font-bold text-sm'>700</span>
                    </div>
                    <div>
                        <span className='font-inter font-bold text-sm'>700K</span>
                    </div>
                    <div>
                        <span className='font-inter font-bold text-sm'>4.5</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search