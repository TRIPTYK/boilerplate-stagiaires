import TpkTableGenericPrefab, { type TableParams } from '@triptyk/ember-ui/components/prefabs/tpk-table-generic-prefab';

let tableParams: TableParams = {
    entity: 'users',
    pageSizes: [10, 30, 50, 75],
    defaultSortColumn: 'firstName',
    columns: [
      {
        field: 'name',
        headerName: 'Nom',
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

export const UsersTable = <template>
  <h1>Users Table</h1>
  <TpkTableGenericPrefab @tableParams={{tableParams}} />
</template>;
