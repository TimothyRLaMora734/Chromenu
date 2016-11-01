import Action from '../actions';
import {PagesState, DefaultPagesState} from '../states';

export default function pages(state: PagesState = DefaultPagesState, action: Action) {
    switch (action.type) {
        case 'OpenPage': {
            const index =
                action.index < 0 ? 0 :
                state.all.size <= action.index ? state.all.size - 1 :
                action.index;
            return Object.assign({}, state, { index });
        }
        case 'CreatePage': {
            return Object.assign({}, state, {
                index: state.all.size,
                all: state.all.push({
                    url: '',
                    icon_image: '',
                    configured: false,
                    title: '',
                }),
            });
        }
        case 'ConfigurePage': {
            return Object.assign({}, state, {
                index: action.index,
                all: state.all.set(action.index, {
                    url: action.url,
                    icon_image: action.image_url,
                    configured: true,
                    title: action.title,
                }),
            });
        }
        case 'SetConfigured': {
            return Object.assign({}, state, {
                index: action.index,
                all: state.all.update(action.index, p => ({
                    url: p.url,
                    icon_image: p.icon_image,
                    configured: action.value,
                    title: p.title,
                })),
            });
        }
        case 'DeletePage': {
            let index = state.index;
            if (action.index === index) {
                index -= 1;
                if (index < 0) {
                    index = null;
                }
            }
            return Object.assign({}, state, {
                index,
                all: state.all.delete(action.index),
            });
        }
        default:
            return state;
    }
}
