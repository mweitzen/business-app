import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "pages/_app";
//
import { classNames } from "@/lib/helpers";
import { WithChildren } from "@/types";
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
import ButtonBase from "@/components/button";
import LabelText from "@/components/text-label";
import PriceInput from "@/components/input-price";
import PageHeader from "@/components/page-header";

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
  purchasePrice: z.number().gt(0, "Price must be a positive number."),
  purchasedFrom: z.string(),
  orderNumber: z.string(),
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
    purchasePrice: "",
    purchasedFrom: "",
    orderNumber: "",
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
      <PageHeader header={`Create Asset | Stage ${formStep}`} />

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
              <FormSection formStep={formStep} thisStep={1}>
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
                  placeholder="eg: Apple, Sony, Dell"
                />
                <TextInput
                  label="Serial Number"
                  name="serialNumber"
                  placeholder="The serial number associated with asset"
                />
              </FormSection>

              {/* step 2 */}
              <FormSection formStep={formStep} thisStep={2}>
                <TextInput
                  label="Purchased From"
                  name="purchasedFrom"
                  placeholder="eg: Amazon, eBay"
                />
                <PriceInput
                  label="Purchase Price"
                  name="purchasePrice"
                  placeholder="eg: 300.56"
                />
                <TextInput
                  label="Order Number"
                  name="orderNumber"
                  placeholder="Please enter the order number"
                />
                <TextAreaInput
                  label="Description (optional)"
                  name="description"
                  placeholder="Add a brief description that might help you identify this asset later"
                />
              </FormSection>

              {/* step 3 */}
              <FormSection formStep={formStep} thisStep={3}>
                <InputLabel
                  htmlFor="user"
                  label="Assign to a User (optional)"
                />
                <SelectUser />
              </FormSection>

              {/* step 4 */}
              <FormSection formStep={formStep} thisStep={4}>
                <div className="space-y-4 rounded-lg border p-4">
                  <div>
                    <LabelText>Asset Name</LabelText>
                    <p>{values.name}</p>
                  </div>
                  <div>
                    <LabelText>Type</LabelText>
                    <p>{values.type}</p>
                  </div>
                  <div>
                    <LabelText>Brand</LabelText>
                    <p>{values.brand}</p>
                  </div>
                  <div>
                    <LabelText>Serial Number</LabelText>
                    <p>{values.serialNumber}</p>
                  </div>
                </div>
                <ButtonBase
                  type="submit"
                  disabled={
                    isSubmitting ||
                    formStep !== 4 ||
                    Object.keys(errors).length !== 0
                  }
                  className="disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-gray-200"
                >
                  Confirm
                </ButtonBase>
              </FormSection>
            </Form>
          )}
        </Formik>
        {/* form stage actions */}
        <div className="mt-4 flex justify-between">
          <span>
            <ButtonBase
              onClick={decreaseFormStep}
              className={classNames(formStep === 1 ? "hidden" : "")}
            >
              Back
            </ButtonBase>
          </span>
          <span>
            <ButtonBase
              onClick={increaseFormStep}
              className={classNames(formStep === 4 ? "hidden" : "")}
            >
              Next
            </ButtonBase>
          </span>
        </div>
      </CardBase>
    </div>
  );
};

export default CreateAssetPage;

const FormSection: React.FC<
  WithChildren & { formStep: number; thisStep: number }
> = ({ children, formStep, thisStep }) => {
  return (
    <section className={classNames(formStep !== thisStep ? "hidden" : "")}>
      <div className="grid gap-y-6">{children}</div>
    </section>
  );
};
