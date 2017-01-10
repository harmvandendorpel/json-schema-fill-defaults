console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::\n');
var autoDefaults = require('../dist/bundle').default;
var validator = require('is-my-json-valid');
var Schema = require('./schema');

const validate = validator(Schema);

var data = {
  config: {
    id: 'demo_site',
    corePath: 'core/video-only/video-only.adtec-core.js'
  },
  syndication: {
    partner: 'abcd',
    content: 'video'
  },
  enabled: true,
  taxonomy: {
    affiliate: 'sample',
    channels: ['sport', 'fussball', 'bundesliga'],
    content: 'video'
  },
  custom: [
    {
      key: 'showroom',
      value: ['vast2i_preroll']
    }
  ],
  video: {
    blocks: {
      pre: {
        slots: {
          preroll: {  },
          sponsor: { enabled: false }
        }
      },
      mid: {
        slots: {
          presplit: { enabled: false, count: 2 },
          midroll: { enabled: true, count: 3 },
          postsplit: { enabled: false }
        }
      },
      post: {
        slots: {
          sponsor: { enabled: false },
          postroll: {  }
        }
      }
    }
  },
  display: {
    performance1: {
      enabled: true,
      custom: [{
        key: 'keywords',
        value: ['cars', 'holiday', 'sports']
      }]
    },
    inread1: {
      enabled: true
    }
  },
  exclusion: ['alk', 'bet']
};

data = autoDefaults(Schema, data);

validate(data, { verbose: true, greedy: true  });
console.log('\n\n-------\n\n');
console.log(validate.errors === null ? 'Validates!' : validate.errors);
console.log('\n\n-------');
console.log('result = ', JSON.stringify(data));
console.log('-------\n\n');
