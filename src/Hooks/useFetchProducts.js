import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../Redux/Features/Products/productSlice"
import useQueryConfig from "./useQueryConfig"
import _ from "lodash"

export const useFetchProducts = () => {
    const dispatch = useDispatch()
    const [queryConfig, setQueryConfig] = useQueryConfig()
    const { products, isLoading, error } = useSelector((state) => state.products)

    useEffect(() => {
        const debouncedFetch = _.debounce(() => {
            dispatch(fetchProducts(queryConfig))
        }, 300)

        debouncedFetch();
        return debouncedFetch.cancel
    }, [queryConfig, dispatch])

    return { products, isLoading, error, updateParams: setQueryConfig }
}