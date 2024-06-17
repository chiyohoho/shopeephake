import { Divider, Flex, Tag } from 'antd'
import { useEffect, useState } from 'react'
import RatingDetail from '../../Components/RatingStar/RatingDetail'
import { CiShoppingCart } from 'react-icons/ci'
import { formatSold } from '../../Utilities/Format/formatSold'
import { useNavigate, useParams } from 'react-router-dom'
import { formatCurrencyVND } from '../../Utilities/Format/formatCurrency'
import { calculatePercentDiscount } from '../../Utilities/Format/calculatePercent'
import CarouselDetail from './Components/carousel'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataDetail, fetchProducts } from '../../Redux/Features/Products/productSlice'
import ItemCardDetail from './Components/card'
import { showToast } from '../../Components/Toast'
import { addToCart } from '../../Redux/Features/Purchase/purchaseSlice'

const DetailProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const accessToken = useSelector(state => state.auth.accessToken)
    const dataDetail = useSelector(state => state.products.productDetail)
    const listProduct = useSelector(state => state.products.listProduct)
    const [count, setCount] = useState(1)


    const productParams = useParams()
    const productID = productParams.productName.split('-i-').pop()
    const [sameProducts, setSameProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchDataDetail(productID)).unwrap()
                await dispatch(fetchProducts()).unwrap()
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } catch (error) {
                console.error('Failed to fetch product data:', error)
            }
        }

        fetchData()
    }, [dispatch, productID])

    useEffect(() => {
        if (dataDetail && listProduct.length > 0) {
            const filteredProducts = listProduct.filter(product => product.category._id === dataDetail.category._id)
            setSameProducts(filteredProducts)
        }
    }, [dataDetail, listProduct])



    const handleRedirect = async (action) => {
        const dataSubmit = { product_id: dataDetail._id, buy_count: count }

        if (accessToken) {
            if (action === 'cart') {
                await dispatch(addToCart(dataSubmit)).unwrap()
            } else {
                await dispatch(addToCart(dataSubmit)).unwrap()
                localStorage.setItem('purchasedProduct', JSON.stringify(dataDetail))
                navigate('/cart')
            }
        } else {
            showToast('error', 'Vui lòng đăng nhập')
        }
    }

    return (
        <div className="max-w-[1400px] mx-auto mt-10 px-5">
            <Flex className='p-5 gap-5 max-md:flex-col max-md:items-center shadow-detail'>
                {dataDetail && <CarouselDetail dataDetail={dataDetail} />}

                {dataDetail &&
                    <div className='detail_content max-w-[100%] px-5'>
                        <p className='text-[20px] font-[500]'>
                            {dataDetail.name}
                        </p>

                        <Flex className='items-center mt-5 gap-5'>
                            <Flex className='gap-2'>
                                <p className='underline  text-[#ee4d2d]'>{dataDetail.rating}</p>
                                <RatingDetail rating={dataDetail.rating} />
                            </Flex>

                            <Divider type='vertical' />

                            <div>{formatSold(dataDetail.sold)} <p className='text-gray-500 inline-block'>Đã bán</p></div>
                        </Flex>

                        <Flex className='flex-wrap gap-3 items-center my-10'>
                            <p className='line-through text-gray-400'>{formatCurrencyVND(dataDetail.price_before_discount)}</p>

                            <p className='text-[#ee4d2d] text-4xl font-[500]'>{formatCurrencyVND(dataDetail.price)}</p>

                            <Tag className='bg-[#ee4d2d] text-white font-[500]'>{calculatePercentDiscount(dataDetail.price_before_discount, dataDetail.price)}% Giảm</Tag>
                        </Flex>

                        <Flex className='flex-wrap items-center gap-5'>
                            <p className='text-[18px] font-[500] text-gray-500'>Số Lượng</p>

                            <Flex>
                                <div onClick={() => setCount(prev => prev - 1 < 1 ? prev = 1 : prev - 1)}
                                    className='border-[1px] w-8 aspect-square border-gray-300 text-center text-lg font-bold cursor-pointer'>-</div>
                                <div className='border-y-[1px] w-12 aspect-auto border-gray-300 text-center text-lg font-[500]'>{count}</div>
                                <div onClick={() => setCount(prev => prev + 1)} className='border-[1px] w-8 aspect-square border-gray-300 text-center text-lg font-bold cursor-pointer'>+</div>
                            </Flex>

                            <p className='text-[16px] font-[500] text-gray-600'>{dataDetail.quantity} sản phẩm có sẵn</p>
                        </Flex>

                        <Flex className='flex-wrap gap-5 my-10'>
                            <Flex onClick={() => handleRedirect('cart')} className='gap-2 items-center text-lg aspect-auto px-5 py-3 border-[1px] border-[#ee4d2d] text-[#ee4d2d] cursor-pointer bg-[#fdedea] hover:bg-[#fef6f4]'>
                                <CiShoppingCart />
                                <p>Thêm vào giỏ hàng</p>
                            </Flex>

                            <div onClick={() => handleRedirect('buy')} className='flex items-center justify-center px-5 py-3 border-[#ee4d2d] bg-[#ee4d2d] hover:bg-[#f05e42] text-white cursor-pointer'>
                                Mua Ngay
                            </div>
                        </Flex>
                    </div>
                }
            </Flex>

            <div className='mt-10 shadow-detail p-5'>
                <p className='text-[24px]'>Mô tả sản phẩm</p>

                {dataDetail && <div className='text-[16px] leading-10 mt-5' dangerouslySetInnerHTML={{ __html: dataDetail.description }} />}
            </div>

            <div className='mt-10 shadow-detail p-5'>
                <p className='text-[20px] font-[400] text-gray-400'>CÓ THỂ BẠN CŨNG THÍCH</p>

                <div className="mt-10 flex flex-wrap gap-2">
                    {sameProducts &&
                        sameProducts.map((item) => (
                            <ItemCardDetail key={item._id} item={item} />
                        ))}
                </div>

            </div>
        </div>
    )
}

export default DetailProduct
