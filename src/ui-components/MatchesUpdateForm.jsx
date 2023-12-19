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
import { getMatches } from "../graphql/queries";
import { updateMatches } from "../graphql/mutations";
const client = generateClient();
export default function MatchesUpdateForm(props) {
  const {
    id: idProp,
    matches: matchesModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    hometeam: "",
    awayteam: "",
    hometeamscore: "",
    awayteamscore: "",
    season: "",
    division: "",
    year: "",
    referee: "",
    gamenumber: "",
    hometeamgamenumber: "",
    awayteamgamenumber: "",
    gamedate: "",
  };
  const [hometeam, setHometeam] = React.useState(initialValues.hometeam);
  const [awayteam, setAwayteam] = React.useState(initialValues.awayteam);
  const [hometeamscore, setHometeamscore] = React.useState(
    initialValues.hometeamscore
  );
  const [awayteamscore, setAwayteamscore] = React.useState(
    initialValues.awayteamscore
  );
  const [season, setSeason] = React.useState(initialValues.season);
  const [division, setDivision] = React.useState(initialValues.division);
  const [year, setYear] = React.useState(initialValues.year);
  const [referee, setReferee] = React.useState(initialValues.referee);
  const [gamenumber, setGamenumber] = React.useState(initialValues.gamenumber);
  const [hometeamgamenumber, setHometeamgamenumber] = React.useState(
    initialValues.hometeamgamenumber
  );
  const [awayteamgamenumber, setAwayteamgamenumber] = React.useState(
    initialValues.awayteamgamenumber
  );
  const [gamedate, setGamedate] = React.useState(initialValues.gamedate);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = matchesRecord
      ? { ...initialValues, ...matchesRecord }
      : initialValues;
    setHometeam(cleanValues.hometeam);
    setAwayteam(cleanValues.awayteam);
    setHometeamscore(cleanValues.hometeamscore);
    setAwayteamscore(cleanValues.awayteamscore);
    setSeason(cleanValues.season);
    setDivision(cleanValues.division);
    setYear(cleanValues.year);
    setReferee(cleanValues.referee);
    setGamenumber(cleanValues.gamenumber);
    setHometeamgamenumber(cleanValues.hometeamgamenumber);
    setAwayteamgamenumber(cleanValues.awayteamgamenumber);
    setGamedate(cleanValues.gamedate);
    setErrors({});
  };
  const [matchesRecord, setMatchesRecord] = React.useState(matchesModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getMatches.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMatches
        : matchesModelProp;
      setMatchesRecord(record);
    };
    queryData();
  }, [idProp, matchesModelProp]);
  React.useEffect(resetStateValues, [matchesRecord]);
  const validations = {
    hometeam: [],
    awayteam: [],
    hometeamscore: [],
    awayteamscore: [],
    season: [],
    division: [],
    year: [],
    referee: [],
    gamenumber: [],
    hometeamgamenumber: [],
    awayteamgamenumber: [],
    gamedate: [],
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
          hometeam: hometeam ?? null,
          awayteam: awayteam ?? null,
          hometeamscore: hometeamscore ?? null,
          awayteamscore: awayteamscore ?? null,
          season: season ?? null,
          division: division ?? null,
          year: year ?? null,
          referee: referee ?? null,
          gamenumber: gamenumber ?? null,
          hometeamgamenumber: hometeamgamenumber ?? null,
          awayteamgamenumber: awayteamgamenumber ?? null,
          gamedate: gamedate ?? null,
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
            query: updateMatches.replaceAll("__typename", ""),
            variables: {
              input: {
                id: matchesRecord.id,
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
      {...getOverrideProps(overrides, "MatchesUpdateForm")}
      {...rest}
    >
      <TextField
        label="Hometeam"
        isRequired={false}
        isReadOnly={false}
        value={hometeam}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              hometeam: value,
              awayteam,
              hometeamscore,
              awayteamscore,
              season,
              division,
              year,
              referee,
              gamenumber,
              hometeamgamenumber,
              awayteamgamenumber,
              gamedate,
            };
            const result = onChange(modelFields);
            value = result?.hometeam ?? value;
          }
          if (errors.hometeam?.hasError) {
            runValidationTasks("hometeam", value);
          }
          setHometeam(value);
        }}
        onBlur={() => runValidationTasks("hometeam", hometeam)}
        errorMessage={errors.hometeam?.errorMessage}
        hasError={errors.hometeam?.hasError}
        {...getOverrideProps(overrides, "hometeam")}
      ></TextField>
      <TextField
        label="Awayteam"
        isRequired={false}
        isReadOnly={false}
        value={awayteam}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              hometeam,
              awayteam: value,
              hometeamscore,
              awayteamscore,
              season,
              division,
              year,
              referee,
              gamenumber,
              hometeamgamenumber,
              awayteamgamenumber,
              gamedate,
            };
            const result = onChange(modelFields);
            value = result?.awayteam ?? value;
          }
          if (errors.awayteam?.hasError) {
            runValidationTasks("awayteam", value);
          }
          setAwayteam(value);
        }}
        onBlur={() => runValidationTasks("awayteam", awayteam)}
        errorMessage={errors.awayteam?.errorMessage}
        hasError={errors.awayteam?.hasError}
        {...getOverrideProps(overrides, "awayteam")}
      ></TextField>
      <TextField
        label="Hometeamscore"
        isRequired={false}
        isReadOnly={false}
        value={hometeamscore}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              hometeam,
              awayteam,
              hometeamscore: value,
              awayteamscore,
              season,
              division,
              year,
              referee,
              gamenumber,
              hometeamgamenumber,
              awayteamgamenumber,
              gamedate,
            };
            const result = onChange(modelFields);
            value = result?.hometeamscore ?? value;
          }
          if (errors.hometeamscore?.hasError) {
            runValidationTasks("hometeamscore", value);
          }
          setHometeamscore(value);
        }}
        onBlur={() => runValidationTasks("hometeamscore", hometeamscore)}
        errorMessage={errors.hometeamscore?.errorMessage}
        hasError={errors.hometeamscore?.hasError}
        {...getOverrideProps(overrides, "hometeamscore")}
      ></TextField>
      <TextField
        label="Awayteamscore"
        isRequired={false}
        isReadOnly={false}
        value={awayteamscore}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              hometeam,
              awayteam,
              hometeamscore,
              awayteamscore: value,
              season,
              division,
              year,
              referee,
              gamenumber,
              hometeamgamenumber,
              awayteamgamenumber,
              gamedate,
            };
            const result = onChange(modelFields);
            value = result?.awayteamscore ?? value;
          }
          if (errors.awayteamscore?.hasError) {
            runValidationTasks("awayteamscore", value);
          }
          setAwayteamscore(value);
        }}
        onBlur={() => runValidationTasks("awayteamscore", awayteamscore)}
        errorMessage={errors.awayteamscore?.errorMessage}
        hasError={errors.awayteamscore?.hasError}
        {...getOverrideProps(overrides, "awayteamscore")}
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
              hometeam,
              awayteam,
              hometeamscore,
              awayteamscore,
              season: value,
              division,
              year,
              referee,
              gamenumber,
              hometeamgamenumber,
              awayteamgamenumber,
              gamedate,
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
        label="Division"
        isRequired={false}
        isReadOnly={false}
        value={division}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              hometeam,
              awayteam,
              hometeamscore,
              awayteamscore,
              season,
              division: value,
              year,
              referee,
              gamenumber,
              hometeamgamenumber,
              awayteamgamenumber,
              gamedate,
            };
            const result = onChange(modelFields);
            value = result?.division ?? value;
          }
          if (errors.division?.hasError) {
            runValidationTasks("division", value);
          }
          setDivision(value);
        }}
        onBlur={() => runValidationTasks("division", division)}
        errorMessage={errors.division?.errorMessage}
        hasError={errors.division?.hasError}
        {...getOverrideProps(overrides, "division")}
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
              hometeam,
              awayteam,
              hometeamscore,
              awayteamscore,
              season,
              division,
              year: value,
              referee,
              gamenumber,
              hometeamgamenumber,
              awayteamgamenumber,
              gamedate,
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
        label="Referee"
        isRequired={false}
        isReadOnly={false}
        value={referee}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              hometeam,
              awayteam,
              hometeamscore,
              awayteamscore,
              season,
              division,
              year,
              referee: value,
              gamenumber,
              hometeamgamenumber,
              awayteamgamenumber,
              gamedate,
            };
            const result = onChange(modelFields);
            value = result?.referee ?? value;
          }
          if (errors.referee?.hasError) {
            runValidationTasks("referee", value);
          }
          setReferee(value);
        }}
        onBlur={() => runValidationTasks("referee", referee)}
        errorMessage={errors.referee?.errorMessage}
        hasError={errors.referee?.hasError}
        {...getOverrideProps(overrides, "referee")}
      ></TextField>
      <TextField
        label="Gamenumber"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={gamenumber}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              hometeam,
              awayteam,
              hometeamscore,
              awayteamscore,
              season,
              division,
              year,
              referee,
              gamenumber: value,
              hometeamgamenumber,
              awayteamgamenumber,
              gamedate,
            };
            const result = onChange(modelFields);
            value = result?.gamenumber ?? value;
          }
          if (errors.gamenumber?.hasError) {
            runValidationTasks("gamenumber", value);
          }
          setGamenumber(value);
        }}
        onBlur={() => runValidationTasks("gamenumber", gamenumber)}
        errorMessage={errors.gamenumber?.errorMessage}
        hasError={errors.gamenumber?.hasError}
        {...getOverrideProps(overrides, "gamenumber")}
      ></TextField>
      <TextField
        label="Hometeamgamenumber"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={hometeamgamenumber}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              hometeam,
              awayteam,
              hometeamscore,
              awayteamscore,
              season,
              division,
              year,
              referee,
              gamenumber,
              hometeamgamenumber: value,
              awayteamgamenumber,
              gamedate,
            };
            const result = onChange(modelFields);
            value = result?.hometeamgamenumber ?? value;
          }
          if (errors.hometeamgamenumber?.hasError) {
            runValidationTasks("hometeamgamenumber", value);
          }
          setHometeamgamenumber(value);
        }}
        onBlur={() =>
          runValidationTasks("hometeamgamenumber", hometeamgamenumber)
        }
        errorMessage={errors.hometeamgamenumber?.errorMessage}
        hasError={errors.hometeamgamenumber?.hasError}
        {...getOverrideProps(overrides, "hometeamgamenumber")}
      ></TextField>
      <TextField
        label="Awayteamgamenumber"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={awayteamgamenumber}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              hometeam,
              awayteam,
              hometeamscore,
              awayteamscore,
              season,
              division,
              year,
              referee,
              gamenumber,
              hometeamgamenumber,
              awayteamgamenumber: value,
              gamedate,
            };
            const result = onChange(modelFields);
            value = result?.awayteamgamenumber ?? value;
          }
          if (errors.awayteamgamenumber?.hasError) {
            runValidationTasks("awayteamgamenumber", value);
          }
          setAwayteamgamenumber(value);
        }}
        onBlur={() =>
          runValidationTasks("awayteamgamenumber", awayteamgamenumber)
        }
        errorMessage={errors.awayteamgamenumber?.errorMessage}
        hasError={errors.awayteamgamenumber?.hasError}
        {...getOverrideProps(overrides, "awayteamgamenumber")}
      ></TextField>
      <TextField
        label="Gamedate"
        isRequired={false}
        isReadOnly={false}
        value={gamedate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              hometeam,
              awayteam,
              hometeamscore,
              awayteamscore,
              season,
              division,
              year,
              referee,
              gamenumber,
              hometeamgamenumber,
              awayteamgamenumber,
              gamedate: value,
            };
            const result = onChange(modelFields);
            value = result?.gamedate ?? value;
          }
          if (errors.gamedate?.hasError) {
            runValidationTasks("gamedate", value);
          }
          setGamedate(value);
        }}
        onBlur={() => runValidationTasks("gamedate", gamedate)}
        errorMessage={errors.gamedate?.errorMessage}
        hasError={errors.gamedate?.hasError}
        {...getOverrideProps(overrides, "gamedate")}
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
          isDisabled={!(idProp || matchesModelProp)}
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
              !(idProp || matchesModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
