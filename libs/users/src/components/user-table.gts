import type RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import TableGenericPrefab, { type TableParams } from '@triptyk/ember-ui/components/prefabs/tpk-table-generic-prefab';



class UsersTable extends Component<object> {
  @service declare router: RouterService;

  tableParams: TableParams = {
    entity: 'users',
    pageSizes: [10, 30, 50, 75],
    rowClick: (element) => {
      this.router.transitionTo('dashboard.users.edit', (element as { id: string }).id);
    },
    defaultSortColumn: 'firstName',
    columns: [
      {
        field: 'firstName',
        headerName: 'Nom',
        sortable: true,
      },
      {
        field: 'lastName',
        headerName: 'Prénom',
        sortable: true,
      },
      {
        field: 'email',
        headerName: 'Email',
        sortable: false,
      },
    ],
    actionMenu: [],
  };

  <template>
    <h1>Users Table</h1>
    <TableGenericPrefab @tableParams={{this.tableParams}} />
  </template>;
}

export default UsersTable;
