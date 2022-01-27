import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";

import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { useUpdatePostMutation } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";
import { useGetPostFromUrl } from "../../../utils/useGetPostFromUrl";

const EditPost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = useGetPostFromUrl();
  const [, updatePost] = useUpdatePostMutation();

  if (fetching) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          await updatePost({ id: intId, ...values });
          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="Title" label="Title" />
            <Box mt={4}>
              <InputField
                name="text"
                placeholder="text..."
                label="Body"
                textarea
              />
            </Box>
            <Button
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
              mt={4}
            >
              Update Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
