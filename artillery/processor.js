const { faker }=require('@faker-js/faker')

function getNameAndAge(requestParams, ctx, ee, next) {
  ctx.vars["name"] = faker.name.fullName();
  ctx.vars["age"] = faker.random.numeric(2);

    return next();
}


module.exports = {
  getNameAndAge,
};
