import type EmberUIRegistry from '@triptyk/ember-ui/template-registry';
import type EmberInputRegistry from '@triptyk/ember-input/template-registry';
import type EmberInputValidationRegistry from '@triptyk/ember-input-validation/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberUIRegistry,
            EmberInputRegistry,
            EmberInputValidationRegistry {}
}
