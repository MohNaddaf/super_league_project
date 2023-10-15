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
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { createRegisteredPlayers } from "../graphql/mutations";
export default function RegisteredPlayersCreateForm(props) {
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
    firstname: "",
    lastname: "",
    teamname: "",
    division: "",
    season: "",
    position: "",
    captain: "",
    email: "",
    phonenumber: "",
    instagramhandle: "",
    teamid: "",
    goals: "",
    assists: "",
    contributions: "",
    totalgoals: "",
    totalassists: "",
    totalcontributions: "",
    year: "",
    onRoster: false,
  };
  const [firstname, setFirstname] = React.useState(initialValues.firstname);
  const [lastname, setLastname] = React.useState(initialValues.lastname);
  const [teamname, setTeamname] = React.useState(initialValues.teamname);
  const [division, setDivision] = React.useState(initialValues.division);
  const [season, setSeason] = React.useState(initialValues.season);
  const [position, setPosition] = React.useState(initialValues.position);
  const [captain, setCaptain] = React.useState(initialValues.captain);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phonenumber, setPhonenumber] = React.useState(
    initialValues.phonenumber
  );
  const [instagramhandle, setInstagramhandle] = React.useState(
    initialValues.instagramhandle
  );
  const [teamid, setTeamid] = React.useState(initialValues.teamid);
  const [goals, setGoals] = React.useState(initialValues.goals);
  const [assists, setAssists] = React.useState(initialValues.assists);
  const [contributions, setContributions] = React.useState(
    initialValues.contributions
  );
  const [totalgoals, setTotalgoals] = React.useState(initialValues.totalgoals);
  const [totalassists, setTotalassists] = React.useState(
    initialValues.totalassists
  );
  const [totalcontributions, setTotalcontributions] = React.useState(
    initialValues.totalcontributions
  );
  const [year, setYear] = React.useState(initialValues.year);
  const [onRoster, setOnRoster] = React.useState(initialValues.onRoster);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setFirstname(initialValues.firstname);
    setLastname(initialValues.lastname);
    setTeamname(initialValues.teamname);
    setDivision(initialValues.division);
    setSeason(initialValues.season);
    setPosition(initialValues.position);
    setCaptain(initialValues.captain);
    setEmail(initialValues.email);
    setPhonenumber(initialValues.phonenumber);
    setInstagramhandle(initialValues.instagramhandle);
    setTeamid(initialValues.teamid);
    setGoals(initialValues.goals);
    setAssists(initialValues.assists);
    setContributions(initialValues.contributions);
    setTotalgoals(initialValues.totalgoals);
    setTotalassists(initialValues.totalassists);
    setTotalcontributions(initialValues.totalcontributions);
    setYear(initialValues.year);
    setOnRoster(initialValues.onRoster);
    setErrors({});
  };
  const validations = {
    firstname: [],
    lastname: [],
    teamname: [],
    division: [],
    season: [],
    position: [],
    captain: [],
    email: [],
    phonenumber: [],
    instagramhandle: [],
    teamid: [],
    goals: [],
    assists: [],
    contributions: [],
    totalgoals: [],
    totalassists: [],
    totalcontributions: [],
    year: [],
    onRoster: [],
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
          firstname,
          lastname,
          teamname,
          division,
          season,
          position,
          captain,
          email,
          phonenumber,
          instagramhandle,
          teamid,
          goals,
          assists,
          contributions,
          totalgoals,
          totalassists,
          totalcontributions,
          year,
          onRoster,
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
            query: createRegisteredPlayers,
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
      {...getOverrideProps(overrides, "RegisteredPlayersCreateForm")}
      {...rest}
    >
      <TextField
        label="Firstname"
        isRequired={false}
        isReadOnly={false}
        value={firstname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname: value,
              lastname,
              teamname,
              division,
              season,
              position,
              captain,
              email,
              phonenumber,
              instagramhandle,
              teamid,
              goals,
              assists,
              contributions,
              totalgoals,
              totalassists,
              totalcontributions,
              year,
              onRoster,
            };
            const result = onChange(modelFields);
            value = result?.firstname ?? value;
          }
          if (errors.firstname?.hasError) {
            runValidationTasks("firstname", value);
          }
          setFirstname(value);
        }}
        onBlur={() => runValidationTasks("firstname", firstname)}
        errorMessage={errors.firstname?.errorMessage}
        hasError={errors.firstname?.hasError}
        {...getOverrideProps(overrides, "firstname")}
      ></TextField>
      <TextField
        label="Lastname"
        isRequired={false}
        isReadOnly={false}
        value={lastname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname: value,
              teamname,
              division,
              season,
              position,
              captain,
              email,
              phonenumber,
              instagramhandle,
              teamid,
              goals,
              assists,
              contributions,
              totalgoals,
              totalassists,
              totalcontributions,
              year,
              onRoster,
            };
            const result = onChange(modelFields);
            value = result?.lastname ?? value;
          }
          if (errors.lastname?.hasError) {
            runValidationTasks("lastname", value);
          }
          setLastname(value);
        }}
        onBlur={() => runValidationTasks("lastname", lastname)}
        errorMessage={errors.lastname?.errorMessage}
        hasError={errors.lastname?.hasError}
        {...getOverrideProps(overrides, "lastname")}
      ></TextField>
      <TextField
        label="Teamname"
        isRequired={false}
        isReadOnly={false}
        value={teamname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              teamname: value,
              division,
              season,
              position,
              captain,
              email,
              phonenumber,
              instagramhandle,
              teamid,
              goals,
              assists,
              contributions,
              totalgoals,
              totalassists,
              totalcontributions,
              year,
              onRoster,
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
        label="Division"
        isRequired={false}
        isReadOnly={false}
        value={division}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              teamname,
              division: value,
              season,
              position,
              captain,
              email,
              phonenumber,
              instagramhandle,
              teamid,
              goals,
              assists,
              contributions,
              totalgoals,
              totalassists,
              totalcontributions,
              year,
              onRoster,
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
        label="Season"
        isRequired={false}
        isReadOnly={false}
        value={season}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              teamname,
              division,
              season: value,
              position,
              captain,
              email,
              phonenumber,
              instagramhandle,
              teamid,
              goals,
              assists,
              contributions,
              totalgoals,
              totalassists,
              totalcontributions,
              year,
              onRoster,
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
        label="Position"
        isRequired={false}
        isReadOnly={false}
        value={position}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              teamname,
              division,
              season,
              position: value,
              captain,
              email,
              phonenumber,
              instagramhandle,
              teamid,
              goals,
              assists,
              contributions,
              totalgoals,
              totalassists,
              totalcontributions,
              year,
              onRoster,
            };
            const result = onChange(modelFields);
            value = result?.position ?? value;
          }
          if (errors.position?.hasError) {
            runValidationTasks("position", value);
          }
          setPosition(value);
        }}
        onBlur={() => runValidationTasks("position", position)}
        errorMessage={errors.position?.errorMessage}
        hasError={errors.position?.hasError}
        {...getOverrideProps(overrides, "position")}
      ></TextField>
      <TextField
        label="Captain"
        isRequired={false}
        isReadOnly={false}
        value={captain}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              teamname,
              division,
              season,
              position,
              captain: value,
              email,
              phonenumber,
              instagramhandle,
              teamid,
              goals,
              assists,
              contributions,
              totalgoals,
              totalassists,
              totalcontributions,
              year,
              onRoster,
            };
            const result = onChange(modelFields);
            value = result?.captain ?? value;
          }
          if (errors.captain?.hasError) {
            runValidationTasks("captain", value);
          }
          setCaptain(value);
        }}
        onBlur={() => runValidationTasks("captain", captain)}
        errorMessage={errors.captain?.errorMessage}
        hasError={errors.captain?.hasError}
        {...getOverrideProps(overrides, "captain")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              teamname,
              division,
              season,
              position,
              captain,
              email: value,
              phonenumber,
              instagramhandle,
              teamid,
              goals,
              assists,
              contributions,
              totalgoals,
              totalassists,
              totalcontributions,
              year,
              onRoster,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Phonenumber"
        isRequired={false}
        isReadOnly={false}
        value={phonenumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              teamname,
              division,
              season,
              position,
              captain,
              email,
              phonenumber: value,
              instagramhandle,
              teamid,
              goals,
              assists,
              contributions,
              totalgoals,
              totalassists,
              totalcontributions,
              year,
              onRoster,
            };
            const result = onChange(modelFields);
            value = result?.phonenumber ?? value;
          }
          if (errors.phonenumber?.hasError) {
            runValidationTasks("phonenumber", value);
          }
          setPhonenumber(value);
        }}
        onBlur={() => runValidationTasks("phonenumber", phonenumber)}
        errorMessage={errors.phonenumber?.errorMessage}
        hasError={errors.phonenumber?.hasError}
        {...getOverrideProps(overrides, "phonenumber")}
      ></TextField>
      <TextField
        label="Instagramhandle"
        isRequired={false}
        isReadOnly={false}
        value={instagramhandle}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              teamname,
              division,
              season,
              position,
              captain,
              email,
              phonenumber,
              instagramhandle: value,
              teamid,
              goals,
              assists,
              contributions,
              totalgoals,
              totalassists,
              totalcontributions,
              year,
              onRoster,
            };
            const result = onChange(modelFields);
            value = result?.instagramhandle ?? value;
          }
          if (errors.instagramhandle?.hasError) {
            runValidationTasks("instagramhandle", value);
          }
          setInstagramhandle(value);
        }}
        onBlur={() => runValidationTasks("instagramhandle", instagramhandle)}
        errorMessage={errors.instagramhandle?.errorMessage}
        hasError={errors.instagramhandle?.hasError}
        {...getOverrideProps(overrides, "instagramhandle")}
      ></TextField>
      <TextField
        label="Teamid"
        isRequired={false}
        isReadOnly={false}
        value={teamid}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              teamname,
              division,
              season,
              position,
              captain,
              email,
              phonenumber,
              instagramhandle,
              teamid: value,
              goals,
              assists,
              contributions,
              totalgoals,
              totalassists,
              totalcontributions,
              year,
              onRoster,
            };
            const result = onChange(modelFields);
            value = result?.teamid ?? value;
          }
          if (errors.teamid?.hasError) {
            runValidationTasks("teamid", value);
          }
          setTeamid(value);
        }}
        onBlur={() => runValidationTasks("teamid", teamid)}
        errorMessage={errors.teamid?.errorMessage}
        hasError={errors.teamid?.hasError}
        {...getOverrideProps(overrides, "teamid")}
      ></TextField>
      <TextField
        label="Goals"
        isRequired={false}
        isReadOnly={false}
        value={goals}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              teamname,
              division,
              season,
              position,
              captain,
              email,
              phonenumber,
              instagramhandle,
              teamid,
              goals: value,
              assists,
              contributions,
              totalgoals,
              totalassists,
              totalcontributions,
              year,
              onRoster,
            };
            const result = onChange(modelFields);
            value = result?.goals ?? value;
          }
          if (errors.goals?.hasError) {
            runValidationTasks("goals", value);
          }
          setGoals(value);
        }}
        onBlur={() => runValidationTasks("goals", goals)}
        errorMessage={errors.goals?.errorMessage}
        hasError={errors.goals?.hasError}
        {...getOverrideProps(overrides, "goals")}
      ></TextField>
      <TextField
        label="Assists"
        isRequired={false}
        isReadOnly={false}
        value={assists}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              teamname,
              division,
              season,
              position,
              captain,
              email,
              phonenumber,
              instagramhandle,
              teamid,
              goals,
              assists: value,
              contributions,
              totalgoals,
              totalassists,
              totalcontributions,
              year,
              onRoster,
            };
            const result = onChange(modelFields);
            value = result?.assists ?? value;
          }
          if (errors.assists?.hasError) {
            runValidationTasks("assists", value);
          }
          setAssists(value);
        }}
        onBlur={() => runValidationTasks("assists", assists)}
        errorMessage={errors.assists?.errorMessage}
        hasError={errors.assists?.hasError}
        {...getOverrideProps(overrides, "assists")}
      ></TextField>
      <TextField
        label="Contributions"
        isRequired={false}
        isReadOnly={false}
        value={contributions}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              teamname,
              division,
              season,
              position,
              captain,
              email,
              phonenumber,
              instagramhandle,
              teamid,
              goals,
              assists,
              contributions: value,
              totalgoals,
              totalassists,
              totalcontributions,
              year,
              onRoster,
            };
            const result = onChange(modelFields);
            value = result?.contributions ?? value;
          }
          if (errors.contributions?.hasError) {
            runValidationTasks("contributions", value);
          }
          setContributions(value);
        }}
        onBlur={() => runValidationTasks("contributions", contributions)}
        errorMessage={errors.contributions?.errorMessage}
        hasError={errors.contributions?.hasError}
        {...getOverrideProps(overrides, "contributions")}
      ></TextField>
      <TextField
        label="Totalgoals"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={totalgoals}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              teamname,
              division,
              season,
              position,
              captain,
              email,
              phonenumber,
              instagramhandle,
              teamid,
              goals,
              assists,
              contributions,
              totalgoals: value,
              totalassists,
              totalcontributions,
              year,
              onRoster,
            };
            const result = onChange(modelFields);
            value = result?.totalgoals ?? value;
          }
          if (errors.totalgoals?.hasError) {
            runValidationTasks("totalgoals", value);
          }
          setTotalgoals(value);
        }}
        onBlur={() => runValidationTasks("totalgoals", totalgoals)}
        errorMessage={errors.totalgoals?.errorMessage}
        hasError={errors.totalgoals?.hasError}
        {...getOverrideProps(overrides, "totalgoals")}
      ></TextField>
      <TextField
        label="Totalassists"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={totalassists}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              teamname,
              division,
              season,
              position,
              captain,
              email,
              phonenumber,
              instagramhandle,
              teamid,
              goals,
              assists,
              contributions,
              totalgoals,
              totalassists: value,
              totalcontributions,
              year,
              onRoster,
            };
            const result = onChange(modelFields);
            value = result?.totalassists ?? value;
          }
          if (errors.totalassists?.hasError) {
            runValidationTasks("totalassists", value);
          }
          setTotalassists(value);
        }}
        onBlur={() => runValidationTasks("totalassists", totalassists)}
        errorMessage={errors.totalassists?.errorMessage}
        hasError={errors.totalassists?.hasError}
        {...getOverrideProps(overrides, "totalassists")}
      ></TextField>
      <TextField
        label="Totalcontributions"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={totalcontributions}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              teamname,
              division,
              season,
              position,
              captain,
              email,
              phonenumber,
              instagramhandle,
              teamid,
              goals,
              assists,
              contributions,
              totalgoals,
              totalassists,
              totalcontributions: value,
              year,
              onRoster,
            };
            const result = onChange(modelFields);
            value = result?.totalcontributions ?? value;
          }
          if (errors.totalcontributions?.hasError) {
            runValidationTasks("totalcontributions", value);
          }
          setTotalcontributions(value);
        }}
        onBlur={() =>
          runValidationTasks("totalcontributions", totalcontributions)
        }
        errorMessage={errors.totalcontributions?.errorMessage}
        hasError={errors.totalcontributions?.hasError}
        {...getOverrideProps(overrides, "totalcontributions")}
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
              firstname,
              lastname,
              teamname,
              division,
              season,
              position,
              captain,
              email,
              phonenumber,
              instagramhandle,
              teamid,
              goals,
              assists,
              contributions,
              totalgoals,
              totalassists,
              totalcontributions,
              year: value,
              onRoster,
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
      <SwitchField
        label="On roster"
        defaultChecked={false}
        isDisabled={false}
        isChecked={onRoster}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              firstname,
              lastname,
              teamname,
              division,
              season,
              position,
              captain,
              email,
              phonenumber,
              instagramhandle,
              teamid,
              goals,
              assists,
              contributions,
              totalgoals,
              totalassists,
              totalcontributions,
              year,
              onRoster: value,
            };
            const result = onChange(modelFields);
            value = result?.onRoster ?? value;
          }
          if (errors.onRoster?.hasError) {
            runValidationTasks("onRoster", value);
          }
          setOnRoster(value);
        }}
        onBlur={() => runValidationTasks("onRoster", onRoster)}
        errorMessage={errors.onRoster?.errorMessage}
        hasError={errors.onRoster?.hasError}
        {...getOverrideProps(overrides, "onRoster")}
      ></SwitchField>
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
