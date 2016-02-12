'use strict';

import _ from 'lodash';
import is from 'is_js';

function parseIntOrNull(object) {
  return (isNaN(parseInt(object)) ? null : parseInt(object));
}

class BaseModel {
  static hasMany(name, targetClass) {
    /* eslint complexity: [0, 6] */
    if (!this.prototype[`_get_${name}`]) {
      this.prototype[`_get_${name}`] = function (v) {
        return this[name];
      };
    }


    if (!this.prototype[`_update_${name}`]) {
      this.prototype[`_update_${name}`] = function (v) {
        if (!this.state[name]) this.state[name] = {};

        _.each(v, (props) => {
          let id = props && props.id;
          if (!id) return;
          if (this.state[name][id]) {
            this.state[name][id].update(props);
          } else {
            this.state[name][id] = new targetClass(props);
          }

          this.state[name][id]._updatedAt = new Date().getTime();
        });
      };
    }

    if (!this.prototype[`_destroy_${name}`]) {
      this.prototype[`_destroy_${name}`] = function (v) {
        if (!this.state[name]) return [];

        _.each(v || [], (props) => {
          let id = props && props.id;
          if (!id) return;
          if (this.state[name][id]) {
            this.state[name][id].destroy(props);
            if (props._destroyed) delete this.state[name][id];
          }
        });
      };
    }

    if (!this.prototype[`_${name}_as_json`]) {
      this.prototype[`_${name}_as_json`] = function () {
        if (!this.state[name]) return [];

        return _.map(this.state[name], (model) => {
          return model.asJSON();
        });
      };
    }

    if (!(name in this.prototype)) {
      Object.defineProperty(this.prototype, name, {
        key         : name,
        enumerable  : false,
        configurable: true,
        get         : function () {
          return _.values(this.state[name]);
        }
      });
    }
  }

  static hasOne(name, targetClass, defaultID) {
    if (!this.prototype[`_get_${name}`]) {
      this.prototype[`_get_${name}`] = function (v) {
        return this[name];
      };
    }

    if (!this.prototype[`_update_${name}`]) {
      this.prototype[`_update_${name}`] = function (v) {
        if (this.state[name]) {
          this.state[name].update(v);
        } else {
          this.state[name] = new targetClass(v);
        }

        this.state[name]._updatedAt = new Date().getTime();
      };
    }

    if (!this.prototype[`_destroy_${name}`]) {
      this.prototype[`_destroy_${name}`] = function (v) {
        if (this.state[name]) {
          this.state[name].destroy(v);
          if (v._destroyed) delete this.state[name];
        }
      };
    }

    if (!this.prototype[`_${name}_as_json`]) {
      this.prototype[`_${name}_as_json`] = function () {
        if (this.state[name]) {
          return this.state[name].asJSON();
        }
      };
    }

    if (!(name in this.prototype)) {
      Object.defineProperty(this.prototype, name, {
        key         : name,
        enumerable  : false,
        configurable: true,
        get         : function () {
          return this.state[name] || new targetClass({id: defaultID});
        }
      });
    }
  }

  static find(id) {
    if (!this._instances) return null;
    return this._instances[parseIntOrNull(id)];
  }

  static isEncode(value) {
    return _.any([is.string, is.number, is.boolean, is.date, is.null, is.undefined], (m) => {
      return m.call(is, value);
    });
  }

  constructor(state) {
    this.state = {};
    this.update(state);

    if (!this.constructor._instances) this.constructor._instances = {};
    this.constructor._instances[this.id] = this;
  }

  update(state) {
    _.each(state || {}, (value, key) => {
      if (this[`_update_${key}`]) {
        this[`_update_${key}`](value);
      } else {
        this.state[key] = value;
      }

      this._updatedAt = new Date().getTime();
    });
  }

  destroy(state) {
    _.each(state || {}, (value, key) => {
      if (this[`_destroy_${key}`]) {
        this[`_destroy_${key}`](value);
      }
    });
  }

  toObject() {
    return _.object(_.map(_.keys(this.state), (key) => {
      if (this[`_get_${key}`]) {
        return [key, this[`_get_${key}`]()];
      } else {
        return [key, this.state[key]];
      }
    }));
  }

  asJSON() {
    let dict = _.map(this.state, (value, key) => {
      if (this[`_${key}_as_json`]) {
        return [key, this[`_${key}_as_json`]()];
      } else {
        if (BaseModel.isEncode(value))
          return [key, value];
      }
    });

    return _.object(_.compact(dict));
  }

  _update_id(v) {
    this.state.id = parseIntOrNull(v);
  }

  get id() {
    return (this.state || {}).id;
  }
}


export default BaseModel;
