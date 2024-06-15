import { Button, Col, Flex, Popover, Row, Skeleton } from "antd";
import Checkbox from "./Components/Checkbox";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState, useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrencyVND } from "../../Utilities/Format/formatCurrency";
import { deleteCart, deleteItemInCart, purchaseInCart, updateCart } from "../../Redux/Features/Purchase/purchaseSlice";
import { calculateDiscount, calculateTotal } from "../../Utilities/Format/calculateDiscount";
import { Link } from "react-router-dom";
import { showToast } from "../../Components/Toast";

const Cart = () => {
    const dispatch = useDispatch()
    const [checkedItems, setCheckedItems] = useState([])
    const [checkAll, setCheckAll] = useState(false)
    const userCart = useSelector(state => state.purchase.userCart.data)

    const [open, setOpen] = useState(false)
    const hide = () => {
        setOpen(false)
    }
    const handleOpenChange = newOpen => {
        setOpen(newOpen)
    }

    useEffect(() => {
        const purchasedProduct = JSON.parse(localStorage.getItem('purchasedProduct'))

        if (purchasedProduct && userCart?.length > 0) {
            const checkedProduct = userCart.find(item => item.product._id === purchasedProduct._id)
            if (checkedProduct) {
                setCheckedItems(prevChecked => [...prevChecked, checkedProduct])
                localStorage.removeItem('purchasedProduct')
            }
        }
    }, [userCart])

    useEffect(() => {
        if (userCart && userCart.length > 0) {
            setCheckAll(checkedItems.length === userCart.length)
        }
    }, [checkedItems, userCart])

    const handleAddToList = (item, isChecked) => {
        if (isChecked) {
            setCheckedItems(prevCheckedItems => [...prevCheckedItems, item])
        } else {
            setCheckedItems(prevCheckedItems =>
                prevCheckedItems.filter(checkedItem => checkedItem.product._id !== item.product._id)
            )
        }
    }

    const handleCheckAll = () => {
        if (checkAll) {
            setCheckedItems([])
        } else if (userCart) {
            setCheckedItems(userCart)
        }
        setCheckAll(!checkAll)
    }

    const handleSetCountQuantity = async (isTrue, item) => {
        const newBuyCount = isTrue ? item.buy_count + 1 : Math.max(item.buy_count - 1, 1)
        const data = { buy_count: newBuyCount, product_id: item.product._id }
        await dispatch(updateCart(data)).unwrap()

        setCheckedItems(prevCheckedItems =>
            prevCheckedItems.map(checkedItem =>
                checkedItem.product._id === item.product._id
                    ? { ...checkedItem, buy_count: newBuyCount }
                    : checkedItem
            )
        )
    }

    const handleDeleteItemInCart = async (item) => {
        const data = [item._id]
        await dispatch(deleteItemInCart(data)).unwrap()
        setCheckedItems(prevCheckedItems =>
            prevCheckedItems.filter(checkedItem => checkedItem.product._id !== item.product._id)
        )
    }

    const handleDeleteItemChecked = async () => {
        if (checkedItems?.length > 0) {
            const data = checkedItems.map(item => item._id)
            await dispatch(deleteCart(data)).unwrap()
        }
    }

    const handleBuyProduct = async () => {
        if (checkedItems.length < 1) {
            showToast('error', 'Vui lòng chọn sản phẩm muốn thanh toán')
        } else {
            const data = checkedItems.map(item => {
                return {
                    product_id: item.product._id,
                    buy_count: item.buy_count
                }
            })
            await dispatch(purchaseInCart(data)).unwrap()
        }
    }

    return (
        <div className='w-full'>
            {userCart?.length > 0 ?
                <div className="relative">
                    <Row className="bg-[#ffffff] py-5 pl-10 shadow-detail text-center px-5">
                        <Col span={12} className="flex items-center gap-2 text-[16px]">
                            <Checkbox checked={checkAll} onChange={handleCheckAll} />
                            <p>Sản phẩm</p>
                        </Col>
                        <Col className="text-[16px]" span={4}>Đơn giá</Col>
                        <Col className="text-[16px]" span={4}>Số lượng</Col>
                        <Col className="text-[16px]" span={2}>Số tiền</Col>
                        <Col className="text-[16px]" span={2}>Thao tác</Col>
                    </Row>

                    <div className="my-5 p-5 bg-[#ffffff] shadow-detail flex flex-col gap-5">
                        {userCart ? userCart.map((item, index) => {
                            const totalPriceOfProduct = item.buy_count * item.product.price
                            const isChecked = checkedItems.some(checkedItem => checkedItem.product._id === item.product._id)

                            return (
                                <Row key={index} align={'middle'} className="bg-[#ffffff] py-5 pl-10 border-[1px] border-gray-300 text-center">
                                    <Col span={12} className="flex items-center gap-5 text-[16px]">
                                        <div>
                                            <Checkbox
                                                checked={isChecked}
                                                onChange={(e) => handleAddToList(item, e.target.checked)}
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
                                        <div onClick={() => handleSetCountQuantity(false, item)} className="p-2 border-[1px] border-gray-300 text-[12px]">
                                            <FaMinus />
                                        </div>
                                        <p className="py-[2px] px-4 border-y-[1px] border-gray-300">{item.buy_count}</p>
                                        <div onClick={() => handleSetCountQuantity(true, item)} className="p-2 border-[1px] border-gray-300 text-[12px]">
                                            <FaPlus />
                                        </div>
                                    </Col>

                                    <Col className="text-[16px] text-[#fa5030]" span={2}>{formatCurrencyVND(totalPriceOfProduct)}</Col>

                                    <Col span={2}>
                                        <p onClick={() => handleDeleteItemInCart(item)}
                                            className="text-[16px] hover:text-[#fa5030] cursor-pointer transition-all duration-200 ease-in-out inline">
                                            Xóa
                                        </p>
                                    </Col>
                                </Row>
                            )
                        }) :
                            <Flex className="flex-col gap-10">
                                <Skeleton active />
                                <Skeleton active />
                            </Flex>}
                    </div>

                    <Row className="bg-white py-5 px-10 shadow-detail sticky bottom-0 z-20">
                        <Col span={12} className="flex items-center gap-5 text-[16px]">
                            <Flex className="items-center gap-2">
                                <Checkbox checked={checkAll} onChange={handleCheckAll} />
                                <p>Chọn tất cả ({userCart?.length || 0})</p>
                            </Flex>
                            <Popover open={open} onOpenChange={handleOpenChange}
                                content={checkedItems?.length < 1 ? 'Không có sản phẩm nào được chọn' :
                                    <Flex className="gap-2 justify-end">
                                        <Button onClick={hide}>Hủy bỏ</Button>
                                        <Button onClick={() => {
                                            hide()
                                            handleDeleteItemChecked()
                                        }} danger>Đồng ý</Button>
                                    </Flex>} title={checkedItems?.length < 1 ? 'Không thể xóa' : 'Bạn sẽ không thể khôi phục sau khi xóa'} trigger="click">

                                <Button danger>Xóa các sản phẩm đã chọn</Button>
                            </Popover>
                        </Col>
                        <Col className="text-[16px] flex justify-end items-center gap-3" span={12}>
                            <div className="text-end">
                                <div className="font-[500]">Tổng thanh toán ({checkedItems.length} sản phẩm): <p className="inline-block text-[20px] text-[#fa5030]">{calculateTotal(checkedItems)}</p></div>
                                <div className="text-gray-500">Tiết kiệm: <p className="font-[500] inline-block text-[#fa5030]">{calculateDiscount(checkedItems)}</p></div>
                            </div>
                            <button onClick={handleBuyProduct} className="bg-[#d84949] hover:bg-[#dc2626] text-white py-3 px-12">MUA HÀNG</button>
                        </Col>
                    </Row>
                </div >
                :
                <Flex className="items-center justify-center flex-col gap-3 mt-[-70px]">
                    <img className="w-1/3" src="https://i.imgur.com/Br60EOl.png" alt="empty_cart" />
                    <p className="text-[20px] font-[500] mt-[-50px]">Giỏ hàng của bạn hiện đang trống</p>
                    <Link to={'/'} className="py-3 px-8 text-white bg-[#fa5030] rounded-md hover:text-white">Tìm và mua sản phẩm</Link>
                </Flex>
            }
        </div >
    )
}

export default Cart
