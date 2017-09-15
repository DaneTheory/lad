const jsonSelect = require('mongoose-json-select');
const beautifulValidation = require('mongoose-beautiful-unique-validation');
const validationErrorTransform = require('mongoose-validation-error-transform');

const config = require('../../../config');

function CommonPlugin(object) {
  return function(Schema) {
    Schema.add({
      id: {
        type: String,
        required: true,
        index: true,
        unique: true
      },
      created_at: {
        type: Date,
        required: true
      },
      updated_at: {
        type: Date,
        required: true
      },
      object: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
      }
    });

    Schema.pre('validate', function(next) {
      this.object = object;
      this.created_at = this._id.getTimestamp();
      this.updated_at = Date.now();
      this.id = this._id.toString();
      next();
    });

    Schema.virtual('locale')
      .get(function() {
        return this.__locale;
      })
      .set(function(locale) {
        this.__locale = locale;
      });

    Schema.plugin(
      jsonSelect,
      config.omitCommonFields.map(field => `-${field}`).join(' ')
    );
    Schema.plugin(beautifulValidation);
    Schema.plugin(validationErrorTransform);

    return Schema;
  };
}

module.exports = CommonPlugin;
