export default {
  styles: [
    "/pureui/styles/main.css",
    "/pureui/styles/menu.css",
    "/pureui/styles/Layout/box.css",
    "/pureui/styles/Layout/layout.css",
    "/pureui/styles/button.css",
    "/pureui/styles/badge.css",
    "/pureui/styles/avatar.css",
  ],
  markup: String.raw`<aside aria-label="Atlas project">
  <nav aria-label="Project navigation">
    <div class="pu-menu menu-sm menu-inline menu-indent-none">
      <ul class="menu-content" role="list">
        <li class="menu-item">
          <a class="pu-btn btn-sm btn-ghost menu-control" href="#atlas">
            <span class="pu-avatar avatar-xs avatar-smooth" aria-hidden="true">A</span>
            <strong>Atlas</strong>
          </a>
        </li>
        <li class="menu-separator" aria-hidden="true"></li>
        <li class="menu-item">
          <a class="pu-btn btn-sm btn-ghost menu-control" href="#overview" aria-current="page">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <rect x="4" y="4" width="6" height="6" rx="1" />
              <rect x="14" y="4" width="6" height="6" rx="1" />
              <rect x="4" y="14" width="6" height="6" rx="1" />
              <rect x="14" y="14" width="6" height="6" rx="1" />
            </svg>
            Overview
          </a>
        </li>
        <li class="menu-item">
          <a class="pu-btn btn-sm btn-ghost menu-control" href="#issues">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v6M12 17h.01" />
            </svg>
            Issues
            <span class="menu-shortcut"><span class="pu-badge badge-sm badge-rounded">12</span></span>
          </a>
        </li>
        <li class="menu-item">
          <a class="pu-btn btn-sm btn-ghost menu-control" href="#roadmap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M5 5h14M5 12h9M5 19h12" />
            </svg>
            Roadmap
          </a>
        </li>
        <li class="menu-separator" aria-hidden="true"></li>
        <li class="menu-title">Views</li>
        <li class="menu-item">
          <a class="pu-btn btn-sm btn-ghost menu-control" href="#active">Active<span class="menu-shortcut">24</span></a>
        </li>
        <li class="menu-item">
          <a class="pu-btn btn-sm btn-ghost menu-control" href="#backlog">Backlog<span class="menu-shortcut">86</span></a>
        </li>
        <li class="menu-item">
          <a class="pu-btn btn-sm btn-ghost menu-control" href="#completed">Completed</a>
        </li>
        <li class="menu-separator" aria-hidden="true"></li>
        <li class="menu-item">
          <button class="pu-btn btn-sm btn-ghost menu-control" type="button">Project settings</button>
        </li>
      </ul>
    </div>
  </nav>
</aside>`,
};
