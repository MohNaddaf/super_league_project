/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type RegisteredPlayersCreateFormInputValues = {
    firstname?: string;
    lastname?: string;
    teamname?: string;
    division?: string;
    season?: string;
    position?: string;
    captain?: string;
    email?: string;
    phonenumber?: string;
    instagramhandle?: string;
    teamid?: string;
    goals?: string;
    assists?: string;
    contributions?: string;
    totalgoals?: number;
    totalassists?: number;
    totalcontributions?: number;
    year?: string;
    onRoster?: boolean;
    suspendedUntilGameNumber?: number;
    yellowCards?: string;
    redCards?: string;
};
export declare type RegisteredPlayersCreateFormValidationValues = {
    firstname?: ValidationFunction<string>;
    lastname?: ValidationFunction<string>;
    teamname?: ValidationFunction<string>;
    division?: ValidationFunction<string>;
    season?: ValidationFunction<string>;
    position?: ValidationFunction<string>;
    captain?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phonenumber?: ValidationFunction<string>;
    instagramhandle?: ValidationFunction<string>;
    teamid?: ValidationFunction<string>;
    goals?: ValidationFunction<string>;
    assists?: ValidationFunction<string>;
    contributions?: ValidationFunction<string>;
    totalgoals?: ValidationFunction<number>;
    totalassists?: ValidationFunction<number>;
    totalcontributions?: ValidationFunction<number>;
    year?: ValidationFunction<string>;
    onRoster?: ValidationFunction<boolean>;
    suspendedUntilGameNumber?: ValidationFunction<number>;
    yellowCards?: ValidationFunction<string>;
    redCards?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RegisteredPlayersCreateFormOverridesProps = {
    RegisteredPlayersCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    firstname?: PrimitiveOverrideProps<TextFieldProps>;
    lastname?: PrimitiveOverrideProps<TextFieldProps>;
    teamname?: PrimitiveOverrideProps<TextFieldProps>;
    division?: PrimitiveOverrideProps<TextFieldProps>;
    season?: PrimitiveOverrideProps<TextFieldProps>;
    position?: PrimitiveOverrideProps<TextFieldProps>;
    captain?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phonenumber?: PrimitiveOverrideProps<TextFieldProps>;
    instagramhandle?: PrimitiveOverrideProps<TextFieldProps>;
    teamid?: PrimitiveOverrideProps<TextFieldProps>;
    goals?: PrimitiveOverrideProps<TextFieldProps>;
    assists?: PrimitiveOverrideProps<TextFieldProps>;
    contributions?: PrimitiveOverrideProps<TextFieldProps>;
    totalgoals?: PrimitiveOverrideProps<TextFieldProps>;
    totalassists?: PrimitiveOverrideProps<TextFieldProps>;
    totalcontributions?: PrimitiveOverrideProps<TextFieldProps>;
    year?: PrimitiveOverrideProps<TextFieldProps>;
    onRoster?: PrimitiveOverrideProps<SwitchFieldProps>;
    suspendedUntilGameNumber?: PrimitiveOverrideProps<TextFieldProps>;
    yellowCards?: PrimitiveOverrideProps<TextFieldProps>;
    redCards?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RegisteredPlayersCreateFormProps = React.PropsWithChildren<{
    overrides?: RegisteredPlayersCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RegisteredPlayersCreateFormInputValues) => RegisteredPlayersCreateFormInputValues;
    onSuccess?: (fields: RegisteredPlayersCreateFormInputValues) => void;
    onError?: (fields: RegisteredPlayersCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RegisteredPlayersCreateFormInputValues) => RegisteredPlayersCreateFormInputValues;
    onValidate?: RegisteredPlayersCreateFormValidationValues;
} & React.CSSProperties>;
export default function RegisteredPlayersCreateForm(props: RegisteredPlayersCreateFormProps): React.ReactElement;
