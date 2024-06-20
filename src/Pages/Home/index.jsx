import { Flex, Skeleton } from "antd"
import SideBar from "../../Components/Sidebar"
import { useEffect, useLayoutEffect, useState } from "react"
import ItemCard from "../../Components/Products/ItemCard"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../Redux/Features/Products/productSlice"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import { createSearchParams, useLocation, useNavigate } from "react-router-dom"
import useQueryConfig from "../../Hooks/useQueryConfig"
import { omit } from "lodash"
import SideBarDrawer from "../../Components/Drawer/sidebarDrawer"
import SortDrawer from "../../Components/Drawer/sortDrawer"
import Sorter from "../../Components/Popover/Sorter"

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const queryConfig = useQueryConfig()

    const listProducts = useSelector(state => state.products.listProduct)
    const pagination = useSelector(state => state.products.pagination)
    const listProductStatus = useSelector(state => state.products.listProductStatus)

    const [activeSort, setActiveSort] = useState('createdAt')
    const [sortByPrice, setSortByPrice] = useState('')

    const locationSearch = useLocation().search

    useLayoutEffect(() => {
        const searchParams = new URLSearchParams(locationSearch)
        const sortBy = searchParams.get('sort_by')
        const order = searchParams.get('order')

        if (sortBy === 'view') {
            setActiveSort('view')
        } else if (sortBy === 'price') {
            setActiveSort('price')
            setSortByPrice(order === 'asc' ? 'asc' : 'desc')
        } else if (sortBy === 'sold') {
            setActiveSort('sold')
        } else {
            setActiveSort('createdAt');
        }
    }, [locationSearch])

    useLayoutEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }, [listProducts])


    useEffect(() => {
        dispatch(fetchProducts(locationSearch))
    }, [dispatch, locationSearch])

    const handleOnChangeSetActiveSort = (target) => {
        if (activeSort === target) {
            return
        }

        navigate({
            pathname: '/',
            search: createSearchParams(
                omit(
                    {
                        ...queryConfig,
                        sort_by: target
                    },
                    ['order']
                )
            ).toString()
        })

        setActiveSort(target)
        setSortByPrice('')
    }

    const handleOnChangeSortByPrice = (e) => {
        setActiveSort('price')
        setSortByPrice(e.target.value)

        navigate({
            pathname: '/',
            search: createSearchParams(
                omit({
                    ...queryConfig,
                    sort_by: 'price',
                    order: e.target.value
                })
            ).toString()
        })
    }

    const handlePaginationChange = (newPageOrIsNext) => {
        const newPage = typeof newPageOrIsNext === "boolean"
            ? pagination.page + (newPageOrIsNext ? 1 : -1)
            : newPageOrIsNext

        navigate({
            pathname: '/',
            search: createSearchParams(
                omit({
                    ...queryConfig,
                    page: newPage,
                })
            ).toString()
        })
    }

    if (!listProductStatus) {
        return (
            new Array(5).fill(null).map((_, index) => <Skeleton key={index} />)
        )
    }

    return (
        <Flex className="max-w-[1400px] mx-auto mt-10 gap-10 px-5">
            <div className="max-[769px]:hidden">
                <SideBar />
            </div>

            <section className="w-full">
                {listProducts?.length > 0 ?
                    <div>
                        <Flex className="max-[769px]:hidden items-center justify-between bg-[#dde0e5] p-5">
                            <Flex className="items-center gap-2">
                                <p>Sắp xếp theo:</p>

                                <Flex className="max-[1028px]:hidden sort_bar flex-wrap items-center gap-3">
                                    <div onClick={() => handleOnChangeSetActiveSort('view')} className={`p-2 ${activeSort == 'view' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer`} >Phổ biến</div>

                                    <div onClick={() => handleOnChangeSetActiveSort('createdAt')} className={`p-2 ${activeSort == 'createdAt' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer`}>Mới nhất</div>

                                    <div onClick={() => handleOnChangeSetActiveSort('sold')} className={`p-2 ${activeSort == 'sold' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer`}>Bán chạy</div>

                                    <select value={sortByPrice} onChange={(e) => { handleOnChangeSortByPrice(e) }} className={`p-2 ${activeSort == 'price' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer focus:outline-none`}>
                                        <option className="bg-white text-grat-500" value={''} disabled>Giá</option>
                                        <option className="bg-white text-black" value={'asc'}>Thấp đến cao</option>
                                        <option className="bg-white text-black" value={'desc'}>Cao đến thấp</option>
                                    </select>
                                </Flex>

                                <div className="min-[1028px]:hidden">
                                    <Sorter />
                                </div>
                            </Flex>

                            <Flex className="items-center justify-center gap-2">
                                <Flex className="h-full">
                                    <p className="text-[#fc5831]">{pagination?.page}</p>/<p>{pagination?.page_size}</p>
                                </Flex>

                                <Flex className="items-center">
                                    <button onClick={() => handlePaginationChange(false)} disabled={pagination?.page === 1 ? true : false} className={`p-[10px] shadow-detail text-[12px] ${pagination?.page === 1 ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer bg-white'}`}>
                                        <FaAngleLeft />
                                    </button>
                                    <button onClick={() => handlePaginationChange(true)} disabled={pagination?.page === pagination?.page_size ? true : false} className={`p-[10px] shadow-detail text-[12px] ${pagination?.page === pagination?.page_size ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer bg-white'} `}>
                                        <FaAngleRight />
                                    </button>
                                </Flex>
                            </Flex>
                        </Flex>



                        <div className="min-[769px]:hidden px-5 py-2 bg-gray-200 rounded-md">
                            <Flex className="justify-between">
                                <SideBarDrawer />

                                <Flex className="items-center justify-center gap-2">
                                    <button onClick={() => handlePaginationChange(false)} disabled={pagination?.page === 1 ? true : false} className={`p-[10px] shadow-detail text-[12px] ${pagination?.page === 1 ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer bg-white'}`}>
                                        <FaAngleLeft />
                                    </button>
                                    <Flex>
                                        <p className="text-[#fc5831]">{pagination?.page}</p>/<p>{pagination?.page_size}</p>
                                    </Flex>
                                    <button onClick={() => handlePaginationChange(true)} disabled={pagination?.page === pagination?.page_size ? true : false} className={`p-[10px] shadow-detail text-[12px] ${pagination?.page === pagination?.page_size ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer bg-white'} `}>
                                        <FaAngleRight />
                                    </button>
                                </Flex>

                                <SortDrawer />
                            </Flex>
                        </div>
                    </div>
                    :
                    null
                }

                {listProducts?.length > 0 ?
                    <div className="mt-5 grid gap-2 grid-cols-2 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3">
                        {listProducts.map((item) => (
                            <ItemCard key={item._id} item={item} />
                        ))}
                    </div>
                    :
                    <div className="my-10 mx-auto w-1/2">
                        <img src="https://i.imgur.com/l3LN4vt.png" alt="not_found" />
                    </div>
                }


                {listProducts?.length > 0 ?
                    <Flex className="pagination_bottom justify-center my-10 gap-5">
                        <button onClick={() => handlePaginationChange(false)} disabled={pagination?.page === 1 ? true : false} className={`py-2 px-4 shadow-detail text-[12px] ${pagination?.page === 1 ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer bg-white'}`}>
                            <FaAngleLeft />
                        </button>

                        <Flex className="gap-5">
                            {pagination &&
                                Array(pagination.page_size)
                                    .fill(null)
                                    .map((_, index) =>
                                        <Flex key={index} onClick={() => handlePaginationChange(index + 1)}
                                            className={`${pagination.page === (index + 1) ? 'border-[#fa5030]' : 'border-gray-300'} cursor-pointer items-center justify-center w-11 h-10 bg-[#ffffff] border-[1px] rounded-md`}>
                                            {index + 1}
                                        </Flex>
                                    )}
                        </Flex>

                        <button onClick={() => handlePaginationChange(true)} disabled={pagination?.page === pagination?.page_size ? true : false} className={`py-2 px-4 shadow-detail text-[12px] ${pagination?.page === pagination?.page_size ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer bg-white'} `}>
                            <FaAngleRight />
                        </button>
                    </Flex>
                    :
                    null
                }
            </section >
        </Flex >
    )
}

export default Home
