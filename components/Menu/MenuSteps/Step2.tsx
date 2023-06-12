import GetAvailableTime from "@/components/Modal/GetAvailableTime";
import Hp from "@/services/Hp";
import { MenuScheduleData } from "@/services/storage/data";
import { OpenHours } from "@/services/types/menu.type";
import { MenuFormContext } from "@/utils/Context/MenuProvider";
import { Add, AttachMoney, Edit } from "@mui/icons-material";
import { Box, Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import React, { FC, useContext, useState } from "react";

interface Step2 {
  handleInputChange: (event: any) => void;
}

const Step2: FC<Step2> = ({ handleInputChange }) => {
  const { menuForm, setMenuForm } = useContext(MenuFormContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectDay, setSelectDay] = useState<OpenHours>(MenuScheduleData[0]);

  const onScheduleUpdate = (update_schedule: OpenHours) => {
    let _menu_schedule = [...menuForm.menu_schedule];
    const found_date = _menu_schedule.find((schedule) => schedule.day == update_schedule.day);
    if (!found_date) return;
    found_date.from = update_schedule.from;
    found_date.to = update_schedule.to;
    setMenuForm({ ...menuForm, menu_schedule: _menu_schedule });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setMenuForm({ ...menuForm, pre_order_time: parseInt(event.target.value) });
  };

  return (
    <div>
      <>
        <TextField margin="normal" required fullWidth label="Address" name="address" value={menuForm.address} onChange={handleInputChange} />
        <Box display={{ xs: "block", sm: "flex" }} sx={{ gap: { xs: 0, sm: 10 }, mb: 4 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            type="number"
            label="Price"
            name="price"
            value={menuForm.price}
            onChange={handleInputChange}
            InputProps={{
              inputProps: { min: 0 },
              endAdornment: (
                <InputAdornment position="end">
                  <AttachMoney />
                </InputAdornment>
              ),
            }}
          />
          <FormControl margin="normal" fullWidth>
            <InputLabel id="demo-simple-select-label">Pre-Order Time</InputLabel>
            <Select name="pre_order_time" label="Pre-Order Time" id="demo-simple-select-label" value={String(menuForm.pre_order_time) || ""} onChange={handleSelectChange}>
              <MenuItem value={1}>1 Day</MenuItem>
              <MenuItem value={2}>2 Days</MenuItem>
              <MenuItem value={3}>3 Days</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Select Available Time
        </Typography>
        <Grid container sx={{ mb: 4, width: "100%" }} rowGap={3}>
          {menuForm.menu_schedule.map((menu, idx) => (
            <Grid item key={idx} xs={6} sm={4}>
              <Typography variant="h5" sx={{ borderBottom: "1px solid rgb(224, 224, 224)" }} textAlign="center">
                {Hp.convert_day_to_num(menu.day)}
              </Typography>
              <Button
                variant="text"
                fullWidth
                onClick={() => {
                  setOpenDialog(true);
                  setSelectDay(menu);
                }}
              >
                {menu.from && menu.to ? (
                  <>
                    <Edit sx={{ fontSize: 20, mr: 0.5 }} />
                    <Typography variant="body1">{Hp.renderClock(menu.from, menu.to)}</Typography>
                  </>
                ) : (
                  <>
                    <Add />
                    <Typography>Add Slot</Typography>
                  </>
                )}
              </Button>
            </Grid>
          ))}
        </Grid>
      </>
      <GetAvailableTime openDialog={openDialog} setOpenDialog={(open) => setOpenDialog(open)} menu_schedule={selectDay} setMenuSchedule={onScheduleUpdate} />
    </div>
  );
};

export default Step2;
