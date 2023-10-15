/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type RegisteredTeamsCreateFormInputValues = {
    teamname?: string;
    season?: string;
    divison?: string;
    year?: string;
    gamesplayed?: number;
};
export declare type RegisteredTeamsCreateFormValidationValues = {
    teamname?: ValidationFunction<string>;
    season?: ValidationFunction<string>;
    divison?: ValidationFunction<string>;
    year?: ValidationFunction<string>;
    gamesplayed?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RegisteredTeamsCreateFormOverridesProps = {
    RegisteredTeamsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    teamname?: PrimitiveOverrideProps<TextFieldProps>;
    season?: PrimitiveOverrideProps<TextFieldProps>;
    divison?: PrimitiveOverrideProps<TextFieldProps>;
    year?: PrimitiveOverrideProps<TextFieldProps>;
    gamesplayed?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RegisteredTeamsCreateFormProps = React.PropsWithChildren<{
    overrides?: RegisteredTeamsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RegisteredTeamsCreateFormInputValues) => RegisteredTeamsCreateFormInputValues;
    onSuccess?: (fields: RegisteredTeamsCreateFormInputValues) => void;
    onError?: (fields: RegisteredTeamsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RegisteredTeamsCreateFormInputValues) => RegisteredTeamsCreateFormInputValues;
    onValidate?: RegisteredTeamsCreateFormValidationValues;
} & React.CSSProperties>;
export default function RegisteredTeamsCreateForm(props: RegisteredTeamsCreateFormProps): React.ReactElement;
