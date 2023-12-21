import { createReduxStore, register } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

const DEFAULT_STATE = {
    options: {}
};

const HYDRATE_OPTIONS = 'HYDRATE_OPTIONS';

const store = createReduxStore('vk-option-text/options', {
	reducer(state = DEFAULT_STATE, action) {
		switch (action.type) {
			case HYDRATE_OPTIONS:
                return {
                    ...state,
                    options: action.value
                }
        }
        return state;
    },

    actions: {
        hydrateOptions(values) {
			return {
				type: HYDRATE_OPTIONS,
				value: values,
			};            
        },
        saveOptions(options) {
            return async ({ dispatch }) => {
                await apiFetch({
                    path: 'vk-option-text/v2/settings',
                    method: 'POST',
                    data: options

                });
                dispatch.hydrateOptions(options);
            }
        },        
    },

    selectors: {
        getOptions(state) {
            return state.options;
        },
    },
    resolvers: {
        getOptions() {
            return async ({ dispatch }) => {
                try {
                    const options = await apiFetch({
                        path: 'vk-option-text/v2/settings',
                        method: 'GET'
                    });
                    dispatch.hydrateOptions(options);
                } catch (error) {
                    
                }
            }
        }       
    }

});

register(store);