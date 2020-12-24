import React from "react";

const Checkout = () => {
  return (
    <div className="row m-0 justify-content-center align-items-center text-center">
      <div className="col-md 6 col-10">
        <h3>Recipient Information</h3>
        <FormControl
          variant="outlined"
          className="mt-5"
          size="small"
          fullWidth="true"
        >
          <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={values.email}
            onChange={handleChange("email")}
            labelWidth={70}
          />
        </FormControl>
      </div>
    </div>
  );
};

export default Checkout;
