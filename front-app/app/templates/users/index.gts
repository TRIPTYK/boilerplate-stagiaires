import type { TOC } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { UsersTable } from 'front-app/components/users-table.gts';

interface IndexSignature {
  Args: {
    model: unknown;
    controller: unknown;
  };
}

<template>
  {{pageTitle "Index"}}
  <UsersTable />
</template> satisfies TOC<IndexSignature>;
