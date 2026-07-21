module.exports = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    // No code — redirect to GitHub OAuth
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers.host;
    const redirectUri = `${protocol}://${host}/api/callback`;

    const authorizeUrl =
      `https://github.com/login/oauth/authorize` +
      `?client_id=${process.env.OAUTH_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=repo,user`;

    return res.redirect(authorizeUrl);
  }

  // Exchange code for access token
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code,
    }),
  });

  const data = await response.json();

  if (data.error) {
    return res
      .status(400)
      .send(
        `<html><body><h2>Error: ${data.error_description || data.error}</h2></body></html>`
      );
  }

  // Redirect back to admin with token in URL fragment
  res.send(`
    <html>
    <body><script>
      window.location.href = window.location.origin + '/admin/#access_token=' + encodeURIComponent(${JSON.stringify(data.access_token)});
    </script></body>
    </html>
  `);
};
