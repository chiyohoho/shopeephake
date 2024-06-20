import { useDispatch, useSelector } from "react-redux"
import { createSearchParams, useLocation, useNavigate } from "react-router-dom"
import useQueryConfig from "../../Hooks/useQueryConfig"
import { useEffect, useLayoutEffect, useState } from "react"
import { fetchProducts } from "../../Redux/Features/Products/productSlice"
import { omit } from "lodash"
import { Flex } from "antd"

const MiniSortBar = () => {
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


    return (
        <div className="grid grid-cols-2 gap-2 w-[250px]">
            <div onClick={() => handleOnChangeSetActiveSort('view')} className={`p-2 ${activeSort == 'view' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer text-center border-[1px] border-[#ccc] rounded-md`} >Phổ biến</div>

            <div onClick={() => handleOnChangeSetActiveSort('createdAt')} className={`p-2 ${activeSort == 'createdAt' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer text-center border-[1px] border-[#ccc] rounded-md`}>Mới nhất</div>

            <div onClick={() => handleOnChangeSetActiveSort('sold')} className={`p-2 ${activeSort == 'sold' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer text-center border-[1px] border-[#ccc] rounded-md`}>Bán chạy</div>

            <select value={sortByPrice} onChange={(e) => { handleOnChangeSortByPrice(e) }} className={`p-2 ${activeSort == 'price' ? 'bg-[#fc5831] text-white' : 'bg-white text-black'} cursor-pointer outline-none text-center border-[1px] border-[#ccc] rounded-md`}>
                <option className="bg-white text-grat-500" value={''} disabled>Giá</option>
                <option className="bg-white text-black" value={'asc'}>Thấp đến cao</option>
                <option className="bg-white text-black" value={'desc'}>Cao đến thấp</option>
            </select>
        </div>
    )
}

export default MiniSortBar
