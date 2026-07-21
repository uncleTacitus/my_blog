module.exports = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    res.status(400).send("Missing code parameter");
    return;
  }

  // Exchange code for access token
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code,
    }),
  });

  const data = await response.json();

  if (data.error) {
    res.status(400).send(
      `<html><body><h2>Error: ${data.error_description || data.error}</h2></body></html>`
    );
    return;
  }

  // Standard Decap CMS OAuth callback:
  // Post the token back to the CMS opener window via postMessage
  const token = data.access_token;
  const content = `
    <html>
    <body>
    <script>
      (function() {
        function receiveMessage(message) {
          if (message.data === 'authorizing:github') {
            window.removeEventListener('message', receiveMessage, false);
            var origin = window.location.origin;
            window.opener.postMessage('authorization:github:success:${token}', origin);
            window.close();
          }
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
    </body>
    </html>
  `;
  
  res.setHeader("Content-Type", "text/html");
  res.send(content);
};
