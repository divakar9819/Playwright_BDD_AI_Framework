import express from "express";

const app = express();
const port = Number(process.env.DEMO_PORT ?? 4173);

app.get("/", (_req, res) => res.redirect("/login"));

app.get("/login", (_req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Demo Portal | Sign in</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 440px; margin: 8vh auto; padding: 24px; color: #202124; }
    form { display: grid; gap: 12px; }
    label { display: grid; gap: 6px; }
    input, button { padding: 10px; font-size: 16px; }
    button { cursor: pointer; }
    #message { min-height: 24px; }
  </style>
</head>
<body>
  <main>
    <h1>Sign in</h1>
    <p>Local demo application for automation practice.</p>
    <form id="login-form">
      <label for="email">Email
        <input id="email" name="email" type="email" autocomplete="username" required>
      </label>
      <label for="password">Password
        <input id="password" name="password" type="password" autocomplete="current-password" required>
      </label>
      <button type="submit">Sign in</button>
    </form>
    <p id="message" role="status" aria-live="polite"></p>
  </main>
  <script>
    const form = document.querySelector("#login-form");
    const message = document.querySelector("#message");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      if (email === "qa.user@example.com" && password === "Password123!") {
        message.textContent = "Welcome, QA User!";
        message.dataset.status = "success";
      } else {
        message.textContent = "Invalid email or password";
        message.dataset.status = "error";
      }
    });
  </script>
</body>
</html>`);
});

app.listen(port, "127.0.0.1", () => {
  console.log(`Demo app running at http://127.0.0.1:${port}`);
});
