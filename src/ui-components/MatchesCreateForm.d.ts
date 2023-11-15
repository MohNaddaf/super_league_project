/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type MatchesCreateFormInputValues = {
    hometeam?: string;
    awayteam?: string;
    hometeamscore?: string;
    awayteamscore?: string;
    season?: string;
    division?: string;
    year?: string;
    referee?: string;
    gamenumber?: number;
    hometeamgamenumber?: number;
    awayteamgamenumber?: number;
    gamedate?: string;
};
export declare type MatchesCreateFormValidationValues = {
    hometeam?: ValidationFunction<string>;
    awayteam?: ValidationFunction<string>;
    hometeamscore?: ValidationFunction<string>;
    awayteamscore?: ValidationFunction<string>;
    season?: ValidationFunction<string>;
    division?: ValidationFunction<string>;
    year?: ValidationFunction<string>;
    referee?: ValidationFunction<string>;
    gamenumber?: ValidationFunction<number>;
    hometeamgamenumber?: ValidationFunction<number>;
    awayteamgamenumber?: ValidationFunction<number>;
    gamedate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MatchesCreateFormOverridesProps = {
    MatchesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    hometeam?: PrimitiveOverrideProps<TextFieldProps>;
    awayteam?: PrimitiveOverrideProps<TextFieldProps>;
    hometeamscore?: PrimitiveOverrideProps<TextFieldProps>;
    awayteamscore?: PrimitiveOverrideProps<TextFieldProps>;
    season?: PrimitiveOverrideProps<TextFieldProps>;
    division?: PrimitiveOverrideProps<TextFieldProps>;
    year?: PrimitiveOverrideProps<TextFieldProps>;
    referee?: PrimitiveOverrideProps<TextFieldProps>;
    gamenumber?: PrimitiveOverrideProps<TextFieldProps>;
    hometeamgamenumber?: PrimitiveOverrideProps<TextFieldProps>;
    awayteamgamenumber?: PrimitiveOverrideProps<TextFieldProps>;
    gamedate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MatchesCreateFormProps = React.PropsWithChildren<{
    overrides?: MatchesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MatchesCreateFormInputValues) => MatchesCreateFormInputValues;
    onSuccess?: (fields: MatchesCreateFormInputValues) => void;
    onError?: (fields: MatchesCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MatchesCreateFormInputValues) => MatchesCreateFormInputValues;
    onValidate?: MatchesCreateFormValidationValues;
} & React.CSSProperties>;
export default function MatchesCreateForm(props: MatchesCreateFormProps): React.ReactElement;
