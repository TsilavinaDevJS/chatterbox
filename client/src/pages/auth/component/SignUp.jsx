import React, { useState } from "react";
import { TextField, Box, Button, Typography } from "@mui/material";
import { validationSchema } from "../validation/validationSchemaSignUp";
import { styled } from "@mui/system";
import { RadioGroup, Radio, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../../store/reducers/authSlice";
import { validateForm } from "../../../common/utils";
import { Link } from "react-router-dom";

const initialState = {
	name: "",
	username: "",
	sexe: "Male",
	password: "",
	confirmPassword: "",
};

const Input = styled(TextField)(({ theme }) => ({
	marginTop: 5,
	marginBottom: 5,
}));

function Signup() {
	const dispatch = useDispatch();
	const errorRequest = useSelector((state) => state.auth.error);
	const isLoading = useSelector((state) => state.auth.isLoading);
	const [form, setForm] = useState(initialState);
	const [errors, setErrors] = React.useState({});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = await validateForm(form, validationSchema);
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length === 0) {
			dispatch(signup({ form }));
		}
	};

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="100vh"
			mt={4}
			mb={4}
			width="auto">
			<Box
				p={2}
				sx={{ width: "40%", border: "1px solid #eaeaea", borderRadius: "6px" }}>
				<Typography variant="subtitle2" fullWidth>
					Welcome back &#x270B;!
				</Typography>
				<Typography variant="h5" mt={1} sx={{ fontWieght: "600" }}>
					Sign in to your account
				</Typography>
				<Typography
					variant="subtitle2"
					mt={1}
					sx={{ color: "red", textAlign: "center" }}>
					{errorRequest}
				</Typography>
				<form onSubmit={handleSubmit} style={{ marginTop: "8px" }}>
					<>
						<Typography variant="caption" fullWidth>
							Name*
						</Typography>
						<Input
							name="name"
							value={form.name}
							onChange={handleChange}
							error={!!errors.name}
							helperText={errors.name}
							label="enter your name*"
							fullWidth
						/>
						<Typography variant="caption" fullWidth>
							username*
						</Typography>
						<Input
							name="username"
							value={form.username}
							onChange={handleChange}
							error={!!errors.username}
							helperText={errors.username}
							label="enter your username*"
							fullWidth
						/>
						<Typography variant="caption" fullWidth>
							Sexe*
						</Typography>
						<RadioGroup
							aria-label="gender"
							name="sexe"
							value={form.sexe}
							onChange={handleChange}>
							<FormControlLabel
								value="female"
								control={<Radio />}
								label="female"
							/>
							<FormControlLabel value="Male" control={<Radio />} label="Male" />
						</RadioGroup>
					</>
					<Typography variant="caption" fullWidth>
						email*
					</Typography>
					<Input
						name="email"
						value={form.email}
						onChange={handleChange}
						error={!!errors.email}
						helperText={errors.email}
						label="enter your email*"
						fullWidth
					/>
					<Typography variant="caption" fullWidth>
						password*
					</Typography>
					<Input
						name="password"
						type="password"
						value={form.password}
						onChange={handleChange}
						error={!!errors.password}
						helperText={errors.password}
						label="enter your confirmation password*"
						fullWidth
					/>
					<Typography variant="caption" fullWidth>
						Confirmation password*
					</Typography>
					<Input
						name="confirmPassword"
						type="password"
						value={form.confirmPassword}
						onChange={handleChange}
						error={!!errors.confirmPassword}
						helperText={errors.confirmPassword}
						label="enter your confirmation password*"
						fullWidth
					/>
					<Button type="submit" variant="contained" fullWidth>
						{!isLoading ? "Sign-up" : "loading ..."}
					</Button>
					<Box mt={2} sx={{ textAlign: "center" }}>
						<Typography variant="caption">
							Don't have an account{" "}
							<Link to="/" sx={{ color: "blue" }}>
								Login
							</Link>
						</Typography>
					</Box>
				</form>
			</Box>
		</Box>
	);
}

export default Signup;
