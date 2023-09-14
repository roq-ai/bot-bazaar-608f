import * as yup from 'yup';

export const softwareProductValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
  version: yup.string().required(),
  developer_id: yup.string().nullable().required(),
});
