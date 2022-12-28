import axios from "axios";
import { useState } from "react";
import { classNames } from "@/lib/helpers";
import { WithChildren } from "@/types";
import { useMutation } from "@tanstack/react-query";
//
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
//
import { Formik, Form, FormikHelpers, FormikValues } from "formik";
//
import CardBase from "@/components/card";
import InputLabel from "@/components/input-label";
import TextInput from "@/components/input-text";
import SelectInput from "@/components/input-select";
import TextAreaInput from "@/components/input-textarea";
import SelectUser from "@/components/select-user";
import { queryClient } from "pages/_app";
import { useRouter } from "next/router";

const ASSET_TYPES = [
  "LAPTOP",
  "DESKTOP",
  "TABLET",
  "CELL_PHONE",
  "OFFICE_PHONE",
  "SOFTWARE",
  "LICENSE",
];

const CreateAssetSchema = z.object({
  name: z.string(),
  type: z.enum([
    "LAPTOP",
    "DESKTOP",
    "TABLET",
    "CELL_PHONE",
    "OFFICE_PHONE",
    "SOFTWARE",
    "LICENSE",
  ]),
  brand: z.string(),
  serialNumber: z.string(),
});

/*
 *
 * CREATE ASSET PAGE
 *
 */
const CreateAssetPage = () => {
  const router = useRouter();

  const [formStep, setFormStep] = useState<number>(1);

  const initialValues: FormikValues = {
    name: "",
    type: "",
    brand: "",
    serialNumber: "",
    description: "",
  };

  const mutation = useMutation({
    mutationFn: (data: any) => axios.post("/api/assets/create", { data }),
    onMutate: async (data: any) => {},
    onSuccess: (result, data, context) => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
    onError: (error, data, context) => {},
  });

  /*
   * HANDLERS
   */
  function increaseFormStep() {
    setFormStep((prev) => prev + 1);
  }

  function decreaseFormStep() {
    setFormStep((prev) => {
      if (prev === 1) return 1;
      return prev - 1;
    });
  }

  async function handleFormSubmit(
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ) {
    formikHelpers.setSubmitting(false);

    mutation.mutate(values);

    router.push("/assets");
  }

  /*
   * RENDER
   */
  return (
    <div>
      {/* header */}
      <header className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-thin sm:text-4xl">
          Create Asset | Stage {formStep}
        </h1>
      </header>

      {/* form */}
      <CardBase>
        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(CreateAssetSchema)}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting, errors, values }) => (
            <Form>
              {/* step 1 */}
              <FormSection
                formStep={formStep}
                thisStep={1}
                header="Asset Details"
              >
                <TextInput
                  label="Asset Nickname"
                  name="name"
                  placeholder="Use something that easily identifies the asset"
                />
                <SelectInput
                  label="Asset Type"
                  name="type"
                  defaultOption="Select an asset type"
                >
                  {ASSET_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type.toLowerCase().replace("_", " ")}
                    </option>
                  ))}
                </SelectInput>
                <TextInput
                  label="Brand or Manufacturer"
                  name="brand"
                  placeholder="Company that produces asset"
                />
                <TextInput
                  label="Serial Number"
                  name="serialNumber"
                  placeholder="The serial number associated with asset"
                />
              </FormSection>

              {/* step 2 */}
              <FormSection
                formStep={formStep}
                thisStep={2}
                header="Additional Details"
              >
                <TextAreaInput
                  label="Add Purchase Details"
                  name="xxx"
                  placeholder="replace later"
                />
                <TextAreaInput
                  label="Description (optional)"
                  name="description"
                  placeholder="Add a brief description that might help you identify this asset later"
                />
              </FormSection>

              {/* step 3 */}
              <FormSection
                formStep={formStep}
                thisStep={3}
                header="Employee Assignment"
              >
                <InputLabel
                  htmlFor="user"
                  label="Assign to a User (optional)"
                />
                <SelectUser />
              </FormSection>

              {/* step 4 */}
              <FormSection
                formStep={formStep}
                thisStep={4}
                header="Review & Confirm"
              >
                <div className="space-y-4 rounded-lg border p-4">
                  <div>
                    <InputLabel htmlFor="" label="Asset Name" />
                    <p>{values.name}</p>
                  </div>
                  <div>
                    <InputLabel htmlFor="" label="Type" />
                    <p>{values.type}</p>
                  </div>
                  <div>
                    <InputLabel htmlFor="" label="Brand" />
                    <p>{values.brand}</p>
                  </div>
                  <div>
                    <InputLabel htmlFor="" label="Serial Number" />
                    <p>{values.serialNumber}</p>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    formStep !== 4 ||
                    Object.keys(errors).length !== 0
                  }
                  className="rounded-full bg-element py-2 px-8 shadow shadow-purple-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-gray-200"
                >
                  Confirm
                </button>
              </FormSection>
            </Form>
          )}
        </Formik>
        {/* form stage actions */}
        <div className="mt-4 flex justify-between">
          <span>
            <button
              onClick={decreaseFormStep}
              className={classNames(
                formStep === 1
                  ? "hidden"
                  : "rounded-full bg-element py-2 px-8 shadow shadow-purple-300"
              )}
            >
              Back
            </button>
          </span>
          <span>
            <button
              onClick={increaseFormStep}
              className={classNames(
                formStep === 4
                  ? "hidden"
                  : "rounded-full bg-element py-2 px-8 shadow shadow-purple-300"
              )}
            >
              Next
            </button>
          </span>
        </div>
      </CardBase>
    </div>
  );
};

export default CreateAssetPage;

const FormSection: React.FC<
  WithChildren & { formStep: number; thisStep: number; header: string }
> = ({ children, formStep, thisStep, header }) => {
  return (
    <section className={classNames(formStep !== thisStep ? "hidden" : "")}>
      <h2 className="mb-4 text-lg font-thin">{header}</h2>
      <div className="grid gap-y-6">{children}</div>
    </section>
  );
};
