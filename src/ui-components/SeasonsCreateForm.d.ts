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
export declare type SeasonsCreateFormInputValues = {
    season?: string;
    year?: string;
    startdate?: string;
    isseasonactive?: boolean;
};
export declare type SeasonsCreateFormValidationValues = {
    season?: ValidationFunction<string>;
    year?: ValidationFunction<string>;
    startdate?: ValidationFunction<string>;
    isseasonactive?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SeasonsCreateFormOverridesProps = {
    SeasonsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    season?: PrimitiveOverrideProps<TextFieldProps>;
    year?: PrimitiveOverrideProps<TextFieldProps>;
    startdate?: PrimitiveOverrideProps<TextFieldProps>;
    isseasonactive?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type SeasonsCreateFormProps = React.PropsWithChildren<{
    overrides?: SeasonsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SeasonsCreateFormInputValues) => SeasonsCreateFormInputValues;
    onSuccess?: (fields: SeasonsCreateFormInputValues) => void;
    onError?: (fields: SeasonsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SeasonsCreateFormInputValues) => SeasonsCreateFormInputValues;
    onValidate?: SeasonsCreateFormValidationValues;
} & React.CSSProperties>;
export default function SeasonsCreateForm(props: SeasonsCreateFormProps): React.ReactElement;
