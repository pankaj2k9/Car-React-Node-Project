import types from './types';

export const updateRegionData = (data) => ({
	type: types.UPDATE_REGION_DATA,
	data
});

// Action to fetch data from S3
export const getRegionData = () => ({
	promise: (client) => client.get('https://s3-us-west-2.amazonaws.com/alchemy-interactive/uproxx/data.json'),
	responseTypes: [types.GET_REGION_DATA_SUCCESS, types.GET_REGION_DATA_FAILURE],
	type: types.GET_REGION_DATA
});
