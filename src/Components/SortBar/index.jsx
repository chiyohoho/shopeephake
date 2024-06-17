import { useDispatch, useSelector } from "react-redux"
import { createSearchParams, useLocation, useNavigate } from "react-router-dom"
import useQueryConfig from "../../Hooks/useQueryConfig"
import { useEffect, useLayoutEffect, useState } from "react"
import { fetchProducts } from "../../Redux/Features/Products/productSlice"
import { omit } from "lodash"
import { Flex } from "antd"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

const SortBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const queryConfig = useQueryConfig()

    const listProducts = useSelector(state => state.products.listProduct)
    const pagination = useSelector(state => state.products.pagination)

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
    return (
        <Flex className="max-[768px]:flex-col items-center gap-5 justify-between bg-[#dde0e5] p-5">
            <Flex className="sort_bar flex-wrap items-center gap-3">
                <p>Sắp xếp theo:</p>

                <div onClick={() => handleOnChangeSetActiveSort('view')} className={`p-2 ${activeSort == 'view' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer`} >Phổ biến</div>

                <div onClick={() => handleOnChangeSetActiveSort('createdAt')} className={`p-2 ${activeSort == 'createdAt' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer`}>Mới nhất</div>

                <div onClick={() => handleOnChangeSetActiveSort('sold')} className={`p-2 ${activeSort == 'sold' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer`}>Bán chạy</div>

                <select value={sortByPrice} onChange={(e) => { handleOnChangeSortByPrice(e) }} className={`p-2 ${activeSort == 'price' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer focus:outline-none`}>
                    <option className="bg-white text-grat-500" value={''} disabled>Giá</option>
                    <option className="bg-white text-black" value={'asc'}>Thấp đến cao</option>
                    <option className="bg-white text-black" value={'desc'}>Cao đến thấp</option>
                </select>
            </Flex>

            <Flex className="items-center justify-center gap-2 self-end">
                <Flex>
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
    )
}

export default SortBar
