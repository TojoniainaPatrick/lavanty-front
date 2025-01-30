import { Input } from "antd";

export default function TextInput({
    value,
    setValue,
    placeholder,
    type,
    size
}) {
    return(
        <Input
            placeholder = { placeholder }
            value = { value || '' }
            onChange = { event => setValue( event.target.value ) }
            size = { size }
            type = { type }
            style = {{ margin: '5px auto 10px' }}
        />
    )
}