import { Button, Divider, Flex, Image, Tag } from 'antd'
import { useState } from 'react'
import RatingDetail from '../../Components/RatingStar/RatingDetail'
import { CiShoppingCart } from 'react-icons/ci'
const DetailProduct = () => {
    const listImg = [
        'https://api-ecom.duthanhduoc.com/images/ee1f61e3-2029-43fd-a66d-d746c8fd637c.jpg',
        'https://api-ecom.duthanhduoc.com/images/ee1f61e3-2029-43fd-a66d-d746c8fd637c.jpg',
        'https://api-ecom.duthanhduoc.com/images/ee1f61e3-2029-43fd-a66d-d746c8fd637c.jpg',
        'https://api-ecom.duthanhduoc.com/images/ee1f61e3-2029-43fd-a66d-d746c8fd637c.jpg',
        'https://api-ecom.duthanhduoc.com/images/ee1f61e3-2029-43fd-a66d-d746c8fd637c.jpg',
        'https://api-ecom.duthanhduoc.com/images/ee1f61e3-2029-43fd-a66d-d746c8fd637c.jpg',
        'https://api-ecom.duthanhduoc.com/images/ee1f61e3-2029-43fd-a66d-d746c8fd637c.jpg'

    ]

    const [indexImg, setIndexImg] = useState(0)
    const [count, setCount] = useState(1)

    // const handlePreviousImage = (indexImg) => {

    // }

    // const handleNextImage = (indexImg) => {
    // }

    return (
        <div className="max-w-[1400px] border-2 border-black h-[1000px] mx-auto mt-10">
            <Flex className='p-5 gap-5'>
                <div className='detail_image max-w-[500px] border-2 border-gray-300'>
                    <div className=' aspect-square'>
                        <Image src='https://api-ecom.duthanhduoc.com/images/ee1f61e3-2029-43fd-a66d-d746c8fd637c.jpg' alt='name' />
                    </div>

                    <Flex className='overflow-hidden gap-1 relative'>
                        {listImg.map((item, index) => {
                            if (index < 5) {
                                return (
                                    <div key={index} onMouseEnter={() => setIndexImg(index)}
                                        className={` aspect-square border-2 ${indexImg == index ? 'border-orange-500' : 'border-transparent'}`}>
                                        <Image src={item} alt='name' />
                                    </div>
                                )
                            }

                        })}

                        <Flex className='justify-between absolute w-[100%] bottom-0 '>
                            <Button>
                                Previous
                            </Button>

                            <Button>
                                Next
                            </Button>
                        </Flex>
                    </Flex>
                </div>

                <div className='detail_content'>
                    <p className='text-[20px] font-[500]'>
                        [MÃ FADI5K245 GIẢM 5K ĐƠN 0Đ] ÁO THUN TAY LỠ GẤU194 UNISEX FORM RỘNG TRƠN CHỮ VẢI COTON MỀM MỊN CO DÃN 4 CHIỀU - GAU1994
                    </p>

                    <Flex className='items-center mt-5 gap-5'>
                        <Flex className='gap-2'>
                            <p className='underline  text-[#ee4d2d]'>4.2</p>
                            <RatingDetail rating={4.2} />
                        </Flex>

                        <Divider type='vertical' />

                        <p>6.8K đã bán</p>

                    </Flex>

                    <Flex className='gap-3 items-center my-10'>
                        <p className='line-through text-gray-400'>₫3.490.000</p>

                        <p className='text-[#ee4d2d] text-4xl font-[500]'>₫2.590.000</p>

                        <Tag className='bg-[#ee4d2d] text-white font-[500]'>26% Giảm</Tag>
                    </Flex>

                    <Flex className='items-center gap-5'>
                        <p className='text-[18px] font-[500] text-gray-500'>Số Lượng</p>

                        <Flex>
                            <div onClick={() => setCount(prev => prev - 1 < 1 ? prev = 1 : prev - 1)}
                                className='border-[1px] w-8 aspect-square border-gray-300 text-center text-lg font-bold cursor-pointer'>-</div>
                            <div className='border-[1px] w-12 aspect-auto border-gray-300 text-center text-lg font-bold'>{count}</div>
                            <div onClick={() => setCount(prev => prev + 1)} className='border-[1px] w-8 aspect-square border-gray-300 text-center text-lg font-bold cursor-pointer'>+</div>
                        </Flex>

                        <p className='text-[16px] font-[500] text-gray-600'>73 Sản phẩm có sẵn</p>
                    </Flex>

                    <Flex className='gap-5 my-10'>
                        <Flex className='gap-2 items-center text-lg aspect-auto px-5 py-3 border-[1px] border-[#ee4d2d] text-[#ee4d2d] cursor-pointer bg-[#fdedea] hover:bg-[#fef6f4]'>
                            <CiShoppingCart />
                            <p>Thêm vào giỏ hàng</p>
                        </Flex>

                        <div className='px-5 py-3 border-[#ee4d2d] bg-[#ee4d2d] hover:bg-[#f05e42] text-white cursor-pointer'>
                            Mua Ngay
                        </div>
                    </Flex>
                </div>
            </Flex>
        </div>
    )
}

export default DetailProduct
