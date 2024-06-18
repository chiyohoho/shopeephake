import { Link } from 'react-router-dom'
import { formatCurrencyVND } from '../../Utilities/Format/formatCurrency'
import RatingStar from '../RatingStar/RatingSmall'
import { formatSold } from '../../Utilities/Format/formatSold'
import { Flex } from 'antd'

const ItemCard = ({ item }) => {
    return (
        <Link className='hover:text-black w-full h-full' to={`/detail/${encodeURIComponent(item.name)}-i-${item._id}`}>
            <div className="rounded-sm h-full overflow-hidden shadow-lg hover:translate-y-[-2px] transition-transform duration-300 ease-in-out cursor-pointer "
            >
                <div className="overflow-hidden aspect-square">
                    <img className="w-[100%]" src={item.images[0]} alt={item.name} />
                </div>

                <div className="p-2">
                    <p className="item_name line-clamp-2 overflow-hidden">
                        {item.name}
                    </p>


                    <Flex className="flex-wrap text-[14px] font-[500] items-center min-h-[40px]">
                        <p className="item_price_original text-gray-500 line-through mr-1">
                            {formatCurrencyVND(item.price_before_discount)}
                        </p>

                        <p className="item_price_sale text-orange-500">
                            {formatCurrencyVND(item.price)}
                        </p>
                    </Flex>

                    <div className="items-center gap-2 justify-end">
                        <RatingStar rating={item.rating} />
                        <p>{formatSold(item.sold)} đã bán</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ItemCard
