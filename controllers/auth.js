const exchangeCodeForTokens = async (req, res, next) => {
  const { code /* state */ } = req.query;
  res.json({
    code
  });
};

exports.exchangeCodeForTokens = exchangeCodeForTokens;
