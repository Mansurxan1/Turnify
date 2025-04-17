import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { getThemeStyles } from '../components/themeConfig';

const Search = () => {
    const theme = useSelector((state: RootState) => state.telegram.theme)

    const styles = getThemeStyles(theme);

  return (
    <div className={`${theme === "dark" ? "bg-[#0E1621] text-white" : "bg-[#D2D2D2] text-black"} h-screen max-w-[450px] mx-auto min-w-[450px]:pt-4`}>
        <form action="" className={`px-5 py-4 w-full shadow-[0px_0.33px_0.33px_0px_rgb(118,140,158,0.25)] ${styles.searchHeader}`}>
            <div className={`rounded-[8px] flex items-center px-3 ${styles.searchInputBg}`}>
                <span>🔍</span>
                <input type="text" className={`w-full py-2 px-2 outline-none rounded-full font-inter text-sm font-normal tracking-[0.2px] leading-5 text-[#768C9E] placeholder:font-inter ${styles.searchInputBg}`} placeholder='Challenge va foydalanuvchilarni izlash'/>
                <button>&#8652;</button>
            </div>
        </form>
        <div className='mx-5 my-2 flex flex-col gap-1'>
            <div className={`rounded-xl h-auto ${styles.searchCardBg}`}>
                <div className='p-5 flex flex-col gap-5'>
                    <div className='flex gap-3'>
                        <div className='rounded-md flex justify-center items-center'>
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/049/855/296/small_2x/nature-background-high-resolution-wallpaper-for-a-serene-and-stunning-view-photo.jpg" className='w-[50px] h-[50px] rounded-md' alt="" />
                        </div>
                        <div className='flex flex-col gap-3 items-center'>
                            <div className='flex gap-1'>
                                <span>&#128226;</span>
                                <p className={`font-inter font-bold ${styles.textColor}`}>Yo’ldagilar loyihasi</p>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <img src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=" className='rounded-full w-[16px] h-[16px]' alt="" />
                                <p className={`font-inter font-medium text-[12px] ${styles.textColor}`}>Muhammad Said</p>
                                <span className='text-[12px] font-medium text-[#768C9E]'>(Ega)</span>
                            </div>
                        </div>
                        <div className='flex-1 flex justify-end items-start'>
                            <button className='text-[#768C9E]'>&#10247;</button>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-1'>
                            <span>📄</span>
                            <p
                             className={`font-inter font-bold text-sm ${styles.textColor}`}>3</p>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <span>👁️</span>
                            <p
                             className={`font-inter font-bold text-sm ${styles.textColor}`}>700</p>
                        </div>
                        <div>
                            <p
                             className={`font-inter font-bold text-sm ${styles.textColor}`}><span>&#128101;</span> 700K</p>
                        </div>
                        <div>
                            <p className={`font-inter font-bold text-sm ${styles.textColor}`}><span className='text-[#FD9400]'>&#9733;</span> 4.5</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.searchCardBg} rounded-xl p-5 flex`}>
                <div className='w-[50px] h-[50px] rounded-full mr-3'>
                    <img src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=" alt="" className='w-full h-full rounded-full'/>
                </div>
                <div className='flex-1 flex flex-col'>
                    <h3 className={`${styles.textColor} font-inter font-bold`}>Muhammad Said <span className='bg-custom-gradient px-1 text-white'> &#10004; </span></h3>
                    <div className='flex items-center gap-2'>
                        <a href="" className='text-[12px] font-inter  text-[#768C9E]'>@Muhammad_Said</a>
                        <span className='text-[#52DAFF]'>&#9992;</span>
                    </div>
                </div>
                <div>
                    <button className='text-[#768C9E]'>&#10247;</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search