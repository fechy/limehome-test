const simplifyResults = function (rawResults) {
  return rawResults.reduce((acc, row) => {
    const { name, id, vicinity: address } = row;
    acc.push({ id, name, address });
    return acc;
  }, []);
};

module.exports = async (ctx) => {
  try {
    const { data, status } = await ctx.places.get('hotel');
    ctx.response.statusCode = status;
    ctx.body = JSON.stringify(simplifyResults(data.results));
  } catch (e) {
    console.error(e);
    ctx.statusCode = 400;
    ctx.body = e.toString();
  }
};