import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getFavoritesById, updateFavoritesById } from 'apiSdk/favorites';
import { favoritesValidationSchema } from 'validationSchema/favorites';
import { FavoritesInterface } from 'interfaces/favorites';
import { UserInterface } from 'interfaces/user';
import { SoftwareProductInterface } from 'interfaces/software-product';
import { AiToolInterface } from 'interfaces/ai-tool';
import { PluginInterface } from 'interfaces/plugin';
import { getUsers } from 'apiSdk/users';
import { getSoftwareProducts } from 'apiSdk/software-products';
import { getAiTools } from 'apiSdk/ai-tools';
import { getPlugins } from 'apiSdk/plugins';

function FavoritesEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<FavoritesInterface>(
    () => (id ? `/favorites/${id}` : null),
    () => getFavoritesById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: FavoritesInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateFavoritesById(id, values);
      mutate(updated);
      resetForm();
      router.push('/favorites');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<FavoritesInterface>({
    initialValues: data,
    validationSchema: favoritesValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Favorites',
              link: '/favorites',
            },
            {
              label: 'Update Favorites',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Favorites
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<SoftwareProductInterface>
            formik={formik}
            name={'software_product_id'}
            label={'Select Software Product'}
            placeholder={'Select Software Product'}
            fetcher={getSoftwareProducts}
            labelField={'name'}
          />
          <AsyncSelect<AiToolInterface>
            formik={formik}
            name={'ai_tool_id'}
            label={'Select Ai Tool'}
            placeholder={'Select Ai Tool'}
            fetcher={getAiTools}
            labelField={'name'}
          />
          <AsyncSelect<PluginInterface>
            formik={formik}
            name={'plugin_id'}
            label={'Select Plugin'}
            placeholder={'Select Plugin'}
            fetcher={getPlugins}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/favorites')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'favorites',
    operation: AccessOperationEnum.UPDATE,
  }),
)(FavoritesEditPage);
