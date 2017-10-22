const _ = require('lodash');

const retrieve = async ctx => {
  // since we already have the user object
  // just send it over as a response
  ctx.body = ctx.state.user;
};

const update = async ctx => {
  // set fields we allow to be updated
  const fields = ['email', 'display_name', 'given_name', 'family_name', 'avatar_url'];

  // extend the user object
  // (basically overwrites or "extends" the existing fields)
  ctx.state.user = _.extend(ctx.state.user, _.pick(ctx.request.body, fields));

  // save the user (allow mongoose to handle validation)
  ctx.state.user = await ctx.state.user.save();

  // send the response
  ctx.body = ctx.state.user;
};

module.exports = { retrieve, update };
