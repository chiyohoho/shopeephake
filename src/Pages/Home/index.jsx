import { Flex, Skeleton } from "antd"
import SideBar from "../../Components/Sidebar"
import { useEffect, useState } from "react"
import ItemCard from "../../Components/Products/ItemCard"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../Redux/Features/Products/productSlice"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import useQueryConfig from "../../Hooks/useQueryConfig"



const Home = () => {
    const dispatch = useDispatch()

    const listProducts = useSelector(state => state.products.listProduct)
    const pagination = useSelector(state => state.products.pagination)
    const listProductStatus = useSelector(state => state.products.listProductStatus)

    const [activeSort, setActiveSort] = useState('2')
    const [sortByPrice, setSortByPrice] = useState('default')

    const queryConfig = useQueryConfig()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const handleOnChangeSetActiveSort = (target) => {
        setActiveSort(target)
        setSortByPrice('default')
    }

    const handleOnChangeSortByPrice = (e) => {
        setActiveSort('4')
        setSortByPrice(e.target.value)
    }

    if (!listProductStatus) {
        return (
            new Array(5).fill(null).map((_, index) => <Skeleton key={index} />)
        )
    }

    console.log('check queryConfig:', queryConfig)

    return (
        <Flex className="max-w-[1400px] mx-auto mt-10 gap-10 px-5">
            <SideBar />

            <section className="">
                <Flex className="items-center justify-between bg-[#dde0e5]">
                    <Flex className="sort_bar flex-wrap items-center gap-3  p-5">
                        <p>Sắp xếp theo</p>

                        <div onClick={() => handleOnChangeSetActiveSort('1')} className={`p-2 ${activeSort == '1' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer`} >Phổ biến</div>

                        <div onClick={() => handleOnChangeSetActiveSort('2')} className={`p-2 ${activeSort == '2' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer`}>Mới nhất</div>

                        <div onClick={() => handleOnChangeSetActiveSort('3')} className={`p-2 ${activeSort == '3' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer`}>Bán chạy</div>

                        <select value={sortByPrice} onChange={(e) => { handleOnChangeSortByPrice(e) }} className={`p-2 ${activeSort == '4' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer focus:outline-none`}>
                            <option className="bg-white text-grat-500" value={''} disabled>Giá</option>
                            <option className="bg-white text-black" value={'lowtohigh'}>Thấp đến cao</option>
                            <option className="bg-white text-black" value={'hightolow'}>Cao đến thấp</option>
                        </select>
                    </Flex>

                    <Flex className="items-center gap-2 pr-5">
                        <Flex>
                            <p className="text-[#fc5831]">{pagination?.page}</p>/<p>{pagination?.page_size}</p>
                        </Flex>

                        <Flex className="items-center">
                            <button disabled={pagination?.page === 1 ? true : false} className={`p-[10px] shadow-detail text-[12px] ${pagination?.page === 1 ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer bg-white'} `}>
                                <FaAngleLeft />
                            </button>
                            <button className="p-[10px] bg-white shadow-detail text-[12px] cursor-pointer">
                                <FaAngleRight />
                            </button>
                        </Flex>
                    </Flex>
                </Flex>

                <div className="mt-10 grid gap-2 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
                    {listProducts &&
                        listProducts.map((item) => (
                            <ItemCard key={item._id} item={item} />
                        ))}
                </div>
            </section >
        </Flex >
    )
}

export default Home
