import { FormLabel, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useController, useFormContext } from 'react-hook-form';
import { Visibility, VisibilityOff } from "@mui/icons-material";
const TextFormField = (props) => {
    const {name,placeholder,label,type}=props;
    const {
		control,
	} = useFormContext();
    const { field, fieldState : {error} } = useController({
		control,
		name,
		defaultValue: "",
	});
  const [showPassword, setShowPassword] = useState(false);
	const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
  return (
    <Stack direction={'column'}>
      <FormLabel sx={{textTransform:'capitalize'}}>{label}</FormLabel>
      <TextField {...field} size='small' placeholder={placeholder} sx={{my:1}} type={showPassword ? "text" : type}
      fullWidth
       InputProps={{
					endAdornment: type === "password" && (
						<InputAdornment position="end">
							<IconButton
								onClick={handleTogglePasswordVisibility}
							>
								{showPassword ? (
									<Visibility />
								) : (
									<VisibilityOff />
								)}
							</IconButton>
						</InputAdornment>
					),
				}} />
    </Stack>
  )
}

export default TextFormField
