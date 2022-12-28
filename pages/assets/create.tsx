import axios from "axios";
import React, { useState } from "react";
import { classNames } from "@/lib/helpers";
//
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
//
import { Formik, Form, FormikHelpers, FormikValues } from "formik";
//
import TextInput from "@/components/input-text";
import SelectInput from "@/components/input-select";
import TextAreaInput from "@/components/input-textarea";
import SelectUser from "@/components/select-user";

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
  assetType: z.enum([
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
  const [formStep, setFormStep] = useState<number>(1);

  const initialValues: FormikValues = {
    name: "",
    assetType: "",
    brand: "",
    serialNumber: "",
    description: "",
  };

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

    const { data } = await axios.post("/api/assets/create", {
      data: values,
    });

    return data;
  }

  /*
   * RENDER
   */
  return (
    <div>
      {/* header */}
      <h1 className="text-2xl">Create Asset | Stage {formStep}</h1>

      <div className="my-4 rounded-lg bg-element p-8 shadow-md">
        {/* form */}
        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(CreateAssetSchema)}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {/* step 1 */}
              <section className={classNames(formStep !== 1 ? "hidden" : "")}>
                <h2 className="mb-4 text-xl font-light">Asset Details</h2>

                <div className="grid gap-y-4">
                  <TextInput
                    label="Asset Nickname"
                    name="name"
                    placeholder="Use something that easily identifies"
                  />

                  <SelectInput
                    label="Asset Type"
                    name="assetType"
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
                </div>
              </section>

              {/* step 2 */}
              <section className={classNames(formStep !== 2 ? "hidden" : "")}>
                <h2 className="mb-2 text-xl font-extralight">Step 2</h2>
                <span className="grid gap-y-4">
                  <label>Add Purchase Details</label>

                  <TextAreaInput
                    label="Description (optional)"
                    name="description"
                    placeholder="Add a brief description that might help you identify this asset later"
                  />
                </span>
              </section>

              {/* step 3 */}
              <section className={classNames(formStep !== 3 ? "hidden" : "")}>
                <h2 className="mb-2 text-xl font-extralight">Step 3</h2>
                <span className="grid gap-y-4">
                  <label>Assign to User (optional)</label>
                  <SelectUser />
                </span>
              </section>

              {/* step 4 */}
              <section className={classNames(formStep !== 4 ? "hidden" : "")}>
                <h2 className="mb-2 text-xl font-extralight">
                  Review & Confirm
                </h2>
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    formStep !== 4 ||
                    Object.keys(errors).length !== 0
                  }
                  className="bg-green-300 disabled:bg-blue-100"
                >
                  Confirm
                </button>
              </section>
            </Form>
          )}
        </Formik>

        {/* form stage actions */}
        <div className="mt-4 flex justify-between">
          <span>
            <button
              onClick={decreaseFormStep}
              className={classNames(
                formStep === 1 ? "hidden" : "rounded-md bg-green-300 py-2 px-8"
              )}
            >
              Back
            </button>
          </span>
          <span>
            <button
              onClick={increaseFormStep}
              className={classNames(
                formStep === 4 ? "hidden" : "rounded-md bg-green-300 py-2 px-8"
              )}
            >
              Next
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreateAssetPage;
