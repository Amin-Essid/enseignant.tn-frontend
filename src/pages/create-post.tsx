import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import {
  useAddFileMutation,
  useCreatePostMutation,
} from "../generated/graphql";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

interface createPostProps {}
interface fileObjectType {
  name: string;
  size: number;
  type: string;
  lastModified?: any;
  lastModifiedDate?: any;
  webkitRelativePath?: any;
}

const createPost: React.FC<createPostProps> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [createPost] = useCreatePostMutation();
  const [addFile] = useAddFileMutation();
  return (
    <Layout variant="small">
      <Wrapper variant="small">
        <Formik
          initialValues={{
            title: "",
            language: "",
            type: "",
            field: "",
            level: "",
            unit: "",
            filename: "",
            text: "",
            file: null as null | fileObjectType,
          }}
          onSubmit={async (values) => {
            let {
              file,
              title,
              language,
              type,
              field,
              level,
              unit,
              text,
            } = values;
            if (
              file &&
              title !== "" &&
              language !== "" &&
              type !== "" &&
              level !== "" &&
              field !== "" &&
              unit !== "" &&
              text !== ""
            ) {
              const { errors } = await createPost({
                variables: {
                  input: {
                    title,
                    language,
                    type,
                    field,
                    level,
                    unit,
                    filename: file!.name,
                    text,
                  },
                },
                update: (cache) => {
                  cache.evict({ fieldName: "posts:{}" });
                },
              });
              if (!errors) {
                await addFile({
                  variables: { file: values.file },
                });
                console.log(errors);
                router.push("/");
              }
            } else {
              console.log("complete all the form");
            }
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <InputField name="title" placeholder="title" label="Title" />
              <InputField
                name="language"
                placeholder="language"
                label="language"
              />
              <Box mt={4}>
                <InputField name="type" placeholder="type" label="type" />
              </Box>
              <Box mt={4}>
                <InputField name="field" placeholder="field" label="field" />
              </Box>
              <Box mt={4}>
                <InputField name="level" placeholder="level" label="level" />
              </Box>
              <Box mt={4}>
                <InputField name="unit" placeholder="unit" label="unit" />
              </Box>
              <Box mt={4}>
                <InputField
                  textArea
                  name="text"
                  placeholder="text..."
                  label="Text"
                />
              </Box>
              {/* <Box mt={4}>
                <InputField
                  name="filename"
                  placeholder="filename"
                  label="filename"
                />
              </Box> */}
              <Box>
                <input
                  type="file"
                  name="file"
                  onChange={(event) => {
                    setFieldValue("file", event!.currentTarget!.files![0]!);
                  }}
                />
              </Box>
              <Button
                mt={4}
                isLoading={isSubmitting}
                type="submit"
                variantColor="teal"
              >
                create post
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(createPost);
