module.exports = async (req, res) => {
  // This is the OAuth entry point.
  // Decap CMS calls this endpoint when user clicks "Login with GitHub".
  // We redirect to GitHub's OAuth authorization page.
  
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host;
  const redirectUri = `${protocol}://${host}/api/callback`;

  const authorizeUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${process.env.OAUTH_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=repo,user` +
    `&response_type=code`;

  res.writeHead(302, { Location: authorizeUrl });
  res.end();
};
