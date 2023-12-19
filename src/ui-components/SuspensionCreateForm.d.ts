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
export declare type SuspensionCreateFormInputValues = {
    suspensionGameLength?: number;
};
export declare type SuspensionCreateFormValidationValues = {
    suspensionGameLength?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SuspensionCreateFormOverridesProps = {
    SuspensionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    suspensionGameLength?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SuspensionCreateFormProps = React.PropsWithChildren<{
    overrides?: SuspensionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SuspensionCreateFormInputValues) => SuspensionCreateFormInputValues;
    onSuccess?: (fields: SuspensionCreateFormInputValues) => void;
    onError?: (fields: SuspensionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SuspensionCreateFormInputValues) => SuspensionCreateFormInputValues;
    onValidate?: SuspensionCreateFormValidationValues;
} & React.CSSProperties>;
export default function SuspensionCreateForm(props: SuspensionCreateFormProps): React.ReactElement;
