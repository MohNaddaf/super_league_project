/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getSuspension } from "../graphql/queries";
import { updateSuspension } from "../graphql/mutations";
const client = generateClient();
export default function SuspensionUpdateForm(props) {
  const {
    id: idProp,
    suspension: suspensionModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    suspensionGameLength: "",
  };
  const [suspensionGameLength, setSuspensionGameLength] = React.useState(
    initialValues.suspensionGameLength
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = suspensionRecord
      ? { ...initialValues, ...suspensionRecord }
      : initialValues;
    setSuspensionGameLength(cleanValues.suspensionGameLength);
    setErrors({});
  };
  const [suspensionRecord, setSuspensionRecord] =
    React.useState(suspensionModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getSuspension.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getSuspension
        : suspensionModelProp;
      setSuspensionRecord(record);
    };
    queryData();
  }, [idProp, suspensionModelProp]);
  React.useEffect(resetStateValues, [suspensionRecord]);
  const validations = {
    suspensionGameLength: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          suspensionGameLength: suspensionGameLength ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateSuspension.replaceAll("__typename", ""),
            variables: {
              input: {
                id: suspensionRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "SuspensionUpdateForm")}
      {...rest}
    >
      <TextField
        label="Suspension game length"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={suspensionGameLength}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              suspensionGameLength: value,
            };
            const result = onChange(modelFields);
            value = result?.suspensionGameLength ?? value;
          }
          if (errors.suspensionGameLength?.hasError) {
            runValidationTasks("suspensionGameLength", value);
          }
          setSuspensionGameLength(value);
        }}
        onBlur={() =>
          runValidationTasks("suspensionGameLength", suspensionGameLength)
        }
        errorMessage={errors.suspensionGameLength?.errorMessage}
        hasError={errors.suspensionGameLength?.hasError}
        {...getOverrideProps(overrides, "suspensionGameLength")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || suspensionModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || suspensionModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
