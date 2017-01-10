const requiredString = {
  required: true,
  type: 'string'
};

const requiredBoolean = {
  required: true,
  type: 'boolean'
};

const optionalNumber = {
  required: false,
  type: 'number'
};

const requiredStringArray = {
  type: 'array',
  required: true,
  default: [],
  items: {
    type: 'string'
  }
};

const requiredDefaultTrue = {
  required: true,
  type: 'boolean',
  default: true
};

const keyValuePairsArray = {
  type: 'array',
  required: true,
  default: [],
  items: {
    type: 'object',
    additionalProperties: false,
    properties: {
      key: requiredString,
      value: {
        type: ['null', 'boolean', 'object', 'array', 'number', 'string'],
        required: true
      }
    }
  }
};

const optionalString = {
  required: false,
  type: 'string'
};


const videoSlot = {
  type: 'object',
  additionalProperties: false,
  required: false,
  properties: {
    enabled: requiredDefaultTrue,
    custom: keyValuePairsArray,
    count: optionalNumber
  }
};

function videoBlock(slots) {
  return {
    additionalProperties: false,
    required: false,
    type: 'object',
    properties: {
      enabled: requiredDefaultTrue,
      slots: {
        additionalProperties: false,
        type: 'object',
        properties: slots
      }
    }
  };
}

const video = {
  required: false,
  type: 'object',
  additionalProperties: false,
  properties: {
    blocks: {
      required: true,
      type: 'object',
      properties: {
        pre: videoBlock({
          preroll: videoSlot,
          sponsor: videoSlot
        }),
        mid: videoBlock({
          presplit: videoSlot,
          midroll: videoSlot,
          postsplit: videoSlot
        }),
        post: videoBlock({
          sponsor: videoSlot,
          postroll: videoSlot
        }),
        overlay: videoBlock({
          overlay: videoSlot
        }),
        pause: videoBlock({
          pauseroll: videoSlot
        })
      }
    },
    longplay: {
      type: 'boolean',
      required: true,
      default: false
    },
    autoplay: {
      type: 'boolean',
      required: true,
      default: true
    }
  }
};

const displaySlot = {
  type: 'object',
  additionalProperties: false,
  required: false,
  properties: {
    enabled: requiredBoolean,
    custom: keyValuePairsArray
  }
};

const displayProduct = {
  type: 'object',
  additionalProperties: false,
  required: false,
  properties: {
    enabled: requiredBoolean
  }
};

const displayProducts = {
  required: true,
  type: 'object',
  additionalProperties: false,
  default: {},
  properties: {
    // display
    popUp: displayProduct,
    popUnder: displayProduct,
    flashLayer: displayProduct,
    interstitialSpotTandem: displayProduct,
    flashLayerTandem: displayProduct,
    streaming: displayProduct,
    homepageEventXXL: displayProduct,
    banderoleAd: displayProduct,
    baseBoard: displayProduct,
    superBanner: displayProduct,
    fireplace: displayProduct,
    wallpaper: displayProduct,
    billboard: displayProduct,
    pushDown: displayProduct,
    powerBanner: displayProduct,
    wideSkyscraper: displayProduct,
    sitebar: displayProduct,
    doubleSitebar: displayProduct,
    mediumRectangle: displayProduct,
    halfPage: displayProduct,
    mobileLayer: displayProduct,
    mobileBanner: displayProduct,
    mobileBanner2: displayProduct,
    inread: displayProduct,
    mobileInread: displayProduct,
    mediumRectangle2: displayProduct,
    mediumRectangle3: displayProduct,
    mediumRectangle4: displayProduct,
    mediumRectangle5: displayProduct,
    mediumRectangle6: displayProduct,
    custom1: displayProduct,
    custom2: displayProduct,
    custom3: displayProduct,
    custom4: displayProduct,
    custom5: displayProduct,
    custom6: displayProduct,
    sponsorLabel1: displayProduct,
    sponsorLabel2: displayProduct,
    sponsorLabel3: displayProduct
  }
};

const display = {
  required: false,
  type: 'object',
  additionalProperties: false,
  properties: {
    popup1: displaySlot,
    fullbanner2: displaySlot,
    skyscraper1: displaySlot,
    rectangle1: displaySlot,
    mlayer1: displaySlot,
    mbanner1: displaySlot,
    mbanner2: displaySlot,
    inread1: displaySlot,
    minread1: displaySlot,
    promo1: displaySlot,
    promo2: displaySlot,
    promo3: displaySlot,
    promo4: displaySlot,
    promo5: displaySlot,
    performance1: displaySlot,
    performance2: displaySlot,
    performance3: displaySlot,
    performance4: displaySlot,
    performance5: displaySlot,
    performance6: displaySlot,
    ateaser: displaySlot,
    bteaser: displaySlot,
    cteaser: displaySlot
  }
};

const syndication = {
  type: 'object',
  additionalProperties: false,
  required: true,
  properties: {
    partner: requiredString,
    content: requiredString
  }
};

const taxonomy = {
  type: 'object',
  additionalProperties: false,
  required: true,
  properties: {
    affiliate: requiredString,
    channels: requiredStringArray,
    content: {
      enum: ['content', 'gallery', 'video', 'liveticker']
    }
  }
};

const config = {
  type: 'object',
  required: true,
  additionalProperties: false,
  properties: {
    host: {
      type: 'string',
      required: true,
      default: '//ad.71i.de/somtag/'
    },
    corePath: {
      type: 'string',
      required: true,
      default: 'core/video-only/video-only.adtec-core.js'
    },
    uuIdIframePath: {
      type: 'string',
      required: true,
      default: 'core/video-only/uuid.html'
    },
    id: { // this is used to construct the sitescript url
      type: 'string',
      required: true
    }
  }
};

const validateEmbedConfigSpec = {
  additionalProperties: false,
  type: 'object',
  required: true,
  properties: {
    config,
    syndication,
    taxonomy,
    video,
    display,
    products: displayProducts,
    enabled: {
      type: 'boolean',
      required: true,
      default: true
    },
    keywords: requiredStringArray,
    custom: keyValuePairsArray,
    exclusion: requiredStringArray,
    advertiser: optionalString
  }
};

module.exports = validateEmbedConfigSpec;
