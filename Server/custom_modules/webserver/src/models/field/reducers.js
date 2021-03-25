const _defaults = {
  name: { _type: "string" },
  value: { _type: "string" }
};

const text = {
  ..._defaults
};

const json = {
  ..._defaults
};

const button = {
  ..._defaults,
  attributes: {
    value: { _type: "string", _default: "BUTTON_CLICK" }
  }
};

const _switch = {
  ..._defaults,
  attributes: {
    values: { _type: "array", _of: "string", _default: [] }
  }
};

const thermometer = {
  ..._defaults,
  attributes: {
    min: { _type: "number", _default: "-20" },
    max: { _type: "number", _default: "50" }
  }
};

const fieldReducer = (
  state = { text, json, button, swithc: _switch, thermometer }
) => {
  return state;
};

export const rootReducer = fieldReducer;
