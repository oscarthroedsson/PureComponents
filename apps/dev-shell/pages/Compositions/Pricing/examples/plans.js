export default {
  styles: [
    "/pureui/styles/main.css",
    "/pureui/styles/table.css",
    "/pureui/styles/button.css",
    "/pureui/styles/tabs.css",
    "/pureui/styles/tooltip.css",
    "/pureui/styles/Layout/box.css",
    "/pureui/styles/Layout/layout.css",
    "/pureui/styles/Layout/behavior.css",
    "./Pricing/examples/plans.css",
  ],
  markup: String.raw`<section class="pricing pu-box box-xl" aria-labelledby="pricing-title" data-direction="vertical" data-layout="center-top" data-gap="md">
  <header data-direction="vertical" data-layout="center-top" data-gap="xs">
    <h2 id="pricing-title">Pricing</h2>
    <p>Compare what each plan includes.</p>
  </header>

  <div data-layout="center-center" data-gap="sm">
    <p>Billing</p>
    <fieldset class="pu-tabs tabs-sm">
      <legend class="tabs-legend">Billing period</legend>
      <div class="tabs-header">
        <label class="tabs-tab">
          <input class="tabs-input" type="radio" name="billing" value="annual" checked />
          <span>Annual</span>
        </label>
        <label class="tabs-tab">
          <input class="tabs-input" type="radio" name="billing" value="monthly" />
          <span>Monthly</span>
        </label>
      </div>
    </fieldset>
  </div>

  <table class="pu-table table-md" aria-label="Plan comparison" data-behavior="inline-expand">
    <thead>
      <tr>
        <th scope="col" class="table-bottom">Feature</th>
        <th scope="col" class="table-center">
          <div data-direction="vertical" data-layout="center-top" data-gap="sm">
            <h3>Free</h3>
            <p>Quis suspendisse ut fermentum neque vivamus.</p>
            <p><strong>$0</strong> /month</p>
            <button class="pu-btn btn-md" type="button" disabled>Get started</button>
          </div>
        </th>
        <th scope="col" class="table-center">
          <div data-direction="vertical" data-layout="center-top" data-gap="sm">
            <h3>Pro</h3>
            <p>Quis eleifend a tincidunt pellentesque.</p>
            <p><strong>$10</strong> /month</p>
            <button class="pu-btn btn-md" type="button" disabled>Get started</button>
          </div>
        </th>
        <th scope="col" class="table-center">
          <div data-direction="vertical" data-layout="center-top" data-gap="sm">
            <h3>Premium</h3>
            <p>Orci volutpat ut sed sed neque, dui eget.</p>
            <p><strong>$15</strong> /month</p>
            <button class="pu-btn btn-md" type="button" disabled>Get started</button>
          </div>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <th scope="colgroup" colspan="4">Key features</th>
      </tr>
      <tr>
        <th scope="row">
          <div data-layout="center-between" data-gap="sm">
            Live collaboration
            <button class="pu-btn btn-sm btn-ghost" type="button" data-icon-only="true" aria-label="About live collaboration" aria-describedby="feature-1-tip" interestfor="feature-1-tip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v5m0-8.5v.01" /></svg>
              <span id="feature-1-tip" class="pu-tooltip tooltip-sm" role="tooltip" popover="hint">Everyone edits the same board at the same time.</span>
            </button>
          </div>
        </th>
        <td class="table-center"><svg role="img" aria-label="Included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7" /></svg></td>
        <td class="table-center"><svg role="img" aria-label="Included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7" /></svg></td>
        <td class="table-center"><svg role="img" aria-label="Included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7" /></svg></td>
      </tr>
      <tr>
        <th scope="row">
          <div data-layout="center-between" data-gap="sm">
            Unlimited projects
            <button class="pu-btn btn-sm btn-ghost" type="button" data-icon-only="true" aria-label="About unlimited projects" aria-describedby="feature-2-tip" interestfor="feature-2-tip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v5m0-8.5v.01" /></svg>
              <span id="feature-2-tip" class="pu-tooltip tooltip-sm" role="tooltip" popover="hint">No cap on how many projects a workspace holds.</span>
            </button>
          </div>
        </th>
        <td class="table-center"><svg role="img" aria-label="Included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7" /></svg></td>
        <td class="table-center"><svg role="img" aria-label="Included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7" /></svg></td>
        <td class="table-center"><svg role="img" aria-label="Included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7" /></svg></td>
      </tr>
      <tr>
        <th scope="row">
          <div data-layout="center-between" data-gap="sm">
            Custom permissions
            <button class="pu-btn btn-sm btn-ghost" type="button" data-icon-only="true" aria-label="About custom permissions" aria-describedby="feature-3-tip" interestfor="feature-3-tip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v5m0-8.5v.01" /></svg>
              <span id="feature-3-tip" class="pu-tooltip tooltip-sm" role="tooltip" popover="hint">Decide per person what each project allows.</span>
            </button>
          </div>
        </th>
        <td class="table-center"><svg role="img" aria-label="Not included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 12h12" /></svg></td>
        <td class="table-center"><svg role="img" aria-label="Included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7" /></svg></td>
        <td class="table-center"><svg role="img" aria-label="Included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7" /></svg></td>
      </tr>
      <tr>
        <th scope="row">
          <div data-layout="center-between" data-gap="sm">
            Team members
            <button class="pu-btn btn-sm btn-ghost" type="button" data-icon-only="true" aria-label="About team members" aria-describedby="feature-4-tip" interestfor="feature-4-tip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v5m0-8.5v.01" /></svg>
              <span id="feature-4-tip" class="pu-tooltip tooltip-sm" role="tooltip" popover="hint">Invite people outside your own workspace.</span>
            </button>
          </div>
        </th>
        <td class="table-center"><svg role="img" aria-label="Not included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 12h12" /></svg></td>
        <td class="table-center"><svg role="img" aria-label="Not included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 12h12" /></svg></td>
        <td class="table-center"><svg role="img" aria-label="Included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7" /></svg></td>
      </tr>
    </tbody>

    <tbody>
      <tr>
        <th scope="colgroup" colspan="4">Reporting</th>
      </tr>
      <tr>
        <th scope="row">
          <div data-layout="center-between" data-gap="sm">
            Basic reports
            <button class="pu-btn btn-sm btn-ghost" type="button" data-icon-only="true" aria-label="About basic reports" aria-describedby="feature-5-tip" interestfor="feature-5-tip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v5m0-8.5v.01" /></svg>
              <span id="feature-5-tip" class="pu-tooltip tooltip-sm" role="tooltip" popover="hint">Usage and activity for the last 30 days.</span>
            </button>
          </div>
        </th>
        <td class="table-center"><svg role="img" aria-label="Included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7" /></svg></td>
        <td class="table-center"><svg role="img" aria-label="Included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7" /></svg></td>
        <td class="table-center"><svg role="img" aria-label="Included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7" /></svg></td>
      </tr>
      <tr>
        <th scope="row">
          <div data-layout="center-between" data-gap="sm">
            Advanced reports
            <button class="pu-btn btn-sm btn-ghost" type="button" data-icon-only="true" aria-label="About advanced reports" aria-describedby="feature-6-tip" interestfor="feature-6-tip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v5m0-8.5v.01" /></svg>
              <span id="feature-6-tip" class="pu-tooltip tooltip-sm" role="tooltip" popover="hint">Break a report down by project, person or label.</span>
            </button>
          </div>
        </th>
        <td class="table-center"><svg role="img" aria-label="Not included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 12h12" /></svg></td>
        <td class="table-center"><svg role="img" aria-label="Included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7" /></svg></td>
        <td class="table-center"><svg role="img" aria-label="Included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7" /></svg></td>
      </tr>
      <tr>
        <th scope="row">
          <div data-layout="center-between" data-gap="sm">
            Custom reports
            <button class="pu-btn btn-sm btn-ghost" type="button" data-icon-only="true" aria-label="About custom reports" aria-describedby="feature-7-tip" interestfor="feature-7-tip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v5m0-8.5v.01" /></svg>
              <span id="feature-7-tip" class="pu-tooltip tooltip-sm" role="tooltip" popover="hint">Build a report from the fields you choose.</span>
            </button>
          </div>
        </th>
        <td class="table-center"><svg role="img" aria-label="Not included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 12h12" /></svg></td>
        <td class="table-center"><svg role="img" aria-label="Not included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 12h12" /></svg></td>
        <td class="table-center"><svg role="img" aria-label="Included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7" /></svg></td>
      </tr>
      <tr>
        <th scope="row">
          <div data-layout="center-between" data-gap="sm">
            Export data
            <button class="pu-btn btn-sm btn-ghost" type="button" data-icon-only="true" aria-label="About export data" aria-describedby="feature-8-tip" interestfor="feature-8-tip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v5m0-8.5v.01" /></svg>
              <span id="feature-8-tip" class="pu-tooltip tooltip-sm" role="tooltip" popover="hint">Download any report as CSV.</span>
            </button>
          </div>
        </th>
        <td class="table-center"><svg role="img" aria-label="Not included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 12h12" /></svg></td>
        <td class="table-center"><svg role="img" aria-label="Not included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 12h12" /></svg></td>
        <td class="table-center"><svg role="img" aria-label="Included" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7" /></svg></td>
      </tr>
    </tbody>
  </table>
</section>`,
};
