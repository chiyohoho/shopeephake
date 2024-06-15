import { useLocation, useParams } from "react-router-dom"
import _ from 'lodash'

export default function useQueryConfig() {
    const params = useParams()
    const location = useLocation()

    const queryConfig = {
        page: params.page || 1,
        limit: params.limit || 20,
        order: params.order || '',
        sort_by: params.sort_by || '',
        exclude: params.exclude || '',
        name: params.name || '',
        price_max: Number(params.price_max) || '',
        price_min: Number(params.price_min) || '',
        rating_filter: Number(params.rating_filter) || '',
        category: params.category || '',
    };

    const filteredQueryConfig = _.omitBy(queryConfig, _.isEmpty)

    const searchParams = new URLSearchParams(filteredQueryConfig)

    const currentSearch = location.search || searchParams.toString()

    if (location.search !== currentSearch) {
        window.history.replaceState(null, null, `${location.pathname}?${currentSearch}`)
    }

    return filteredQueryConfig
}
