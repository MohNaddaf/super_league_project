/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getSeasons } from "../graphql/queries";
import { updateSeasons } from "../graphql/mutations";
const client = generateClient();
export default function SeasonsUpdateForm(props) {
  const {
    id: idProp,
    seasons: seasonsModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    season: "",
    year: "",
    startdate: "",
    isseasonactive: false,
  };
  const [season, setSeason] = React.useState(initialValues.season);
  const [year, setYear] = React.useState(initialValues.year);
  const [startdate, setStartdate] = React.useState(initialValues.startdate);
  const [isseasonactive, setIsseasonactive] = React.useState(
    initialValues.isseasonactive
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = seasonsRecord
      ? { ...initialValues, ...seasonsRecord }
      : initialValues;
    setSeason(cleanValues.season);
    setYear(cleanValues.year);
    setStartdate(cleanValues.startdate);
    setIsseasonactive(cleanValues.isseasonactive);
    setErrors({});
  };
  const [seasonsRecord, setSeasonsRecord] = React.useState(seasonsModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getSeasons.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getSeasons
        : seasonsModelProp;
      setSeasonsRecord(record);
    };
    queryData();
  }, [idProp, seasonsModelProp]);
  React.useEffect(resetStateValues, [seasonsRecord]);
  const validations = {
    season: [],
    year: [],
    startdate: [],
    isseasonactive: [],
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
          season: season ?? null,
          year: year ?? null,
          startdate: startdate ?? null,
          isseasonactive: isseasonactive ?? null,
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
            query: updateSeasons.replaceAll("__typename", ""),
            variables: {
              input: {
                id: seasonsRecord.id,
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
      {...getOverrideProps(overrides, "SeasonsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Season"
        isRequired={false}
        isReadOnly={false}
        value={season}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              season: value,
              year,
              startdate,
              isseasonactive,
            };
            const result = onChange(modelFields);
            value = result?.season ?? value;
          }
          if (errors.season?.hasError) {
            runValidationTasks("season", value);
          }
          setSeason(value);
        }}
        onBlur={() => runValidationTasks("season", season)}
        errorMessage={errors.season?.errorMessage}
        hasError={errors.season?.hasError}
        {...getOverrideProps(overrides, "season")}
      ></TextField>
      <TextField
        label="Year"
        isRequired={false}
        isReadOnly={false}
        value={year}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              season,
              year: value,
              startdate,
              isseasonactive,
            };
            const result = onChange(modelFields);
            value = result?.year ?? value;
          }
          if (errors.year?.hasError) {
            runValidationTasks("year", value);
          }
          setYear(value);
        }}
        onBlur={() => runValidationTasks("year", year)}
        errorMessage={errors.year?.errorMessage}
        hasError={errors.year?.hasError}
        {...getOverrideProps(overrides, "year")}
      ></TextField>
      <TextField
        label="Startdate"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={startdate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              season,
              year,
              startdate: value,
              isseasonactive,
            };
            const result = onChange(modelFields);
            value = result?.startdate ?? value;
          }
          if (errors.startdate?.hasError) {
            runValidationTasks("startdate", value);
          }
          setStartdate(value);
        }}
        onBlur={() => runValidationTasks("startdate", startdate)}
        errorMessage={errors.startdate?.errorMessage}
        hasError={errors.startdate?.hasError}
        {...getOverrideProps(overrides, "startdate")}
      ></TextField>
      <SwitchField
        label="Isseasonactive"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isseasonactive}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              season,
              year,
              startdate,
              isseasonactive: value,
            };
            const result = onChange(modelFields);
            value = result?.isseasonactive ?? value;
          }
          if (errors.isseasonactive?.hasError) {
            runValidationTasks("isseasonactive", value);
          }
          setIsseasonactive(value);
        }}
        onBlur={() => runValidationTasks("isseasonactive", isseasonactive)}
        errorMessage={errors.isseasonactive?.errorMessage}
        hasError={errors.isseasonactive?.hasError}
        {...getOverrideProps(overrides, "isseasonactive")}
      ></SwitchField>
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
          isDisabled={!(idProp || seasonsModelProp)}
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
              !(idProp || seasonsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
