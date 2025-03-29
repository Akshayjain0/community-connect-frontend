import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	FormLabel,
	FormItem,
	FormMessage,
	FormField,
} from "@/components/ui/form"; // Import Form components
import { State, City } from "country-state-city";
import { UseFormReturn } from "react-hook-form";

interface IndiaStateCitySelectProps {
	form: UseFormReturn<any>;
}

const IndiaStateCitySelect = ({ form }: IndiaStateCitySelectProps) => {
	const { control, setValue, watch } = form;
	const selectedState = watch("state");
	// const selectedCity = watch("city"); // Watch selected city
	const indianStates = State.getStatesOfCountry("IN");
	const indianCities = selectedState
		? City.getCitiesOfState("IN", selectedState)
		: [];

	return (
		<div className='flex items-center justify-between w-full gap-4'>
			{/* State Selection */}
			<div className='w-1/2'>
				<FormField
					control={control}
					name='state'
					render={({ field }) => (
						<FormItem>
							<FormLabel>State</FormLabel>
							<Select
								onValueChange={(value) => {
									field.onChange(value);
									setValue("city", ""); // Reset city when state changes
									console.log("Selected State:", value);
								}}
								value={field.value}
							>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Select a State' />
								</SelectTrigger>
								<SelectContent>
									{indianStates.map((state) => (
										<SelectItem
											key={state.isoCode}
											value={state.isoCode}
										>
											{state.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			{/* City Selection */}
			<div className='w-1/2'>
				<FormField
					control={control}
					name='city'
					render={({ field }) => (
						<FormItem>
							<FormLabel>City</FormLabel>
							<Select
								onValueChange={(value) => {
									field.onChange(value);
									console.log("Selected City:", value);
								}}
								disabled={!selectedState}
								value={field.value}
							>
								<SelectTrigger className='w-full'>
									<SelectValue
										placeholder={
											selectedState
												? "Select a City"
												: "Select a State first"
										}
									/>
								</SelectTrigger>
								<SelectContent>
									{indianCities.map((city) => (
										<SelectItem
											key={city.name}
											value={city.name}
										>
											{city.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			{/* Debugging Console Logs */}
			{/* {selectedState && selectedCity && (
				<p className='text-sm'>
					You selected: <strong>{selectedCity}</strong> in{" "}
					<strong>{selectedState}</strong>
				</p>
			)} */}
		</div>
	);
};

export default IndiaStateCitySelect;
