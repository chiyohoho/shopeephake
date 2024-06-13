import { Link } from "react-router-dom"
import { formatCurrencyVND } from "../../../Utilities/Format/formatCurrency"
import { formatSold } from "../../../Utilities/Format/formatSold"
import RatingStar from "../../../Components/RatingStar/RatingSmall"
import { Flex } from "antd"


const ItemCardDetail = ({ item }) => {
    return (
        <Link to={`/detail/${encodeURIComponent(item.name)}-i-${item._id}`}>
            <div className="w-[200px] rounded-sm overflow-hidden shadow-lg hover:translate-y-[-5px] transition-transform duration-300 ease-in-out cursor-pointer"
            >
                <div className="overflow-hidden aspect-square">
                    <img className="w-[100%]" src={item.images[0]} alt={item.name} />
                </div>

                <div className="p-2">
                    <p className="item_name line-clamp-2 overflow-hidden">
                        {item.name}
                    </p>


                    <Flex className="flex-wrap items-center gap-1 my-2">
                        <p className="item_price_original text-gray-500 line-through">
                            {formatCurrencyVND(item.price_before_discount)}
                        </p>

                        <p className="item_price_sale text-orange-500">
                            {formatCurrencyVND(item.price)}
                        </p>
                    </Flex>

                    <div className="items-center gap-2 justify-end my-2">
                        <RatingStar rating={item.rating} />
                        <p>{formatSold(item.sold)} đã bán</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ItemCardDetail
