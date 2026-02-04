import type { TOC } from '@ember/component/template-only';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import type CurrentUserService from '@libs/users-front/services/current-user';
import TpkDashBoard, {
  type SidebarItem,
  type Language,
} from '@triptyk/ember-ui/components/prefabs/tpk-dashboard';
import type SessionService from 'ember-simple-auth/services/session';
import type { IntlService } from 'ember-intl';
import { action } from '@ember/object';

export default class DashboardTemplate extends Component {
  @service declare currentUser: CurrentUserService;
  @service declare session: SessionService;
  @service declare intl: IntlService;

  languages: Language[] = [
    { code: 'fr-fr', label: 'Français' },
    { code: 'en-us', label: 'Anglais' },
  ];

  @action
  handleLocaleChange(locale: string) {
    this.intl.setLocale([locale]);
  }

  menuItems: SidebarItem[] = [
    {
      type: 'link',
      label: 'Dashboard',
      route: 'dashboard',
      icon: <template>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block size-4 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </template> as TOC<{ Element: SVGSVGElement }>,
    },
    {
      type: 'link',
      label: 'Users',
      route: 'dashboard.users',
      tooltip: 'Users',
      icon: <template>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block size-4 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </template> as TOC<{ Element: SVGSVGElement }>,
    },
  ];

  get userForNav() {
    return {
      fullName:
        this.currentUser.currentUser.firstName +
        ' ' +
        this.currentUser.currentUser.lastName,
    };
  }

  logout = async () => {
    await this.session.invalidate();
  };

  <template>
    <TpkDashBoard
      @currentUser={{this.userForNav}}
      @onLogout={{this.logout}}
      @sidebarItems={{this.menuItems}}
      @languages={{this.languages}}
      @onLocaleChange={{this.handleLocaleChange}}
    >
      <:content>
        {{outlet}}
      </:content>
    </TpkDashBoard>
  </template>
}
