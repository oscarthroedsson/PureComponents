export default {
  styles: [
    "/pureui/styles/main.css",
    "/pureui/styles/Menu/menu.css",
    "/pureui/styles/Layout/box.css",
    "/pureui/styles/Layout/layout.css",
    "/pureui/styles/button.css",
    "/pureui/styles/badge.css",
    "/pureui/styles/avatar.css",
    "/pureui/styles/meter.css",
    "/pureui/styles/Form/input/input.css",
  ],
  markup: String.raw`<aside aria-label="Northwind workspace">
  <nav aria-label="Workspace navigation">
    <div class="pu-menu menu-md menu-inline menu-indent-none">
      <ul class="menu-content" role="list">
        <li class="menu-item">
          <a class="pu-btn btn-md btn-ghost menu-control" href="#workspace">
            <span class="pu-avatar avatar-sm avatar-smooth" aria-hidden="true">N</span>
            <strong>Northwind</strong>
            <span class="menu-shortcut" aria-hidden="true">⌄</span>
          </a>
        </li>

        <li class="menu-separator" aria-hidden="true"></li>

        <li class="menu-item">
          <div class="pu-box box-sm box-y">
            <button class="pu-btn btn-md btn-rounded" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
              New
            </button>
          </div>
        </li>
        <li class="menu-item">
          <div class="pu-box box-sm box-y">
            <span class="pu-input-group">
              <svg class="input-icon" data-placement="start" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 4 4" />
              </svg>
              <input class="pu-input input-sm" type="search" aria-label="Search workspace" placeholder="Search" />
            </span>
          </div>
        </li>

        <li class="menu-title">Workspace</li>
        <li class="menu-item">
          <a class="pu-btn btn-md btn-ghost menu-control" href="#home" aria-current="page">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M4 10.5 12 4l8 6.5V20H4v-9.5Z" />
              <path d="M9 20v-6h6v6" />
            </svg>
            Home
          </a>
        </li>
        <li class="menu-item">
          <a class="pu-btn btn-md btn-ghost menu-control" href="#recent">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            Recent
            <span class="menu-shortcut"><span class="pu-badge badge-sm badge-rounded">9</span></span>
          </a>
        </li>
        <li class="menu-item">
          <a class="pu-btn btn-md btn-ghost menu-control" href="#starred">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
            </svg>
            Starred
          </a>
        </li>

        <li class="menu-separator" aria-hidden="true"></li>
        <li class="menu-title">Projects</li>
        <li class="menu-item">
          <details class="pu-menu menu-md menu-inline" open>
            <summary class="pu-btn btn-md btn-ghost menu-trigger menu-control">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path d="M3 7h6l2 2h10v10H3V7Z" />
              </svg>
              Design system
              <span class="menu-marker" aria-hidden="true">›</span>
            </summary>
            <ul class="menu-content" role="list" aria-label="Design system">
              <li class="menu-item">
                <a class="pu-btn btn-md btn-ghost menu-control" href="#foundations">Foundations</a>
              </li>
              <li class="menu-item">
                <a class="pu-btn btn-md btn-ghost menu-control" href="#elements">Elements<span class="menu-shortcut">38</span></a>
              </li>
              <li class="menu-item">
                <a class="pu-btn btn-md btn-ghost menu-control" href="#compositions">Compositions<span class="menu-shortcut">2</span></a>
              </li>
            </ul>
          </details>
        </li>

        <li class="menu-separator" aria-hidden="true"></li>
        <li class="menu-title">Storage</li>
        <li class="menu-item">
          <div class="pu-box box-sm">
            <div class="pu-meter-wrapper">
              <label class="meter-label" for="workspace-storage">8.2 GB of 15 GB</label>
              <span class="meter-value">55%</span>
              <meter id="workspace-storage" class="pu-meter meter-sm" value="55" min="0" max="100" low="70" high="90" optimum="30"></meter>
            </div>
          </div>
        </li>

        <li class="menu-separator" aria-hidden="true"></li>
        <li class="menu-item">
          <button class="pu-btn btn-md btn-ghost menu-control" type="button">
            <span class="pu-avatar avatar-sm avatar-rounded" aria-hidden="true">OT</span>
            Oscar Throedsson
            <span class="menu-shortcut">Free</span>
          </button>
        </li>
      </ul>
    </div>
  </nav>
</aside>`,
};
