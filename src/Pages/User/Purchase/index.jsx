import { Flex } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPurchaseData } from "../../../Redux/Features/Purchase/purchaseSlice"
import { formatCurrencyVND } from "../../../Utilities/Format/formatCurrency"
import { Link, useSearchParams } from "react-router-dom"

const Purchase = () => {
    const dispatch = useDispatch()
    const userDataPurchase = useSelector(state => state.purchase.userPurchase.data)
    const [searchParams, setSearchParams] = useSearchParams()
    const statusParam = searchParams.get('status') || '0'
    const [tab, setTab] = useState(parseInt(statusParam, 10))
    const position = parseFloat(((100 / 6) * tab).toFixed(1))

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchPurchaseData(tab)).unwrap()
        }
        fetchData()
    }, [dispatch, tab])

    const handleFetchDataPurchase = (status) => {
        if (tab === status) {
            return
        } else {
            setTab(status)
            setSearchParams({ status })
        }
    }

    return (
        <div className="w-full overflow-hidden">
            <div className="w-full overflow-scroll">
                <Flex className="py-4 justify-between text-center shadow-detail relative">
                    <div onClick={() => handleFetchDataPurchase(0)} className="w-1/6 cursor-pointer">
                        Tất cả
                    </div>

                    <div onClick={() => handleFetchDataPurchase(1)} className="w-1/6 cursor-pointer">
                        Chờ xác nhận
                    </div>

                    <div onClick={() => handleFetchDataPurchase(2)} className="w-1/6 cursor-pointer">
                        Chờ lấy hàng
                    </div>

                    <div onClick={() => handleFetchDataPurchase(3)} className="w-1/6 cursor-pointer">
                        Đang giao
                    </div>

                    <div onClick={() => handleFetchDataPurchase(4)} className="w-1/6 cursor-pointer">
                        Đã giao
                    </div>

                    <div onClick={() => handleFetchDataPurchase(5)} className="w-1/6 cursor-pointer">
                        Đã hủy
                    </div>

                    <div className={`absolute h-[2px] w-1/6 bg-orange-500 bottom-0 transition-all ease-in-out duration-300`}
                        style={{ left: `${position}%` }}>
                    </div>
                </Flex>

                <Flex className="flex-col gap-5 mt-5">
                    {userDataPurchase ?
                        userDataPurchase.map((item, index) => {
                            return (
                                <div className="w-full shadow-detail p-5" key={index}>
                                    <Flex className="gap-2 justify-between">
                                        <div className="max-w-[80px] max-h-[80px] w-full">
                                            <img className="w-full h-full" src={item.product.image} alt={item.product.name} />
                                        </div>

                                        <Link className="hover:text-black float-left w-full" to={`/detail/${encodeURIComponent(item.product.name)}-i-${item.product._id}`}>
                                            <p className="line-clamp-1 overflow-hidden mb-2">{item.product.name}</p>
                                            <p>x{item.buy_count}</p>
                                        </Link>

                                        <Flex className=" flex-col">
                                            <p className="line-through text-gray-500">{formatCurrencyVND(item.price_before_discount)}</p>
                                            <p className="text-[#fa5030]">{formatCurrencyVND(item.price)}</p>
                                        </Flex>
                                    </Flex>

                                    <div className="float-right">
                                        Tổng giá tiền : <p className="inline-block text-[#fa5030] text-[22px] font-[500]">{formatCurrencyVND(item.price * item.buy_count)}</p>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className="text-center w-full mt-20 text-[24px] font-[500]">
                            Không có sản phẩm nào
                        </div>
                    }
                </Flex>
            </div>
        </div>
    )
}

export default Purchase
