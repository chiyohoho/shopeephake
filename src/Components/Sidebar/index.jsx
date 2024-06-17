import { Flex, Input } from "antd"
import { CiCircleList, CiFilter, } from "react-icons/ci"
import { FaPlay, } from "react-icons/fa";
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchDataCategories, fetchProducts } from "../../Redux/Features/Products/productSlice";
import { querySearchParams } from "../../Utilities/query/searchParams";
import { useLocation, useSearchParams } from "react-router-dom";
import StarRating from "./Components/ratingStar";

const SideBar = () => {
    const dispatch = useDispatch()
    const dataCategories = useSelector(state => state.products.listCategories)
    const [active, setActive] = useState('-1')
    const [priceMin, setPriceMin] = useState()
    const [priceMax, setPriceMax] = useState()
    const warningRef = useRef()
    const [updateSearchParams, setUpdateSearchParams] = useState(querySearchParams())
    const [searchParams, setSearchparams] = useSearchParams()
    const locationSearch = useLocation().search

    useEffect(() => {
        dispatch(fetchDataCategories())
    }, [dispatch])

    useLayoutEffect(() => {
        if (locationSearch.includes(dataCategories[0]?._id)) {
            setActive('0')
        } else if (locationSearch.includes(dataCategories[1]?._id)) {
            setActive('1')
        } else if (locationSearch.includes(dataCategories[2]?._id)) {
            setActive('2')
        } else {
            setActive('-1')
        }
    }, [dataCategories, locationSearch])

    useEffect(() => {
        if (locationSearch) {
            dispatch(fetchProducts(locationSearch))
        } else {
            const newSearchParams = { ...updateSearchParams }
            dispatch(fetchProducts(newSearchParams))
        }
    }, [dispatch, updateSearchParams, locationSearch])

    const handleFilterByPrice = () => {
        if (!priceMin && !priceMax) {
            warningRef.current.innerHTML = 'Không được để trống'
            return
        }
        const newSearchParams = { ...updateSearchParams, price_min: priceMin || '', price_max: priceMax || '' }

        setSearchparams(newSearchParams)
        setUpdateSearchParams(newSearchParams)
        warningRef.current.innerHTML = ''
    }

    const handleFilterByRating = (rating) => {
        const newSearchParams = { ...updateSearchParams, rating_filter: rating }

        setSearchparams(newSearchParams)
        setUpdateSearchParams(newSearchParams)
    }

    const handleFilterByCategory = (idCategory) => {
        const newSearchParams = { ...updateSearchParams }

        if (idCategory) {
            newSearchParams.category = idCategory
        } else {
            delete newSearchParams.category
        }

        setSearchparams(newSearchParams)
        setUpdateSearchParams(newSearchParams)
    }


    return (
        <div className="sidebar max-w-[240px] w-[100%] mb-10 max-[900px]:hidden">
            <div className="categories">
                <Flex className={`items-center gap-2 text-[20px] ${active == '-1' ? 'text-[#fb5731]' : 'text-black'} border-b-[1px] border-b-gray-300 pb-3`}>
                    <CiCircleList />
                    <p onClick={() => {
                        setActive('-1')
                        handleFilterByCategory('')
                    }} className="cursor-pointer">Tất cả danh mục</p>
                </Flex>

                <Flex className="sidebar_categories flex-col gap-3 px-5 py-3">
                    {dataCategories && dataCategories.map((item, index) => {
                        return (
                            <Flex key={index} className="items-center gap-2  transition-all duration-300 ease-in-out ">
                                <div className={`text-[8px] text-[#fb5731] ${active == index ? 'opacity-1' : 'opacity-0'} `}>
                                    <FaPlay />
                                </div>
                                <p onClick={() => {
                                    setActive(index)
                                    handleFilterByCategory(item._id)
                                }} className={`font-[500] ${active == index ? 'text-[#fb5731]' : 'text-black'} cursor-pointer`} >{item.name}</p>
                            </Flex>
                        )
                    })}
                </Flex>
            </div>

            <div className="filter border-b-[1px] border-b-gray-300 pb-5">
                <Flex className={`items-center gap-2 text-[20px] text-[#fb5731] border-b-[1px] border-b-gray-300 pb-3`}>
                    <CiFilter />
                    <p onClick={() => setActive('-1')} className="cursor-pointer text-[24px] font-[600]">Bộ lọc tìm kiếm</p>
                </Flex>

                <div>
                    <p className="my-3">Khoảng giá</p>
                    <Flex className="items-center gap-2">
                        <Input value={priceMin} onChange={(e) => setPriceMin(e.target.value)} placeholder="₫ From" />
                        <p className="text-[#ccc]">-</p>
                        <Input value={priceMax} onChange={(e) => setPriceMax(e.target.value)} placeholder="₫ To" />
                    </Flex>
                    <p ref={warningRef} className="text-red-500"></p>
                    <button onClick={() => handleFilterByPrice()} className="bg-[#fb5731] p-3 w-[100%] rounded-sm mt-5 text-white hover:bg-[#ec6c53]">Áp Dụng</button>
                </div>
            </div>

            <div className="rating ">
                <p className="my-3">Đánh giá</p>

                <Flex className="flex-col gap-2 px-5">
                    <div onClick={() => handleFilterByRating(5)}>
                        <StarRating rating={5} />
                    </div>

                    <Flex onClick={() => handleFilterByRating(4)} className="items-center gap-2">
                        <StarRating rating={4} />
                        <p>Trở lên</p>
                    </Flex>

                    <Flex onClick={() => handleFilterByRating(3)} className="items-center gap-2">
                        <StarRating rating={3} />
                        <p>Trở lên</p>
                    </Flex>

                    <Flex onClick={() => handleFilterByRating(2)} className="items-center gap-2">
                        <StarRating rating={2} />
                        <p>Trở lên</p>
                    </Flex>

                    <Flex onClick={() => handleFilterByRating(1)} className="items-center gap-2">
                        <StarRating rating={1} />
                        <p>Trở lên</p>
                    </Flex>
                </Flex>

                <div className=" border-y-[1px] border-[#ccc] py-5 mt-5">
                    <button className="bg-[#fb5731] p-3 w-[100%] rounded-sm text-white hover:bg-[#ec6c53]">Xóa tất cả</button>
                </div>
            </div>
        </div>
    )
}

export default SideBar
