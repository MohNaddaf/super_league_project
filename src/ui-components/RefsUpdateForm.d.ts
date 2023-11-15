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
export declare type RefsUpdateFormInputValues = {
    firstname?: string;
    lastname?: string;
    phonenumber?: string;
    email?: string;
};
export declare type RefsUpdateFormValidationValues = {
    firstname?: ValidationFunction<string>;
    lastname?: ValidationFunction<string>;
    phonenumber?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RefsUpdateFormOverridesProps = {
    RefsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    firstname?: PrimitiveOverrideProps<TextFieldProps>;
    lastname?: PrimitiveOverrideProps<TextFieldProps>;
    phonenumber?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RefsUpdateFormProps = React.PropsWithChildren<{
    overrides?: RefsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    refs?: any;
    onSubmit?: (fields: RefsUpdateFormInputValues) => RefsUpdateFormInputValues;
    onSuccess?: (fields: RefsUpdateFormInputValues) => void;
    onError?: (fields: RefsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RefsUpdateFormInputValues) => RefsUpdateFormInputValues;
    onValidate?: RefsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function RefsUpdateForm(props: RefsUpdateFormProps): React.ReactElement;
