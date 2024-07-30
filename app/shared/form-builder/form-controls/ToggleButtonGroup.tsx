import { ErrorMessage, FormGroup, Label, Radio } from '@trussworks/react-uswds';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { Option } from '../types';

type Props<T extends FieldValues, U> = {
    name: Path<T>;
    options: Option<U>[];
    label: string;
    hint?:string;
    style?: React.CSSProperties;
} & Partial<Pick<HTMLInputElement, 'disabled' | 'required'>>;

const ToggleButtonGroup = <T extends FieldValues, U extends string | number>({
    name,
    options,
    label,
    hint,
    style,
    ...props
}: Props<T, U>) => {
    const { control } = useFormContext<T>();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <FormGroup error={!!error} className="bg-white radius-sm">
                    <Label
                        style={{maxWidth: 'fit-content'}}
                        htmlFor={name}
                        error={!!error}
                        className="padding-bottom-1"
                        requiredMarker={props.required}
                    >
                        {label}
                    </Label>
                    <span className='text-base'>{hint}</span>
                    {!!error && (
                        <ErrorMessage id="input-error-message">
                            {error.message}
                        </ErrorMessage>
                    )}
                    <div
                        className="padding-bottom-1"
                        style={style}
                    >
                        {options?.map((opt) => (
                            <Radio
                                className="padding-y-1"
                                key={opt.label}
                                id={`${opt.label}|${name}`}
                                label={opt.label}
                                name={name}
                                disabled={props.disabled}
                                value={opt.value}
                                checked={field.value === opt.value}
                                onChange={field.onChange}
                            />
                        ))}
                    </div>
                </FormGroup>
            )}
        />
    );
};

export default ToggleButtonGroup;