import * as yup from 'yup';

export const favoritesValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  software_product_id: yup.string().nullable().required(),
  ai_tool_id: yup.string().nullable().required(),
  plugin_id: yup.string().nullable().required(),
});
