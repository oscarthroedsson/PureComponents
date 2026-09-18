export default {
  styles: [
    "/pureui/styles/main.css",
    "/pureui/styles/card.css",
    "/pureui/styles/avatar.css",
    "/pureui/styles/Layout/box.css",
    "/pureui/styles/Layout/layout.css",
    "/pureui/styles/Layout/behavior.css",
    "./Testimonials/examples/wall.css",
  ],
  markup: String.raw`<section class="pu-box box-xl" aria-labelledby="wall-title" data-direction="vertical" data-layout="center-top" data-gap="lg">
  <header data-direction="vertical" data-layout="center-top" data-gap="xs">
    <h2 id="wall-title">Trusted by modern teams</h2>
    <p>Join thousands of product managers, designers, and developers who rely on Pulse to plan, track, and deliver work faster without the chaos.</p>
  </header>

  <div class="wall" data-behavior="inline-expand">
    <article class="pu-card card-md wall-wide">
      <header class="card-header">
        <p class="card-title">VORTEX</p>
      </header>
      <div class="card-body">
        <p>&ldquo;Pulse has completely changed the way we present our project workflows. We can create visual boards, share tasks instantly, and demo progress live. It&rsquo;s business-focused collaboration without the overhead.&rdquo;</p>
      </div>
      <footer class="card-footer">
        <div data-layout="center-start" data-gap="sm">
          <span class="pu-avatar avatar-sm avatar-rounded" aria-hidden="true">JB</span>
          <div>
            <p class="card-title">Julia Bennett</p>
            <p class="card-subtitle">Operations Director, Vortex Systems</p>
          </div>
        </div>
      </footer>
    </article>

    <article class="pu-card card-md">
      <header class="card-header">
        <div data-layout="center-start" data-gap="sm">
          <span class="pu-avatar avatar-sm avatar-rounded" aria-hidden="true">RM</span>
          <div>
            <p class="card-title">Ryan Mitchell</p>
            <p class="card-subtitle">Product Strategist, Teknovia</p>
          </div>
        </div>
      </header>
      <div class="card-body">
        <p>&ldquo;Pulse was the missing layer between our product and engineering teams. We&rsquo;ve never had this much clarity in how tasks move through the pipeline.&rdquo;</p>
      </div>
    </article>

    <article class="pu-card card-md">
      <header class="card-header">
        <div data-layout="center-start" data-gap="sm">
          <span class="pu-avatar avatar-sm avatar-rounded" aria-hidden="true">LM</span>
          <div>
            <p class="card-title">Lena Morgan</p>
            <p class="card-subtitle">Engineering Lead, Kodlab</p>
          </div>
        </div>
      </header>
      <div class="card-body">
        <p>&ldquo;We used to lose track of deliverables every week. With Pulse, task ownership is crystal clear and timelines are actually realistic.&rdquo;</p>
      </div>
    </article>

    <article class="pu-card card-md">
      <header class="card-header">
        <div data-layout="center-start" data-gap="sm">
          <span class="pu-avatar avatar-sm avatar-rounded" aria-hidden="true">ZC</span>
          <div>
            <p class="card-title">Zoe Carter</p>
            <p class="card-subtitle">UX Designer, Ember &amp; Co.</p>
          </div>
        </div>
      </header>
      <div class="card-body">
        <p>&ldquo;Pulse blended perfectly into our design-to-dev process. We organize prototypes, handoffs, and sprints without switching tools.&rdquo;</p>
      </div>
    </article>

    <article class="pu-card card-md">
      <header class="card-header">
        <div data-layout="center-start" data-gap="sm">
          <span class="pu-avatar avatar-sm avatar-rounded" aria-hidden="true">ED</span>
          <div>
            <p class="card-title">Emily Davis</p>
            <p class="card-subtitle">Product Manager, Inoviate</p>
          </div>
        </div>
      </header>
      <div class="card-body">
        <p>&ldquo;Since adopting Pulse, our feedback cycles became shorter and much more effective. It&rsquo;s a must-have for any growing product team.&rdquo;</p>
      </div>
    </article>

    <article class="pu-card card-md">
      <header class="card-header">
        <div data-layout="center-start" data-gap="sm">
          <span class="pu-avatar avatar-sm avatar-rounded" aria-hidden="true">SL</span>
          <div>
            <p class="card-title">Samantha Lee</p>
            <p class="card-subtitle">COO, Brightlabs</p>
          </div>
        </div>
      </header>
      <div class="card-body">
        <p>&ldquo;Pulse makes it incredibly easy to manage cross-functional work. We&rsquo;ve cut coordination time in half and deliver with better insights.&rdquo;</p>
      </div>
    </article>

    <article class="pu-card card-md">
      <header class="card-header">
        <div data-layout="center-start" data-gap="sm">
          <span class="pu-avatar avatar-sm avatar-rounded" aria-hidden="true">CB</span>
          <div>
            <p class="card-title">Carlos Bennett</p>
            <p class="card-subtitle">CTO, Cloudlane</p>
          </div>
        </div>
      </header>
      <div class="card-body">
        <p>&ldquo;We use Pulse across all departments — from tech to support. Creating shared workflows has drastically improved internal communication.&rdquo;</p>
      </div>
    </article>

    <article class="pu-card card-md wall-wide">
      <header class="card-header">
        <p class="card-title">NORTHWIND</p>
      </header>
      <div class="card-body">
        <p>&ldquo;Pulse has completely transformed how we approach daily project planning and execution. Before switching, we constantly missed deadlines due to misalignment. Now, everyone knows what&rsquo;s happening, who&rsquo;s responsible, and when things are due. Our productivity skyrocketed, and team communication has never been clearer.&rdquo;</p>
      </div>
      <footer class="card-footer">
        <div data-layout="center-start" data-gap="sm">
          <span class="pu-avatar avatar-sm avatar-rounded" aria-hidden="true">CN</span>
          <div>
            <p class="card-title">Clara Nguyen</p>
            <p class="card-subtitle">Senior Product Manager</p>
          </div>
        </div>
      </footer>
    </article>

    <article class="pu-card card-md wall-wide">
      <header class="card-header">
        <p class="card-title">LUMENFLOW</p>
      </header>
      <div class="card-body">
        <p class="card-title">&ldquo;I created a workspace, invited my co-founder, and started assigning tasks in 45 seconds. That&rsquo;s how fast Pulse works.&rdquo;</p>
      </div>
      <footer class="card-footer">
        <div data-layout="center-start" data-gap="sm">
          <span class="pu-avatar avatar-sm avatar-rounded" aria-hidden="true">YK</span>
          <div>
            <p class="card-title">Yves Kalume</p>
            <p class="card-subtitle">Lead Engineer</p>
          </div>
        </div>
      </footer>
    </article>
  </div>
</section>`,
};
