
var config = require('../../config');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
  // 昵称
  nickname: String,
  // 最近一次重置昵称的事件
  nickname_reset_at: { type: Date, default: Date.now },

  // 创建日期
  create_at: { type: Date, default: Date.now },
  // 最近一次登录
  last_sign_at: { type: Date, default: Date.now },

  // 屏蔽用户
  blocked: { type: Boolean, default: false },
  // 限制发送消息
  disable_send_reply: { type: Date, default: Date.now },
  // 用户等级
  // 100 后台管理员
  role: { type: Number, default: 0 },

  // 头像
  avatar: { type: String, default: '' },
  // 性别
  gender: { type: Number, default: 0 },
  // 简介,一句话介绍自己，70个字符限制
  brief: { type: String, default: '' },

  // 用户注册来源 0->iPhone, 1->iPad, 2->Android, 3->H5, 4->网站
  source: { type: Number, default: 0 },

  // 帖子累积
  posts_count: { type: Number, default: 0 },
  // 评论累计
  comment_count: { type: Number, default: 0 },
  // 粉丝累计
  fans_count: { type: Number, default: 0 },

  // 获取赞的累计
  like_count: { type: Number, default: 0 },

  // 用户关注的人
  follow_people: [{ type: ObjectId, ref: 'User' }],
  follow_people_count: { type: Number, default: 0 },

  // 用户关注的节点
  follow_topic: [{ type: ObjectId, ref: 'Topic' }],
  follow_topic_count: { type: Number, default: 0 },

  follow_posts: [{ type: ObjectId, ref: 'Posts' }],
  follow_posts_count: { type: Number, default: 0 },

  // 最近一次查询Notification的日期
  find_notification_at: { type: Date },

  access_token: { type: String }
});


UserSchema.virtual('avatar_url').get(function () {

  var url = this.avatar ? this.avatar.replace('!200', '!50') : config.defaultAvatar
  url += url.indexOf('thumbnail') != -1 ? '/quality/90' : ''

  return url

});

UserSchema.set('toJSON', { getters: true });

mongoose.model('User', UserSchema);
