import { Box, Heading } from "@chakra-ui/core";
import React from "react";
import { EditeDeletePostButtons } from "../../components/EditeDeletePostButtons";
import { Layout } from "../../components/Layout";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { withApollo } from "../../utils/withApollo";

const Post = ({}) => {
  const { data, error, loading } = useGetPostFromUrl();

  if (loading) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div>{error}</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <div>could not find post</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      <Box mb={4}>{data.post.text}</Box>
      <EditeDeletePostButtons
        id={data.post.id}
        creatorId={data.post.creator.id}
        filename={data.post.filename}
      />
      {/* <br />
      <a
        href={`http://localhost:4000/files/${data.post.filename}`}
        download={data.post.filename}
        target="_blank"
      >
        download
      </a>
      <br /> */}
      <iframe
        src={`http://localhost:4000/files/${data.post.filename}`}
        width="500px"
        height="700px"
      ></iframe>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
