import { useLocation } from "react-router-dom"
import _ from 'lodash'

export default function useQueryConfig() {
    const location = useLocation().search


    const queryConfig = {
        page: location.page || '1',
        limit: location.limit || '20',
        order: location.order,
        sort_by: location.sort_by,
        exclude: location.exclude,
        name: location.name,
        price_max: location.price_max,
        price_min: location.price_min,
        rating_filter: location.rating_filter,
        category: location.category,
    }

    const filteredQueryConfig = _.omitBy(queryConfig, _.isEmpty)

    return filteredQueryConfig
}
