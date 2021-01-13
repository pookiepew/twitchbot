const getCodeFromTwitch = async (req, res, next) => {
  res.status(200).json({
    msg: 'working',
  });
};

const exchangeCodeForTokens = async (req, res, next) => {
  const { code /* state */ } = req.query;
  res.status(200).json({
    code,
  });
};

exports.exchangeCodeForTokens = exchangeCodeForTokens;
exports.getCodeFromTwitch = getCodeFromTwitch;
