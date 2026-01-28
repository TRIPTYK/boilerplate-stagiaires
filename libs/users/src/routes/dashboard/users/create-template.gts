
import { UserChangeset } from "#src/changesets/user.ts";
import UsersForm from "#src/components/forms/user-form.gts";
import Component from "@glimmer/component";
import type { UsersCreateRouteSignature } from "./create.gts";

export default class UsersCreateRouteTemplate extends Component<UsersCreateRouteSignature> {
  changeset = new UserChangeset({});

  <template>
    <UsersForm @changeset={{this.changeset}} />
  </template>
}
