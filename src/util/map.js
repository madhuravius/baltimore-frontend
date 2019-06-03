import { fromJS } from 'immutable';
import MAP_STYLE from './map-style.json';

// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = fromJS({
  id: 'data',
  interactive: true,
  layout: {
    visibility: 'visible',
  },
  source: 'points',
  type: 'heatmap',
  version: 8,
});

export const defaultMapStyle = fromJS(MAP_STYLE);
