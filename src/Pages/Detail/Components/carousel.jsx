import { Flex, Image } from 'antd'
import { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

const CarouselDetail = ({ dataDetail }) => {

    const [indexImg, setIndexImg] = useState(0)
    const [imageShow, setImageShow] = useState(dataDetail.image)
    const [startIndex, setStartIndex] = useState(0)

    useEffect(() => {
        setIndexImg(0)
        setImageShow(dataDetail.image)
        setStartIndex(0)
    }, [dataDetail])

    const visibleImages = dataDetail.images.slice(startIndex, startIndex + 5)

    const handleNext = () => {
        if (startIndex + 5 < dataDetail.images.length) {
            setStartIndex(startIndex + 1)
        }
    }

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1)
        }
    }
    return (
        <div className='detail_image max-w-[500px]'>
            <div className=' aspect-square'>
                <Image src={imageShow} alt={dataDetail.name} />
            </div>

            <Flex className=' gap-1 mt-[-10px] w-full relative border-[1px] border-gray-300'>
                {visibleImages.map((item, index) => {
                    return (
                        <div key={index} onMouseEnter={() => {
                            setIndexImg(startIndex + index)
                            setImageShow(item)
                        }}
                            className={`aspect-auto w-full h-full border-2 ${indexImg == startIndex + index ? 'border-orange-500' : 'border-transparent'} overflow-hidden`}>
                            <Image className={`w-full h-full object-cover`} src={item} alt='name' />
                        </div>
                    )
                })}

                <Flex onClick={handlePrev} className='absolute bottom-0 left-0 text-[24px] text-gray-700 bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out h-[100%] items-center cursor-pointer'>
                    <FaAngleLeft />
                </Flex>

                <Flex onClick={handleNext} className='absolute bottom-0 right-0 text-[24px] text-gray-700 bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out h-[100%] items-center cursor-pointer'>
                    <FaAngleRight />
                </Flex>
            </Flex>
        </div>
    )
}

export default CarouselDetail
