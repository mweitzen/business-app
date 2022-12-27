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
import axios from "axios";

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

const CreateAssetPage = () => {
  const [formStage, setFormStage] = useState<number>(1);

  const initialValues: FormikValues = {
    name: "",
    assetType: "",
    brand: "",
    serialNumber: "",
    description: "",
  };

  function increaseFormStage() {
    setFormStage((prev) => prev + 1);
  }

  function decreaseFormStage() {
    setFormStage((prev) => {
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
      name: "seafood",
    });

    return data;
  }

  return (
    <div className="flex flex-col gap-y-6">
      {/* header */}
      <h1 className="text-2xl">Create Asset | Stage {formStage}</h1>

      <div className="rounded-lg bg-element p-4 shadow-md">
        {/* form */}
        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(CreateAssetSchema)}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {/* step 1 */}
              <section className={classNames(formStage !== 1 ? "hidden" : "")}>
                <h2 className="mb-2 text-xl font-extralight">Asset Details</h2>

                <div className="grid gap-y-2">
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
              <section className={classNames(formStage !== 2 ? "hidden" : "")}>
                <h2 className="mb-2 text-xl font-extralight">Step 2</h2>
                <span className="grid gap-y-2">
                  <label>Add Purchase Details</label>

                  <TextAreaInput
                    label="Description (optional)"
                    name="description"
                    placeholder="Add a brief description that might help you identify this asset later"
                  />
                </span>
              </section>

              {/* step 3 */}
              <section className={classNames(formStage !== 3 ? "hidden" : "")}>
                <h2 className="mb-2 text-xl font-extralight">Step 3</h2>
                <span className="grid gap-y-2">
                  <label>Assign to User (optional)</label>
                </span>
              </section>

              {/* step 4 */}
              <section className={classNames(formStage !== 4 ? "hidden" : "")}>
                <h2 className="mb-2 text-xl font-extralight">
                  Review & Confirm
                </h2>
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    formStage !== 4 ||
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
              onClick={decreaseFormStage}
              className={classNames(
                formStage === 1 ? "hidden" : "rounded-md bg-green-300 py-2 px-8"
              )}
            >
              Back
            </button>
          </span>
          <span>
            <button
              onClick={increaseFormStage}
              className={classNames(
                formStage === 4 ? "hidden" : "rounded-md bg-green-300 py-2 px-8"
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
