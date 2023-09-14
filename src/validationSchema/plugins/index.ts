import * as yup from 'yup';

export const pluginValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
  version: yup.string().required(),
  developer_id: yup.string().nullable().required(),
});
