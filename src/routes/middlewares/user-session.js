const User = require('../../models/user');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomNamePicker() {
  const names = [
    'Jon',
    'Danaerys',
    'Sansa',
    'Ned',
    'Hodor'
  ];

  const lastNames = [
    'Snow',
    'Targarien',
    'Stark',
    'Hodor'
  ];


  const name = names[getRandomInt(names.length - 1)];
  const lastName = lastNames[getRandomInt(lastNames.length - 1)];
  return `${name} ${lastName}`;
}

async function userSessionCheckMiddleware(ctx, next) {
  const { session } = ctx;
  if (session.isNew) {
    const newUser = new User({ name: randomNamePicker() });
    await newUser.save();

    session.user_id = newUser._id;
  }

  if (ctx.cookies.get('limehome:user_id') !== session.user_id) {
    ctx.cookies.set('limehome:user_id', session.user_id,
      {
        httpOnly: false // <- For the sake of the test only
      }
    );
  }

  ctx.user = {
    id: session.user_id
  };

  return next();
}

module.exports = userSessionCheckMiddleware;