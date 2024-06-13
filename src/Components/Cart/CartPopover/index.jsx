import { Flex } from "antd"
import { useSelector } from "react-redux"
import { formatCurrencyVND } from "../../../Utilities/Format/formatCurrency"
import './styles.scss'
import { Link } from "react-router-dom"

const CartPopover = () => {
    const userCart = useSelector(state => state.purchase.userCart.data)

    return (
        <div className="w-[350px] text-[20px] ">
            {userCart?.length > 0 ?
                <div className="h-fit">
                    <Flex className="flex-col gap-3 pr-2 max-h-[300px] overflow-y-auto">
                        {userCart.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Flex className="gap-2 justify-between">
                                        <div className="max-w-[40px] max-h-[40px]">
                                            <img className="w-full h-full" src={item.product.image} alt={item.product.name} />
                                        </div>

                                        <div className="hover:text-black w-full" >
                                            <p className="line-clamp-1 overflow-hidden text-[14px]">{item.product.name}</p>
                                            <p className="text-[14px]">x{item.buy_count}</p>
                                        </div>

                                        <Flex className="gap-2">
                                            <p className="text-[#fa5030] text-[14px]">{formatCurrencyVND(item.price)}</p>
                                        </Flex>
                                    </Flex>
                                </div>
                            )
                        })}
                    </Flex>

                    <div className="mt-7 mb-3 text-end text-[15px]">
                        <Link to={'/cart'} className="hover:text-white rounded-sm text-white py-2 px-5 bg-[#fa5030]">
                            Xem giỏ hàng
                        </Link>
                    </div>
                </div>

                :
                <img className="w-[100%]" src="https://i.imgur.com/eE7vhnQ.png" alt="cart" />
            }

        </div>
    )
}

export default CartPopover
