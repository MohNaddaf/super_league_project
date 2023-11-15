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
export declare type DivisionsUpdateFormInputValues = {
    season?: string;
    division?: string;
    year?: string;
};
export declare type DivisionsUpdateFormValidationValues = {
    season?: ValidationFunction<string>;
    division?: ValidationFunction<string>;
    year?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DivisionsUpdateFormOverridesProps = {
    DivisionsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    season?: PrimitiveOverrideProps<TextFieldProps>;
    division?: PrimitiveOverrideProps<TextFieldProps>;
    year?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DivisionsUpdateFormProps = React.PropsWithChildren<{
    overrides?: DivisionsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    divisions?: any;
    onSubmit?: (fields: DivisionsUpdateFormInputValues) => DivisionsUpdateFormInputValues;
    onSuccess?: (fields: DivisionsUpdateFormInputValues) => void;
    onError?: (fields: DivisionsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DivisionsUpdateFormInputValues) => DivisionsUpdateFormInputValues;
    onValidate?: DivisionsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function DivisionsUpdateForm(props: DivisionsUpdateFormProps): React.ReactElement;
