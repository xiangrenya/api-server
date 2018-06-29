const createError = require('http-errors');
const mongoose = require('mongoose');

const TomatoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  status: {
    type: Number, // -1：预备中，0：未完成，1：已完成，2：进行中，3全部
    required: true,
  },
  startTime: {
    type: Date,
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
});

TomatoSchema.method({
});

TomatoSchema.statics = {
  /**
   * Get tomato
   * @param {ObjectId} id - The objectId of tomato.
   * @returns {Promise<tomato>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((tomato) => {
        if (tomato) {
          return tomato;
        }
        const err = createError(404, 'No such tomato exists!');
        return Promise.reject(err);
      });
  },

  /**
   * List tomatos in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of tomatos to be skipped.
   * @param {number} limit - Limit number of tomatos to be returned.
   * @returns {Promise<tomato[]>}
   */
  list({ skip = 0, limit = 5 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};

module.exports = mongoose.model('Tomato', TomatoSchema);
