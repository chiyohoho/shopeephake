import { Flex, Skeleton } from "antd"
import SideBar from "../../Components/Sidebar"
import { useEffect, useLayoutEffect, useState } from "react"
import ItemCard from "../../Components/Products/ItemCard"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../Redux/Features/Products/productSlice"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import { useNavigate, useSearchParams } from "react-router-dom"
import { querySearchParams } from "../../Utilities/query/searchParams"



const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const listProducts = useSelector(state => state.products.listProduct)
    const pagination = useSelector(state => state.products.pagination)
    const listProductStatus = useSelector(state => state.products.listProductStatus)

    const [activeSort, setActiveSort] = useState('createdAt')
    const [sortByPrice, setSortByPrice] = useState('')

    const defaultSearchParams = querySearchParams()
    const [updateSearchParams, setUpdateSearchParams] = useState(defaultSearchParams)

    const [searchParams, setSearchparams] = useSearchParams()

    useLayoutEffect(() => {
        if (searchParams.size === 0) {
            setActiveSort('createdAt')
        }
    }, [searchParams])


    useEffect(() => {
        dispatch(fetchProducts(updateSearchParams))
    }, [dispatch, updateSearchParams,])

    const handleOnChangeSetActiveSort = async (target) => {
        if (activeSort === target) {
            return
        }
        const newSearchParams = { ...updateSearchParams, sort_by: target }

        setUpdateSearchParams(newSearchParams)
        setSearchparams(newSearchParams)
        setActiveSort(target)
        setSortByPrice('')
    }

    const handleOnChangeSortByPrice = (e) => {
        setActiveSort('price')
        const newSearchParams = { ...updateSearchParams, sort_by: 'price', order: e.target.value }

        setUpdateSearchParams(newSearchParams)
        setSearchparams(newSearchParams)
        setSortByPrice(e.target.value)
    }

    const handlePagination = (isNext) => {
        const newPage = isNext ? pagination.page + 1 : pagination.page - 1

        setUpdateSearchParams({
            ...updateSearchParams,
            page: newPage
        })

        setSearchparams({
            ...updateSearchParams,
            page: newPage
        });
    }

    if (!listProductStatus) {
        return (
            new Array(5).fill(null).map((_, index) => <Skeleton key={index} />)
        )
    }

    console.log('check pagination:', pagination)

    return (
        <Flex className="max-w-[1400px] mx-auto mt-10 gap-10 px-5">
            <SideBar />

            <section className="">
                <Flex className="items-center justify-between bg-[#dde0e5]">
                    <Flex className="sort_bar flex-wrap items-center gap-3  p-5">
                        <p>Sắp xếp theo</p>

                        <div onClick={() => handleOnChangeSetActiveSort('view')} className={`p-2 ${activeSort == 'view' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer`} >Phổ biến</div>

                        <div onClick={() => handleOnChangeSetActiveSort('createdAt')} className={`p-2 ${activeSort == 'createdAt' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer`}>Mới nhất</div>

                        <div onClick={() => handleOnChangeSetActiveSort('sold')} className={`p-2 ${activeSort == 'sold' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer`}>Bán chạy</div>

                        <select value={sortByPrice} onChange={(e) => { handleOnChangeSortByPrice(e) }} className={`p-2 ${activeSort == 'price' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer focus:outline-none`}>
                            <option className="bg-white text-grat-500" value={''} disabled>Giá</option>
                            <option className="bg-white text-black" value={'asc'}>Thấp đến cao</option>
                            <option className="bg-white text-black" value={'desc'}>Cao đến thấp</option>
                        </select>
                    </Flex>

                    <Flex className="items-center gap-2 pr-5">
                        <Flex>
                            <p className="text-[#fc5831]">{pagination?.page}</p>/<p>{pagination?.page_size}</p>
                        </Flex>

                        <Flex className="items-center">
                            <button onClick={() => handlePagination(false)} disabled={pagination?.page === 1 ? true : false} className={`p-[10px] shadow-detail text-[12px] ${pagination?.page === 1 ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer bg-white'}`}>
                                <FaAngleLeft />
                            </button>
                            <button onClick={() => handlePagination(true)} disabled={pagination?.page === pagination?.page_size ? true : false} className={`p-[10px] shadow-detail text-[12px] ${pagination?.page === pagination?.page_size ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer bg-white'} `}>
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
