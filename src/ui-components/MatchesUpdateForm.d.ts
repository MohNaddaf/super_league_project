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
export declare type MatchesUpdateFormInputValues = {
    hometeam?: string;
    awayteam?: string;
    hometeamscore?: string;
    awayteamscore?: string;
    season?: string;
    division?: string;
    year?: string;
    referee?: string;
};
export declare type MatchesUpdateFormValidationValues = {
    hometeam?: ValidationFunction<string>;
    awayteam?: ValidationFunction<string>;
    hometeamscore?: ValidationFunction<string>;
    awayteamscore?: ValidationFunction<string>;
    season?: ValidationFunction<string>;
    division?: ValidationFunction<string>;
    year?: ValidationFunction<string>;
    referee?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MatchesUpdateFormOverridesProps = {
    MatchesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    hometeam?: PrimitiveOverrideProps<TextFieldProps>;
    awayteam?: PrimitiveOverrideProps<TextFieldProps>;
    hometeamscore?: PrimitiveOverrideProps<TextFieldProps>;
    awayteamscore?: PrimitiveOverrideProps<TextFieldProps>;
    season?: PrimitiveOverrideProps<TextFieldProps>;
    division?: PrimitiveOverrideProps<TextFieldProps>;
    year?: PrimitiveOverrideProps<TextFieldProps>;
    referee?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MatchesUpdateFormProps = React.PropsWithChildren<{
    overrides?: MatchesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    matches?: any;
    onSubmit?: (fields: MatchesUpdateFormInputValues) => MatchesUpdateFormInputValues;
    onSuccess?: (fields: MatchesUpdateFormInputValues) => void;
    onError?: (fields: MatchesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MatchesUpdateFormInputValues) => MatchesUpdateFormInputValues;
    onValidate?: MatchesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MatchesUpdateForm(props: MatchesUpdateFormProps): React.ReactElement;
