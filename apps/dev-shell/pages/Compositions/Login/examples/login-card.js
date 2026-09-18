export default {
  styles: [
    "/pureui/styles/main.css",
    "/pureui/styles/card.css",
    "/pureui/styles/button.css",
    "/pureui/styles/a-tag.css",
    "/pureui/styles/Form/form.css",
    "/pureui/styles/Form/field.css",
    "/pureui/styles/Form/label.css",
    "/pureui/styles/Form/input/input.css",
    "/pureui/styles/Layout/box.css",
    "/pureui/styles/Layout/layout.css",
    "/pureui/styles/Layout/behavior.css",
  ],
  markup: String.raw`<div class="pu-box box-xl" data-layout="center-center" data-behavior="expand">
  <article class="pu-card card-lg" data-behavior="compact">
    <header class="card-header">
      <h2 class="card-title">Login to your account</h2>
      <p class="card-subtitle">Enter your email below to login to your account</p>
    </header>

    <div class="card-body">
      <form class="pu-form form-md" id="login-form" method="dialog">
        <div class="pu-field">
          <label class="pu-label" for="login-email">Email</label>
          <input id="login-email" class="pu-input" type="email" name="email" placeholder="m@example.com" autocomplete="email" required />
        </div>

        <div class="pu-field">
          <div data-layout="center-between" data-gap="sm">
            <label class="pu-label" for="login-password">Password</label>
            <a class="pu-link" href="#reset">Forgot your password?</a>
          </div>
          <input id="login-password" class="pu-input" type="password" name="password" autocomplete="current-password" required />
        </div>
      </form>
    </div>

    <footer class="card-footer" data-direction="vertical" data-layout="center-top" data-gap="sm">
      <button class="pu-btn btn-md" type="submit" form="login-form" data-behavior="inline-expand">Login</button>
      <button class="pu-btn btn-md btn-outline" type="button" data-behavior="inline-expand">Login with Google</button>
      <p class="card-subtitle">Don't have an account? <a class="pu-link" href="#signup">Sign up</a></p>
    </footer>
  </article>
</div>`,
};
