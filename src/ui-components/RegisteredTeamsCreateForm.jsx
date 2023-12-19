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
import { createRegisteredTeams } from "../graphql/mutations";
const client = generateClient();
export default function RegisteredTeamsCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    teamname: "",
    season: "",
    divison: "",
    year: "",
    gamesplayed: "",
  };
  const [teamname, setTeamname] = React.useState(initialValues.teamname);
  const [season, setSeason] = React.useState(initialValues.season);
  const [divison, setDivison] = React.useState(initialValues.divison);
  const [year, setYear] = React.useState(initialValues.year);
  const [gamesplayed, setGamesplayed] = React.useState(
    initialValues.gamesplayed
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTeamname(initialValues.teamname);
    setSeason(initialValues.season);
    setDivison(initialValues.divison);
    setYear(initialValues.year);
    setGamesplayed(initialValues.gamesplayed);
    setErrors({});
  };
  const validations = {
    teamname: [],
    season: [],
    divison: [],
    year: [],
    gamesplayed: [],
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
          teamname,
          season,
          divison,
          year,
          gamesplayed,
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
            query: createRegisteredTeams.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "RegisteredTeamsCreateForm")}
      {...rest}
    >
      <TextField
        label="Teamname"
        isRequired={false}
        isReadOnly={false}
        value={teamname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              teamname: value,
              season,
              divison,
              year,
              gamesplayed,
            };
            const result = onChange(modelFields);
            value = result?.teamname ?? value;
          }
          if (errors.teamname?.hasError) {
            runValidationTasks("teamname", value);
          }
          setTeamname(value);
        }}
        onBlur={() => runValidationTasks("teamname", teamname)}
        errorMessage={errors.teamname?.errorMessage}
        hasError={errors.teamname?.hasError}
        {...getOverrideProps(overrides, "teamname")}
      ></TextField>
      <TextField
        label="Season"
        isRequired={false}
        isReadOnly={false}
        value={season}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              teamname,
              season: value,
              divison,
              year,
              gamesplayed,
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
        label="Divison"
        isRequired={false}
        isReadOnly={false}
        value={divison}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              teamname,
              season,
              divison: value,
              year,
              gamesplayed,
            };
            const result = onChange(modelFields);
            value = result?.divison ?? value;
          }
          if (errors.divison?.hasError) {
            runValidationTasks("divison", value);
          }
          setDivison(value);
        }}
        onBlur={() => runValidationTasks("divison", divison)}
        errorMessage={errors.divison?.errorMessage}
        hasError={errors.divison?.hasError}
        {...getOverrideProps(overrides, "divison")}
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
              teamname,
              season,
              divison,
              year: value,
              gamesplayed,
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
        label="Gamesplayed"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={gamesplayed}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              teamname,
              season,
              divison,
              year,
              gamesplayed: value,
            };
            const result = onChange(modelFields);
            value = result?.gamesplayed ?? value;
          }
          if (errors.gamesplayed?.hasError) {
            runValidationTasks("gamesplayed", value);
          }
          setGamesplayed(value);
        }}
        onBlur={() => runValidationTasks("gamesplayed", gamesplayed)}
        errorMessage={errors.gamesplayed?.errorMessage}
        hasError={errors.gamesplayed?.hasError}
        {...getOverrideProps(overrides, "gamesplayed")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
