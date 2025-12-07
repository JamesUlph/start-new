import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { TextField } from './text-field';
import { CheckboxField } from './checkbox-field';

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: { TextField, CheckboxField },
  formComponents: {},
  fieldContext,
  formContext,
});
