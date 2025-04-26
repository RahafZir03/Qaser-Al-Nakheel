/* eslint-disable react/prop-types */
export default function PagesHeader({image,title,desc,withDesc}) {
  return (
    <div className=' relative w-full h-[600px] flex justify-center items-center'>
      <img src={image} alt='' className=' absolute top-0 left-0 w-full object-cover h-[600px]'/>
      <div className=' absolute top-0 left-0 w-full h-[600px] bg-black/40 z-10'></div>
      <div className='z-20 text-white'>
        <h1 className='text-4xl font-bold'>{title}</h1>
        {withDesc &&
        <p className='text-xl font-medium'>{desc}</p>
        }
      </div>
    </div>
  )
}
