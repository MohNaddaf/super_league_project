/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { getRegisteredTeams } from "../graphql/queries";
import { updateRegisteredTeams } from "../graphql/mutations";
export default function RegisteredTeamsUpdateForm(props) {
  const {
    id: idProp,
    registeredTeams: registeredTeamsModelProp,
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
    const cleanValues = registeredTeamsRecord
      ? { ...initialValues, ...registeredTeamsRecord }
      : initialValues;
    setTeamname(cleanValues.teamname);
    setSeason(cleanValues.season);
    setDivison(cleanValues.divison);
    setYear(cleanValues.year);
    setGamesplayed(cleanValues.gamesplayed);
    setErrors({});
  };
  const [registeredTeamsRecord, setRegisteredTeamsRecord] = React.useState(
    registeredTeamsModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getRegisteredTeams,
              variables: { id: idProp },
            })
          )?.data?.getRegisteredTeams
        : registeredTeamsModelProp;
      setRegisteredTeamsRecord(record);
    };
    queryData();
  }, [idProp, registeredTeamsModelProp]);
  React.useEffect(resetStateValues, [registeredTeamsRecord]);
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
          teamname: teamname ?? null,
          season: season ?? null,
          divison: divison ?? null,
          year: year ?? null,
          gamesplayed: gamesplayed ?? null,
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
          await API.graphql({
            query: updateRegisteredTeams,
            variables: {
              input: {
                id: registeredTeamsRecord.id,
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
      {...getOverrideProps(overrides, "RegisteredTeamsUpdateForm")}
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || registeredTeamsModelProp)}
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
              !(idProp || registeredTeamsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
