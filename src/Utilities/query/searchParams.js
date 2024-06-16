import _ from "lodash";

export const querySearchParams = (params) => {
    if (!params) {
        params = {}
    }

    const queryConfig = {
        page: params.page || 1,
        limit: params.limit || 20,
        order: params.order,
        sort_by: params.sort_by,
        exclude: params.exclude,
        name: params.name,
        price_max: Number(params.price_max),
        price_min: Number(params.price_min),
        rating_filter: Number(params.rating_filter),
        category: params.category,
    }

    const filteredQueryConfig = _.pickBy(queryConfig, _.identity)

    return filteredQueryConfig
}