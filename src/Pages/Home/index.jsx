import { Col, Flex, Row } from "antd"
import SideBar from "../../Components/Sidebar"
import { useEffect, useState } from "react"
import axios from "axios"
import { API } from "../../Constant/API"
import RatingStar from "../../Components/RatingStar"

const Home = () => {
    const [activeSort, setActiveSort] = useState('2')
    const [sortByPrice, setSortByPrice] = useState('default')
    const [dataProducts, setDataProducts] = useState([])

    const CallAPIDataProducts = async () => {
        await axios.get(`${API}/products`)
            .then(res => {
                const listProducts = res.data.data.products
                setDataProducts(listProducts)
            })
            .catch(err => {
                console.log('check err:', err)
            })
    }

    useEffect(() => {
        CallAPIDataProducts()
    }, [])

    const handleOnChangeSetActiveSort = (target) => {
        setActiveSort(target)
        setSortByPrice('default')
    }

    const handleOnChangeSortByPrice = (e) => {
        setActiveSort('4')
        setSortByPrice(e.target.value)
    }

    const formatSold = (number) => {
        const ranges = [
            { divider: 1e6, suffix: 'M' },
            { divider: 1e3, suffix: 'K' },
        ];

        for (const { divider, suffix } of ranges) {
            if (number >= divider) {
                return (number / divider).toFixed(1) + suffix;
            }
        }

        return number.toString();
    }

    const formatCurrencyVND = (number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
    }

    return (
        <Flex className="max-w-[1400px] mx-auto mt-10 gap-10 px-5">
            <SideBar />

            <section className="">
                <Flex className="sort_bar flex-wrap items-center gap-3 bg-[#dde0e5] p-5">
                    <p>Sắp xếp theo</p>

                    <div onClick={() => handleOnChangeSetActiveSort('1')} className={`p-2 ${activeSort == '1' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer`} >Phổ biến</div>

                    <div onClick={() => handleOnChangeSetActiveSort('2')} className={`p-2 ${activeSort == '2' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer`}>Mới nhất</div>

                    <div onClick={() => handleOnChangeSetActiveSort('3')} className={`p-2 ${activeSort == '3' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer`}>Bán chạy</div>

                    <select value={sortByPrice} onChange={(e) => { handleOnChangeSortByPrice(e) }} className={`p-2 ${activeSort == '4' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer focus:outline-none`}>
                        <option className="bg-white text-grat-500" value={'default'} disabled>Giá</option>
                        <option className="bg-white text-black" value={'lowtohigh'}>Thấp đến cao</option>
                        <option className="bg-white text-black" value={'hightolow'}>Cao đến thấp</option>
                    </select>
                </Flex>

                <div className="mt-10 grid  gap-3 
                2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3">
                    {dataProducts.map((item, index) => {
                        return (
                            <div key={item._id} span={6} className="rounded-sm overflow-hidden shadow-lg hover:translate-y-[-5px] transition-all duration-300 ease-in-out cursor-pointer">
                                <div className="overflow-hidden aspect-square">
                                    <img className="w-[100%]" src={item.images[0]} alt={item.name} />
                                </div>

                                <div className="p-2">
                                    <p className="item_name line-clamp-2 overflow-hidden">
                                        {item.name}
                                    </p>

                                    <Flex className="items-center gap-3 my-2">
                                        <p className="item_price_original text-gray-500 line-through">
                                            {formatCurrencyVND(item.price_before_discount)}
                                        </p>

                                        <p className="item_price_sale text-orange-500">
                                            {formatCurrencyVND(item.price)}
                                        </p>
                                    </Flex>

                                    <Flex className="items-center gap-2 justify-end my-2">
                                        <RatingStar rating={item.rating} />
                                        <p>{formatSold(item.sold)} đã bán</p>
                                    </Flex>

                                </div>
                            </div>
                        )
                    })}
                    {/* <Col span={4} className="rounded-sm overflow-hidden shadow-lg">
                        <div>
                            <img src="https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02eece816d50.jpg" alt="dienthoai" />
                        </div>

                        <div className="p-2">
                            <p className="item_name line-clamp-2 overflow-hidden">
                                Điện thoại alo alo alo alo alo alo alo alo alo alo alo alo alo alo alo alo
                            </p>

                            <Flex className="items-center gap-3 my-2">
                                <p className="item_price_original text-gray-500 line-through">
                                    3000000
                                </p>

                                <p className="item_price_sale text-orange-500">
                                    2500000
                                </p>
                            </Flex>

                            <Flex className="items-center gap-2 justify-end my-2">
                                <RatingStar rating={4.6} />
                                <p>4.6k đã bán</p>
                            </Flex>

                        </div>
                    </Col> */}
                </div>
            </section >
        </Flex >
    )
}

export default Home
