import React from "react";
import { withUrqlClient } from "next-urql";
import { Box, Heading } from "@chakra-ui/react";

import { createUrqlClient } from "../../utils/createUrqlClient";
import { Layout } from "../../components/Layout";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";

const Post: React.FC = ({}) => {
  const [{ data, fetching, error }] = useGetPostFromUrl();

  if (fetching) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could Not Find Post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      {data.post.text}
      <EditDeletePostButtons
        id={data.post.id}
        creatorId={data.post.creator.id}
      />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
