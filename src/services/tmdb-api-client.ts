import type { AxiosError, AxiosRequestConfig } from 'axios';
import Axios from 'axios';
import qs from 'qs';

import { env } from '@/env';

type QueryParamValue = boolean | number | string | null | undefined;
type QueryParamRecord = Record<
	string,
	QueryParamValue | Array<QueryParamValue>
>;
type QueryParams = QueryParamRecord | URLSearchParams;

export const AXIOS_INSTANCE = Axios.create({
	baseURL: 'https://api.themoviedb.org',
	paramsSerializer: (params) =>
		qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true }),
});

const normalizeParams = (params?: QueryParams): QueryParamRecord => {
	if (params == null) {
		return {};
	}

	if (!(params instanceof URLSearchParams)) {
		return params;
	}

	const normalizedParams: QueryParamRecord = {};

	params.forEach((value, key) => {
		const existingValue = normalizedParams[key];

		if (existingValue == null) {
			normalizedParams[key] = value;
			return;
		}

		if (Array.isArray(existingValue)) {
			existingValue.push(value);
			return;
		}

		normalizedParams[key] = [existingValue, value];
	});

	return normalizedParams;
};

// Add a second `options` argument to pass extra options to each query
// The custom instance function as recommended by Orval
export const customInstance = <T>(
	config: AxiosRequestConfig,
	options?: AxiosRequestConfig,
): Promise<T> => {
	const source = Axios.CancelToken.source();
	const params = {
		...normalizeParams(config.params as QueryParams | undefined),
		...normalizeParams(options?.params as QueryParams | undefined),
		...(env.VITE_TMDB_API_KEY != null
			? { api_key: env.VITE_TMDB_API_KEY }
			: {}),
	};
	const promise = AXIOS_INSTANCE({
		...config,
		...options,
		params,
		cancelToken: source.token,
	}).then(({ data }) => data as T);

	// @ts-ignore its fine
	promise.cancel = () => {
		source.cancel('Query was cancelled');
	};

	return promise;
};

// Error type for react-query
export type ErrorType<TError> = AxiosError<TError>;

// Body type
export type BodyType<TBodyData> = TBodyData;
