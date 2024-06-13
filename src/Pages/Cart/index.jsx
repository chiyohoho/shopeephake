import { Col, Flex, Row } from "antd"
import Checkbox from "./Components/Checkbox"
import { FaMinus, FaPlus } from "react-icons/fa"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { formatCurrencyVND } from "../../Utilities/Format/formatCurrency"
import { deleteItemInCart, updateCart } from "../../Redux/Features/Purchase/purchaseSlice"

const Cart = () => {
    const dispatch = useDispatch()
    const [checkedItems, setCheckedItems] = useState([])
    const userCart = useSelector(state => state.purchase.userCart.data)

    const handleAddToList = (item, isChecked) => {
        if (isChecked) {
            setCheckedItems(prevCheckedItems => [...prevCheckedItems, item]);
        } else {
            setCheckedItems(prevCheckedItems =>
                prevCheckedItems.filter(checkedItem => checkedItem.product._id !== item.product._id)
            );
        }
    }

    const handleSetCountQuantity = async (isTrue, item) => {
        const newBuyCount = isTrue ? item.buy_count + 1 : Math.max(item.buy_count - 1, 1)

        const data = {
            buy_count: newBuyCount,
            product_id: item.product._id,
        }

        await dispatch(updateCart(data)).unwrap()
    }

    const handleDeleteItemInCart = async (item) => {
        const data = []
        data.push(item._id)

        if (data.length > 0) {
            await dispatch(deleteItemInCart(data)).unwrap()
        }

    }

    return (
        <div className='w-full'>
            <Row className="bg-[#ffffff] py-5 pl-10 shadow-detail text-center px-5">
                <Col span={12} className="flex items-center gap-2 text-[16px]">
                    <Checkbox />
                    <p>Sản phẩm</p>
                </Col>
                <Col className="text-[16px]" span={4}>Đơn giá</Col>
                <Col className="text-[16px]" span={4}>Số lượng</Col>
                <Col className="text-[16px]" span={2}>Số tiền</Col>
                <Col className="text-[16px]" span={2}>Thao tác</Col>
            </Row>

            <div className="my-5 p-5 bg-[#ffffff] shadow-detail flex flex-col gap-5">
                {userCart ?
                    userCart.map((item, index) => {
                        const totalPriceOfProduct = item.buy_count * item.product.price

                        return (
                            <Row key={index} align={'middle'} className="bg-[#ffffff] py-5 pl-10 border-[1px] border-gray-300 text-center">
                                <Col span={12} className="flex items-center gap-5 text-[16px]">
                                    <div>
                                        <Checkbox
                                            isChecked={checkedItems.some(checkedItem => checkedItem.product._id === item.product._id)}
                                            onChange={(isChecked) => handleAddToList(item, isChecked)}
                                        />
                                    </div>
                                    <img className="w-[60px]" src={item.product.image} alt={item.product.name} />
                                    <p className="line-clamp-1 overflow-hidden">{item.product.name}</p>
                                </Col>

                                <Col className="text-[16px] flex flex-wrap justify-center gap-2" span={4}>
                                    <p className="text-gray-400 line-through">{formatCurrencyVND(item.product.price_before_discount)}</p>
                                    <p>{formatCurrencyVND(item.product.price)}</p>
                                </Col>

                                <Col className="text-[16px] flex justify-center items-center" span={4}>
                                    <div onClick={() => {
                                        handleSetCountQuantity(false, item)
                                    }}
                                        className="p-2 border-[1px] border-gray-300 text-[12px]">
                                        <FaMinus />
                                    </div>

                                    <p className="py-[2px] px-4 border-y-[1px] border-gray-300">{item.buy_count}</p>

                                    <div onClick={() => {
                                        handleSetCountQuantity(true, item)
                                    }} className="p-2 border-[1px] border-gray-300 text-[12px]">
                                        <FaPlus />
                                    </div>
                                </Col>

                                <Col className="text-[16px] text-[#fa5030]" span={2}>{formatCurrencyVND(totalPriceOfProduct)}</Col>
                                <Col onClick={() => handleDeleteItemInCart(item)} className="text-[16px] hover:text-[#fa5030] cursor-pointer transition-all duration-200 ease-in-out" span={2}>Xóa</Col>
                            </Row>
                        )
                    })
                    :
                    <div>Loading giỏ hàng</div>
                }

            </div>

            <Row className="bg-[#ffffff] py-5 px-10 shadow-detail">
                <Col span={12} className="flex items-center gap-5 text-[16px]">
                    <Flex className="items-center gap-2">
                        <Checkbox />
                        <p>Chọn tất cả (2)</p>
                    </Flex>

                    <p className="cursor-pointer hover:text-[#fa5030] transition-all duration-200 ease-in-out">Xóa giỏ hàng</p>
                </Col>

                <Col className="text-[16px] flex justify-end items-center gap-3" span={12}>
                    <div className="text-end">
                        <p>Tổng thanh toán (0 sản phẩm): ₫0</p>
                        <p>Tiết kiệm ₫0</p>
                    </div>

                    <button className="bg-[#d84949] hover:bg-[#dc2626] text-white py-3 px-12">MUA HÀNG</button>
                </Col>
            </Row>
        </div>
    )
}

export default Cart
