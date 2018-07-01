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
   * 获取番茄详情
   * @param {ObjectId} id - 番茄id
   * @returns {Promise<tomato>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((tomato) => {
        if (tomato) {
          return tomato;
        }
        const err = createError(404, '此番茄不存在');
        return Promise.reject(err);
      });
  },

  /**
   * 番茄列表（支持分页，创建时间倒序排列）
   * @param {number} skip - 偏移量.
   * @param {number} limit - 每页个数
   * @returns {Promise<tomato[]>}
   */
  list({ skip = 0, limit = 5 } = {}) {
    return this.find()
      .sort({ createdDate: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};

module.exports = mongoose.model('Tomato', TomatoSchema);
