import { Flex } from "antd"
import SideBar from "../../Components/Sidebar"
import { useEffect, useState } from "react"
import ItemCard from "../../Components/Products/ItemCard"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllProducts } from "../../Redux/Features/Products/productSlice"


const Home = () => {
    const dispatch = useDispatch()

    const listProducts = useSelector(state => state.products.listProduct)
    const isLoading = useSelector(state => state.products.isLoading)
    const isError = useSelector(state => state.products.isError)

    const [activeSort, setActiveSort] = useState('2')
    const [sortByPrice, setSortByPrice] = useState('default')

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch])

    const handleOnChangeSetActiveSort = (target) => {
        setActiveSort(target)
        setSortByPrice('default')
    }

    const handleOnChangeSortByPrice = (e) => {
        setActiveSort('4')
        setSortByPrice(e.target.value)
    }

    if (isLoading === false && isError === true) {
        return <Flex>Something Wrong! Please try again.</Flex>
    }

    if (isLoading === true && isError === false) {
        return <Flex>Loading Data... Please wait.</Flex>
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
