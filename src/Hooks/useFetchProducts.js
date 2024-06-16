import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/Features/Products/productSlice";
import _ from "lodash";
import useQueryConfig from "./useQueryConfig";

export const useFetchProducts = (searchParams) => {
    const dispatch = useDispatch();
    const customHookConfig = useQueryConfig(searchParams);
    const { listProduct } = useSelector((state) => state.products);

    useEffect(() => {
        const debouncedFetch = _.debounce(() => {
            dispatch(fetchProducts(customHookConfig));
        }, 300);

        debouncedFetch();

        return () => {
            debouncedFetch.cancel();
        };
    }, [customHookConfig, dispatch]);

    return useMemo(() => ({
        listProduct
    }), [listProduct]);
}