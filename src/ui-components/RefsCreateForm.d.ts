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
export declare type RefsCreateFormInputValues = {
    firstname?: string;
    lastname?: string;
    phonenumber?: string;
    email?: string;
};
export declare type RefsCreateFormValidationValues = {
    firstname?: ValidationFunction<string>;
    lastname?: ValidationFunction<string>;
    phonenumber?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RefsCreateFormOverridesProps = {
    RefsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    firstname?: PrimitiveOverrideProps<TextFieldProps>;
    lastname?: PrimitiveOverrideProps<TextFieldProps>;
    phonenumber?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RefsCreateFormProps = React.PropsWithChildren<{
    overrides?: RefsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RefsCreateFormInputValues) => RefsCreateFormInputValues;
    onSuccess?: (fields: RefsCreateFormInputValues) => void;
    onError?: (fields: RefsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RefsCreateFormInputValues) => RefsCreateFormInputValues;
    onValidate?: RefsCreateFormValidationValues;
} & React.CSSProperties>;
export default function RefsCreateForm(props: RefsCreateFormProps): React.ReactElement;
