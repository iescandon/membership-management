import { CheckCircle } from '@mui/icons-material';

export const CustomCheckbox = (props: any) => {
    return <CheckCircle className={props.checked ? 'text-green-600' : 'text-gray-300'} />
}