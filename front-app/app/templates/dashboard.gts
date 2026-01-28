import Component from '@glimmer/component';
import { LinkTo } from '@ember/routing';
import type { TOC } from '@ember/component/template-only';

interface MenuItem {
  label: string;
  route: string;
  icon: string;
  tooltip: string;
}

export default class DashboardTemplate extends Component {
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      route: 'dashboard',
      tooltip: 'Dashboard',
      icon: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>',
    },
    {
      label: 'Users',
      route: 'dashboard.users',
      tooltip: 'Users',
      icon: '<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>',
    }
  ];

  <template>
    <div class="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <nav class="navbar w-full bg-base-300">
          <label for="my-drawer-4" aria-label="open sidebar" class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" class="my-1.5 inline-block size-4">
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div class="px-4">Boilerplate</div>
        </nav>
        <div class="p-4">{{outlet}}</div>
      </div>

      <div class="drawer-side is-drawer-close:overflow-visible">
        <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
        <div class="flex min-h-full flex-col items-start bg-base-200 transition-all duration-300 is-drawer-close:w-14 is-drawer-open:w-64">
          <!-- Sidebar content here -->
          <ul class="menu w-full grow">
            {{#each this.menuItems as |item|}}
              <li class="transition-all duration-200 hover:scale-105">
                <LinkTo
                  @route={{item.route}}
                  class="is-drawer-close:tooltip is-drawer-close:tooltip-right transition-colors duration-200"
                  data-tip={{item.tooltip}}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" class="my-1.5 inline-block size-4">
                    {{! template-lint-disable no-triple-curlies }}
                    {{{item.icon}}}
                  </svg>
                  <span class="is-drawer-close:hidden transition-opacity duration-200">{{item.label}}</span>
                </LinkTo>
              </li>
            {{/each}}
          </ul>
        </div>
      </div>
    </div>
  </template>
}
