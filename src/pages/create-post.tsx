import { Box, Button, FormLabel } from "@chakra-ui/core";
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
import { OptionsInputField } from "../components/OptionsInputField";

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
              console.log(values);
              console.log("complete all the form");
            }
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <InputField name="title" placeholder="title" label="Title:" />
              <Box mt={4}>
                <OptionsInputField
                  name="language"
                  placeholder="Language"
                  options={["english"]}
                />
              </Box>
              <Box mt={4}>
                <OptionsInputField
                  name="type"
                  placeholder="File's type"
                  options={[
                    "lesson plan",
                    "unity plan",
                    "yearly plan",
                    "banners",
                    "other",
                  ]}
                />
              </Box>
              <Box mt={4}>
                <OptionsInputField
                  name="field"
                  placeholder="Field"
                  options={[
                    "all",
                    "vocabulary",
                    "writting",
                    "grammar",
                    "other",
                  ]}
                />
              </Box>
              <Box mt={4}>
                <OptionsInputField
                  name="level"
                  placeholder="Class"
                  options={["4th grade", "5th grade", "6th grade"]}
                />
              </Box>
              <Box mt={4}>
                <OptionsInputField
                  name="unit"
                  placeholder="Unit"
                  options={[
                    "0",
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "other",
                  ]}
                />
              </Box>
              <Box mt={4}>
                <InputField
                  textArea
                  name="text"
                  placeholder="text..."
                  label="Description:"
                />
              </Box>
              <Box>
                <Box mt={4}>
                  <FormLabel htmlFor="file">File:</FormLabel>
                  <input
                    type="file"
                    name="file"
                    onChange={(event) => {
                      setFieldValue("file", event!.currentTarget!.files![0]!);
                    }}
                  />
                </Box>
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
